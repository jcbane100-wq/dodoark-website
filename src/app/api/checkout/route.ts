import { NextRequest, NextResponse } from "next/server";
import { stripe, getStoreItem } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, eos_id, server } = body;

    // Support both cart (items array) and legacy single item
    const cartItems: { slug: string; quantity: number }[] = items
      ? items
      : body.item_slug
      ? [{ slug: body.item_slug, quantity: 1 }]
      : [];

    if (cartItems.length === 0 || !eos_id || !server) {
      return NextResponse.json(
        { error: "Missing required fields: items, eos_id, server" },
        { status: 400 }
      );
    }

    // Validate EOS ID format (32 hex characters)
    if (!/^[a-f0-9]{32}$/i.test(eos_id)) {
      return NextResponse.json(
        { error: "Invalid EOS ID format. Must be 32 hexadecimal characters." },
        { status: 400 }
      );
    }

    // Resolve and validate all items
    const lineItems: {
      price_data: {
        currency: string;
        product_data: { name: string; description: string };
        unit_amount: number;
      };
      quantity: number;
    }[] = [];
    const rconCommands: string[] = [];
    const itemSlugs: string[] = [];
    const itemNames: string[] = [];

    for (const cartItem of cartItems) {
      const item = getStoreItem(cartItem.slug);
      if (!item) {
        return NextResponse.json(
          { error: `Item not found: ${cartItem.slug}` },
          { status: 404 }
        );
      }

      if (item.price_cents <= 0) {
        return NextResponse.json(
          { error: `${item.name} is not yet available for purchase` },
          { status: 400 }
        );
      }

      const qty = Math.min(Math.max(1, cartItem.quantity), 10);
      const rconCommand = item.rcon_command_template.replace(
        /{player_id}/g,
        eos_id
      );

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: item.price_cents,
        },
        quantity: qty,
      });

      // Add RCON command for each quantity
      for (let i = 0; i < qty; i++) {
        rconCommands.push(rconCommand);
      }
      for (let i = 0; i < qty; i++) {
        itemSlugs.push(item.slug);
        itemNames.push(item.name);
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/store`,
      metadata: {
        eos_id,
        server,
        item_slugs: JSON.stringify(itemSlugs),
        item_names: JSON.stringify(itemNames),
        rcon_commands: JSON.stringify(rconCommands),
      },
    });

    return NextResponse.json({ url: session.url, session_id: session.id });
  } catch (error) {
    console.error("[Checkout] Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
