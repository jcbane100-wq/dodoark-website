import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        await handleRefund(charge);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error(`[Stripe Webhook] Error handling ${event.type}:`, err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {};
  const { eos_id, server } = metadata;

  // Parse cart data from metadata
  let itemSlugs: string[];
  let itemNames: string[];
  let rconCommands: string[];

  try {
    itemSlugs = JSON.parse(metadata.item_slugs || "[]");
    itemNames = JSON.parse(metadata.item_names || "[]");
    rconCommands = JSON.parse(metadata.rcon_commands || "[]");
  } catch {
    // Legacy single-item format
    itemSlugs = metadata.item_slug ? [metadata.item_slug] : [];
    itemNames = metadata.item_name ? [metadata.item_name] : [];
    rconCommands = metadata.rcon_command ? [metadata.rcon_command] : [];
  }

  const itemCount = itemSlugs.length;
  const allNames = itemNames.join(", ");
  console.log(`[Order] Payment received: ${itemCount} item(s) [${allNames}] for EOS:${eos_id} on ${server}`);

  const panelUrl = process.env.PANEL_API_URL || "http://localhost:3001";

  // Create one order per item for individual delivery tracking
  for (let i = 0; i < itemSlugs.length; i++) {
    const itemSlug = itemSlugs[i];
    const itemName = itemNames[i];
    const rconCommand = rconCommands[i];

    // Save order to database
    try {
      await fetch(`${panelUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent,
          eos_id,
          player_name: eos_id,
          server,
          item_slug: itemSlug,
          item_name: itemName,
          amount_cents: Math.round((session.amount_total || 0) / itemCount),
          currency: session.currency,
          status: "paid",
          rcon_command: rconCommand,
        }),
      });
    } catch (err) {
      console.error(`[Order] Failed to save order for ${itemName}:`, err);
    }

    // Trigger auto-delivery for each item
    try {
      await fetch(`${panelUrl}/api/orders/auto-deliver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eos_id, server, rcon_command: rconCommand }),
      });
    } catch (err) {
      console.error(`[Order] Auto-delivery failed for ${itemName} (will retry):`, err);
    }
  }

  // Notify Discord - single notification per checkout
  const discordWebhookUrl = process.env.DISCORD_PURCHASE_WEBHOOK_URL;
  if (discordWebhookUrl) {
    try {
      const amount = ((session.amount_total || 0) / 100).toFixed(2);
      const itemList =
        itemCount === 1
          ? itemNames[0]
          : `${itemCount} items: ${allNames}`;

      await fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "New Purchase",
              color: 0x10b981,
              fields: [
                { name: "Items", value: itemList || "Unknown", inline: false },
                { name: "EOS ID", value: `\`${eos_id}\`` || "Unknown", inline: true },
                { name: "Server", value: server || "Unknown", inline: true },
                { name: "Amount", value: `$${amount}`, inline: true },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "DodoArk Store" },
            },
          ],
        }),
      });
    } catch (err) {
      console.error("[Order] Failed to send Discord notification:", err);
    }
  }
}

async function handleRefund(charge: Stripe.Charge) {
  console.log(`[Refund] Charge ${charge.id} refunded`);

  const panelUrl = process.env.PANEL_API_URL || "http://localhost:3001";

  try {
    await fetch(`${panelUrl}/api/orders/refund`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stripe_payment_intent_id: charge.payment_intent,
      }),
    });
  } catch (err) {
    console.error("[Refund] Failed to update order status:", err);
  }
}
