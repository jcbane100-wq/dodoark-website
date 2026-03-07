"use client";

import { useState } from "react";
import {
  Crown,
  Package,
  ShoppingCart,
  Trophy,
  BookOpen,
  Zap,
  CreditCard,
  X,
  Loader2,
  Shield,
  Info,
  Swords,
  TreePine,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

interface StoreItem {
  slug: string;
  icon: React.ElementType;
  title: string;
  description: string;
  price: string;
  priceCents: number;
  color: string;
  bg: string;
  borderColor: string;
  buttonColor: string;
  items: string[];
  available: boolean;
  category: string;
  cluster: "both" | "pvp" | "pve";
  requiredMap?: string;
  maxQty: number;
}

const storeItems: StoreItem[] = [
  // === PvE Exclusive ===
  {
    slug: "premium-plus",
    icon: Crown,
    title: "Premium+",
    description:
      "Premium+ rank on all PvE servers. Exclusive Discord role, access to Premium+ Map, 2x mutation chance, 2x shiny spawns, dino finder, and more.",
    price: "TBD",
    priceCents: 0,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    borderColor: "border-yellow-500/20",
    buttonColor: "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25",
    items: [
      "Premium+ Rank (1 Month)",
      "Exclusive Discord Role & VIP Channels",
      "Premium+ Map Access (Transfer Enabled)",
      "10,000 Bonus Points on Premium+ Map",
      "500 Points/Hour on Premium+ Map",
      "2x Mutation Breeding Chance",
      "2x Shiny Dino Spawns",
      "Dino Finder (Filter by Species, Gender, Age, Level)",
    ],
    available: false,
    category: "subscription",
    cluster: "pve",
    maxQty: 1,
  },

  // === Both Clusters ===
  {
    slug: "loot-crate-5",
    icon: Package,
    title: "5 Loot Crates",
    description:
      "5 mystery crates with 3-5 drops each. Random high-tier dinos, weapons, saddles, blueprints, and element!",
    price: "$14.99",
    priceCents: 1499,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    borderColor: "border-purple-500/20",
    buttonColor: "bg-purple-500/15 text-purple-400 hover:bg-purple-500/25",
    items: [
      "5 Mystery Crates",
      "3-5 Drops Per Crate",
      "Random High-Tier Dinos (Max Level, 100% Imprint)",
      "High Tier Weapons, Saddles & Blueprints",
      "50% Chance for Blueprints",
      "Element Drops",
    ],
    available: true,
    category: "loot",
    cluster: "both",
    maxQty: 10,
  },
  {
    slug: "loot-crate-10",
    icon: Package,
    title: "10 + 2 Bonus Crates",
    description:
      "12 mystery crates total with bonus value. Same amazing drops as the 5-pack!",
    price: "$26.99",
    priceCents: 2699,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    borderColor: "border-purple-500/20",
    buttonColor: "bg-purple-500/15 text-purple-400 hover:bg-purple-500/25",
    items: [
      "12 Mystery Crates (10 + 2 Bonus)",
      "Best Value Per Crate",
      "Random High-Tier Dinos (Max Level, 100% Imprint)",
      "High Tier Weapons, Saddles & Blueprints",
      "50% Chance for Blueprints",
      "Element Drops",
    ],
    available: true,
    category: "loot",
    cluster: "both",
    maxQty: 10,
  },
  {
    slug: "loot-crate-20",
    icon: Package,
    title: "20 + 5 Bonus Crates",
    description:
      "25 mystery crates total - the ultimate loot haul with the best bonus!",
    price: "$44.99",
    priceCents: 4499,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    borderColor: "border-purple-500/20",
    buttonColor: "bg-purple-500/15 text-purple-400 hover:bg-purple-500/25",
    items: [
      "25 Mystery Crates (20 + 5 Bonus)",
      "Best Overall Value",
      "Random High-Tier Dinos (Max Level, 100% Imprint)",
      "High Tier Weapons, Saddles & Blueprints",
      "50% Chance for Blueprints",
      "Element Drops",
    ],
    available: true,
    category: "loot",
    cluster: "both",
    maxQty: 10,
  },
  {
    slug: "unlock-bosses",
    icon: Trophy,
    title: "Unlock All Bosses",
    description:
      "Unlock All Tek Engrams + Boss Ascensions. Increases your level cap by 45 levels (Ascensions).",
    price: "$44.99",
    priceCents: 4499,
    color: "text-red-400",
    bg: "bg-red-400/10",
    borderColor: "border-red-500/20",
    buttonColor: "bg-red-500/15 text-red-400 hover:bg-red-500/25",
    items: [
      "Unlocks All Tek Engrams",
      "Survivor Implant for All Bosses",
      "+45 Levels (Ascensions)",
      "Requires Respawn After Purchase",
    ],
    available: true,
    category: "unlock",
    cluster: "both",
    maxQty: 1,
  },
  {
    slug: "unlock-notes",
    icon: BookOpen,
    title: "Unlock All Notes",
    description:
      "Unlocks all Explorer Notes & Bobs Tale Notes. Increases your level cap.",
    price: "$34.99",
    priceCents: 3499,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    borderColor: "border-amber-500/20",
    buttonColor: "bg-amber-500/15 text-amber-400 hover:bg-amber-500/25",
    items: [
      "All Explorer Notes & Bobs Tale Notes",
      "Increases Your Level Cap",
      "Requires Respawn After Purchase",
      "Only Unlocks Notes Presently in the Game",
    ],
    available: true,
    category: "unlock",
    cluster: "both",
    maxQty: 1,
  },
  {
    slug: "max-level",
    icon: Zap,
    title: "Max Level",
    description:
      "Instantly makes you the max level you can be! Adds enough EXP to reach maximum possible level for your character.",
    price: "$29.99",
    priceCents: 2999,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    borderColor: "border-emerald-500/20",
    buttonColor: "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25",
    items: [
      "Instant Max Level for Your Character",
      "Works with Completed Notes & Ascensions",
      "Level 105 Without Bosses/Notes",
      "Unlock Bosses & Notes First for Max Benefit",
    ],
    available: true,
    category: "boost",
    cluster: "both",
    maxQty: 1,
  },

  // === PvP Exclusive - Boss Kits ===
  {
    slug: "boss-kit-broodmother",
    icon: Swords,
    title: "Boss Kit: Broodmother Alpha",
    description: "Everything you need for the Alpha Broodmother boss fight on The Island.",
    price: "$4.99",
    priceCents: 499,
    color: "text-red-400",
    bg: "bg-red-400/10",
    borderColor: "border-red-500/20",
    buttonColor: "bg-red-500/15 text-red-400 hover:bg-red-500/25",
    items: [
      "Artifact of the Clever 1x",
      "Artifact of the Hunter 1x",
      "Artifact of the Massive 1x",
      "Argentavis Talon 10x",
      "Sarcosuchus Skin 10x",
      "Sauropod Vertebra 10x",
      "Titanoboa Venom 10x",
    ],
    available: true,
    category: "boss-kit",
    cluster: "pvp",
    requiredMap: "The Island",
    maxQty: 5,
  },
  {
    slug: "boss-kit-megapithecus",
    icon: Swords,
    title: "Boss Kit: Megapithecus Alpha",
    description: "Everything you need for the Alpha Megapithecus boss fight on The Island.",
    price: "$4.99",
    priceCents: 499,
    color: "text-red-400",
    bg: "bg-red-400/10",
    borderColor: "border-red-500/20",
    buttonColor: "bg-red-500/15 text-red-400 hover:bg-red-500/25",
    items: [
      "Artifact of the Brute 1x",
      "Artifact of the Devourer 1x",
      "Artifact of the Pack 1x",
      "Megalania Toxin 10x",
      "Megalodon Tooth 10x",
      "Spinosaurus Sail 10x",
      "Therizino Claws 10x",
      "Thylacoleo Hook-Claw 10x",
    ],
    available: true,
    category: "boss-kit",
    cluster: "pvp",
    requiredMap: "The Island",
    maxQty: 5,
  },
  {
    slug: "boss-kit-dragon",
    icon: Swords,
    title: "Boss Kit: Dragon Alpha",
    description: "Everything you need for the Alpha Dragon boss fight on The Island.",
    price: "$4.99",
    priceCents: 499,
    color: "text-red-400",
    bg: "bg-red-400/10",
    borderColor: "border-red-500/20",
    buttonColor: "bg-red-500/15 text-red-400 hover:bg-red-500/25",
    items: [
      "Artifact of the Cunning 1x",
      "Artifact of the Immune 1x",
      "Artifact of the Skylord 1x",
      "Artifact of the Strong 1x",
      "Allosaurus Brain 10x",
      "Basilosaurus Blubber 10x",
      "Giganotosaurus Heart 2x",
      "Tusoteuthis Tentacle 10x",
      "Tyrannosaurus Arm 15x",
      "Yutyrannus Lungs 10x",
    ],
    available: true,
    category: "boss-kit",
    cluster: "pvp",
    requiredMap: "The Island",
    maxQty: 5,
  },
  {
    slug: "boss-kit-manticore",
    icon: Swords,
    title: "Boss Kit: Manticore Alpha",
    description: "Everything you need for the Alpha Manticore boss fight on Scorched Earth.",
    price: "$4.99",
    priceCents: 499,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    borderColor: "border-orange-500/20",
    buttonColor: "bg-orange-500/15 text-orange-400 hover:bg-orange-500/25",
    items: [
      "Fire Talon 20x",
      "Lightning Talon 20x",
      "Poison Talon 20x",
      "Artifact of the Gatekeeper 1x",
      "Artifact of the Crag 1x",
      "Artifact of the Destroyer 1x",
    ],
    available: true,
    category: "boss-kit",
    cluster: "pvp",
    requiredMap: "Scorched Earth",
    maxQty: 5,
  },
  {
    slug: "boss-kit-center-hard",
    icon: Swords,
    title: "Boss Kit: Center Hard",
    description: "Everything you need for the Center Hard boss fight on The Center.",
    price: "$6.99",
    priceCents: 699,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    borderColor: "border-cyan-500/20",
    buttonColor: "bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25",
    items: [
      "Argentavis Talon 25x",
      "Basilosaurus Blubber 25x",
      "Megalania Toxin 25x",
      "Megalodon Tooth 25x",
      "Sauropod Vertebra 25x",
      "Sarcosuchus Skin 25x",
      "Spinosaurus Sail 25x",
      "Thylacoleo Hook-Claw 25x",
      "Titanoboa Venom 25x",
      "Tusoteuthis Tentacle 25x",
      "Artifact of the Clever 1x",
      "Artifact of the Hunter 1x",
      "Artifact of the Massive 1x",
      "Artifact of the Pack 1x",
      "Artifact of the Devourer 1x",
      "Artifact of the Brute 1x",
    ],
    available: true,
    category: "boss-kit",
    cluster: "pvp",
    requiredMap: "The Center",
    maxQty: 5,
  },
  {
    slug: "boss-kit-aberration",
    icon: Swords,
    title: "Boss Kit: Aberration Alpha",
    description: "Everything you need for the Aberration Alpha boss fight on Aberration.",
    price: "$6.99",
    priceCents: 699,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    borderColor: "border-violet-500/20",
    buttonColor: "bg-violet-500/15 text-violet-400 hover:bg-violet-500/25",
    items: [
      "Artifact of the Depths 1x",
      "Artifact of the Shadows 1x",
      "Artifact of the Stalker 1x",
      "Basilisk Scale 8x",
      "Nameless Venom 20x",
      "Reaper Pheromone Gland 7x",
      "Rock Drake Feather 7x",
      "Alpha Basilisk Fang 1x",
      "Alpha Karkinos Claw 1x",
      "Alpha Reaper King Barb 1x",
    ],
    available: true,
    category: "boss-kit",
    cluster: "pvp",
    requiredMap: "Aberration",
    maxQty: 5,
  },
];

const pvpServers = [
  "DodoArk PvP - The Island",
  "DodoArk PvP - Scorched Earth",
  "DodoArk PvP - The Center",
  "DodoArk PvP - Aberration",
  "DodoArk PvP - Extinction",
  "DodoArk PvP - Astraeos",
  "DodoArk PvP - Ragnarok",
  "DodoArk PvP - Valguero",
  "DodoArk PvP - Lost Colony",
];

const pveServers = [
  "DodoArk PvE - The Island",
  "DodoArk PvE - Scorched Earth",
  "DodoArk PvE - The Center",
  "DodoArk PvE - Aberration",
  "DodoArk PvE - Extinction",
  "DodoArk PvE - Astraeos",
  "DodoArk PvE - Ragnarok",
  "DodoArk PvE - Valguero",
  "DodoArk PvE - Lost Colony",
];

function isValidEosId(id: string): boolean {
  return /^[a-f0-9]{32}$/i.test(id.trim());
}

interface CartEntry {
  item: StoreItem;
  quantity: number;
}

type ClusterTab = "pvp" | "pve";

export default function StorePage() {
  const [activeTab, setActiveTab] = useState<ClusterTab>("pvp");
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [eosId, setEosId] = useState("");
  const [server, setServer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredItems = storeItems.filter(
    (item) => item.cluster === "both" || item.cluster === activeTab
  );

  const servers = activeTab === "pvp" ? pvpServers : pveServers;

  const cartTotal = cart.reduce((sum, e) => sum + e.item.priceCents * e.quantity, 0);
  const cartCount = cart.reduce((sum, e) => sum + e.quantity, 0);

  // Get required maps from boss kits in cart
  const cartBossKitMaps = Array.from(
    new Set(
      cart
        .filter((e) => e.item.requiredMap)
        .map((e) => e.item.requiredMap!)
    )
  );
  const hasBossKits = cartBossKitMaps.length > 0;

  // Filter servers to match boss kit maps if present
  const availableServers =
    cartBossKitMaps.length === 1
      ? servers.filter((s) => s.includes(cartBossKitMaps[0]))
      : servers;

  function addToCart(item: StoreItem) {
    // Check boss kit map conflict
    if (item.requiredMap && hasBossKits && !cartBossKitMaps.includes(item.requiredMap)) {
      setError(
        `Can't mix boss kits from different maps. Your cart has boss kits for ${cartBossKitMaps[0]}, but this one requires ${item.requiredMap}. Complete your current order first.`
      );
      setCartOpen(true);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((e) => e.item.slug === item.slug);
      if (existing) {
        if (existing.quantity >= item.maxQty) return prev;
        return prev.map((e) =>
          e.item.slug === item.slug ? { ...e, quantity: e.quantity + 1 } : e
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setError("");
  }

  function updateQuantity(slug: string, delta: number) {
    setCart((prev) => {
      return prev
        .map((e) => {
          if (e.item.slug !== slug) return e;
          const newQty = e.quantity + delta;
          if (newQty <= 0) return null;
          if (newQty > e.item.maxQty) return e;
          return { ...e, quantity: newQty };
        })
        .filter(Boolean) as CartEntry[];
    });
  }

  function removeFromCart(slug: string) {
    setCart((prev) => prev.filter((e) => e.item.slug !== slug));
    setServer("");
  }

  function clearCart() {
    setCart([]);
    setServer("");
    setError("");
  }

  function getCartQty(slug: string): number {
    return cart.find((e) => e.item.slug === slug)?.quantity || 0;
  }

  async function handleCheckout() {
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!eosId.trim() || !server) {
      setError("Please enter your EOS ID and select a server.");
      return;
    }
    if (!isValidEosId(eosId)) {
      setError(
        "Invalid EOS ID. It should be 32 characters (letters a-f and numbers). Use the EOS ID Helper mod in-game to find yours."
      );
      return;
    }

    // Validate boss kit maps match selected server
    for (const entry of cart) {
      if (entry.item.requiredMap && !server.includes(entry.item.requiredMap)) {
        setError(
          `${entry.item.title} requires you to be on ${entry.item.requiredMap}, but you selected a different server.`
        );
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((e) => ({ slug: e.item.slug, quantity: e.quantity })),
          eos_id: eosId.trim().toLowerCase(),
          server,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Failed to connect to checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Store</h1>
      <p className="page-subtitle">
        Support DodoArk and get awesome perks. All purchases go directly towards
        server hosting and development.
      </p>

      {/* Security badge */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent">
        <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
          <div className="flex-shrink-0 rounded-2xl bg-emerald-500/10 p-4">
            <Shield className="h-10 w-10 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-2xl font-bold text-white">Secure Payments</h2>
            <p className="text-gray-400">
              All payments are processed securely through Stripe. We never see or
              store your card details. Items are delivered automatically to your
              character via your EOS ID.
            </p>
          </div>
        </div>
      </div>

      {/* PvP / PvE Tabs */}
      <div className="mb-8 flex gap-2 rounded-xl border border-zinc-700/50 bg-dark-800 p-1.5">
        <button
          onClick={() => setActiveTab("pvp")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            activeTab === "pvp"
              ? "bg-red-500/15 text-red-400 shadow-sm"
              : "text-gray-400 hover:text-gray-300 hover:bg-dark-700/50"
          }`}
        >
          <Swords className="h-4 w-4" />
          PvP Store
        </button>
        <button
          onClick={() => setActiveTab("pve")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            activeTab === "pve"
              ? "bg-blue-500/15 text-blue-400 shadow-sm"
              : "text-gray-400 hover:text-gray-300 hover:bg-dark-700/50"
          }`}
        >
          <TreePine className="h-4 w-4" />
          PvE Store
        </button>
      </div>

      {/* Error banner */}
      {error && !cartOpen && !checkoutOpen && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
          <button onClick={() => setError("")} className="float-right text-red-400 hover:text-red-300">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* PvP layout */}
      {activeTab === "pvp" && (
        <>
          <h2 className="mb-4 text-lg font-bold text-white">General Items</h2>
          <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems
              .filter((item) => item.category !== "boss-kit")
              .map((item) => (
                <ItemCard
                  key={item.slug}
                  item={item}
                  cartQty={getCartQty(item.slug)}
                  onAdd={() => addToCart(item)}
                />
              ))}
          </div>

          <h2 className="mb-2 text-lg font-bold text-white">Boss Kits</h2>
          <p className="mb-4 text-sm text-gray-400">
            PvP Exclusive &mdash; All artifacts and trophies needed for boss
            fights. You must be on the correct map to receive your kit.
          </p>
          <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems
              .filter((item) => item.category === "boss-kit")
              .map((item) => (
                <ItemCard
                  key={item.slug}
                  item={item}
                  cartQty={getCartQty(item.slug)}
                  onAdd={() => addToCart(item)}
                />
              ))}
          </div>
        </>
      )}

      {/* PvE layout */}
      {activeTab === "pve" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.slug}
              item={item}
              cartQty={getCartQty(item.slug)}
              onAdd={() => addToCart(item)}
            />
          ))}
        </div>
      )}

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all hover:bg-emerald-500 hover:scale-105"
        >
          <ShoppingCart className="h-5 w-5" />
          Cart ({cartCount})
          <span className="ml-1 text-emerald-200">
            ${(cartTotal / 100).toFixed(2)}
          </span>
        </button>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70">
          <div
            className="absolute inset-0"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-dark-800 border-l border-zinc-700 flex flex-col">
            {/* Cart header */}
            <div className="flex items-center justify-between border-b border-zinc-700 p-4">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <ShoppingCart className="h-5 w-5" />
                Cart ({cartCount})
              </h2>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:bg-zinc-700 hover:text-white transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setCartOpen(false)}
                  className="rounded-lg p-1 text-gray-400 hover:bg-zinc-700 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Your cart is empty. Add items from the store.
                </p>
              ) : (
                cart.map((entry) => (
                  <div
                    key={entry.item.slug}
                    className="rounded-xl border border-zinc-700 bg-dark-700/50 p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm truncate">
                          {entry.item.title}
                        </p>
                        {entry.item.requiredMap && (
                          <span className="text-xs text-gray-500">
                            {entry.item.requiredMap}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(entry.item.slug)}
                        className="ml-2 rounded p-1 text-gray-500 hover:bg-zinc-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(entry.item.slug, -1)}
                          className="rounded-md bg-dark-800 p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-white">
                          {entry.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(entry.item.slug, 1)}
                          disabled={entry.quantity >= entry.item.maxQty}
                          className="rounded-md bg-dark-800 p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-emerald-400">
                        ${((entry.item.priceCents * entry.quantity) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart footer */}
            {cart.length > 0 && (
              <div className="border-t border-zinc-700 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total</span>
                  <span className="text-xl font-bold text-emerald-400">
                    ${(cartTotal / 100).toFixed(2)}
                  </span>
                </div>
                {cartBossKitMaps.length > 1 && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                    Boss kits from different maps can&apos;t be purchased together. Remove conflicting items.
                  </div>
                )}
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                    setError("");
                  }}
                  disabled={cartBossKitMaps.length > 1}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard className="h-4 w-4" />
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-700 bg-dark-800 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Checkout</h2>
              <button
                onClick={() => {
                  setCheckoutOpen(false);
                  setError("");
                }}
                className="rounded-lg p-1 text-gray-400 hover:bg-zinc-700 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Order summary */}
            <div className="mb-6 rounded-xl border border-zinc-700 bg-dark-700/50 p-4 space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Order Summary
              </p>
              {cart.map((entry) => (
                <div
                  key={entry.item.slug}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-300">
                    {entry.item.title}
                    {entry.quantity > 1 && (
                      <span className="text-gray-500"> x{entry.quantity}</span>
                    )}
                  </span>
                  <span className="font-medium text-white">
                    ${((entry.item.priceCents * entry.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-zinc-600 pt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">Total</span>
                <span className="text-lg font-bold text-emerald-400">
                  ${(cartTotal / 100).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Required map notice */}
            {hasBossKits && (
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-2">
                <Info className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-orange-300">
                  Your cart includes boss kits that require you to be on{" "}
                  <strong>{cartBossKitMaps[0]}</strong>. The server has been
                  filtered to match.
                </p>
              </div>
            )}

            {/* EOS ID input */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                EOS ID
              </label>
              <input
                type="text"
                value={eosId}
                onChange={(e) => setEosId(e.target.value)}
                placeholder="e.g. a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4"
                maxLength={32}
                className="w-full rounded-lg border border-zinc-700 bg-dark-700 px-4 py-2.5 text-sm text-white font-mono placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="mt-2 flex items-start gap-2 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2">
                <Info className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-300">
                  Find your EOS ID in-game using the{" "}
                  <strong>EOS ID Helper</strong> mod. Open the Radial Menu (R on
                  PC, Hold Square/X on console) to see your 32-character ID.
                </p>
              </div>
            </div>

            {/* Server select */}
            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Server
              </label>
              <select
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-dark-700 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">Select your server</option>
                {availableServers.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Redirecting to Stripe...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Pay ${(cartTotal / 100).toFixed(2)}
                </>
              )}
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              Secure payment via Stripe. You&apos;ll be redirected to complete
              your purchase.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-600">
          Secure payments via Stripe &mdash; Credit Card, Apple Pay, Google Pay,
          and more.
        </p>
      </div>
    </div>
  );
}

function ItemCard({
  item,
  cartQty,
  onAdd,
}: {
  item: StoreItem;
  cartQty: number;
  onAdd: () => void;
}) {
  const inCart = cartQty > 0;

  return (
    <div
      className={`group overflow-hidden rounded-xl border ${
        inCart ? "border-emerald-500/40" : item.borderColor
      } bg-dark-800 transition-all hover:shadow-lg hover:shadow-black/20`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`inline-flex rounded-xl ${item.bg} p-3`}>
            <item.icon className={`h-7 w-7 ${item.color}`} />
          </div>
          <div className="flex items-center gap-2">
            {item.requiredMap && (
              <span className="rounded-md bg-dark-700 px-2 py-1 text-xs text-gray-400 border border-zinc-700/50">
                {item.requiredMap}
              </span>
            )}
            {inCart && (
              <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/30">
                x{cartQty}
              </span>
            )}
          </div>
        </div>
        <h3 className="mb-1 text-xl font-bold text-white">{item.title}</h3>
        <p className="mb-1 text-lg font-semibold text-emerald-400">
          {item.price}
        </p>
        <p className="mb-4 text-sm leading-relaxed text-gray-400">
          {item.description}
        </p>

        <div className="mb-5 space-y-2">
          {item.items.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 rounded-lg bg-dark-700/50 px-3 py-2 text-sm text-gray-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gray-600" />
              {feature}
            </div>
          ))}
        </div>

        <button
          onClick={() => item.available && onAdd()}
          disabled={!item.available || cartQty >= item.maxQty}
          className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
            !item.available || cartQty >= item.maxQty
              ? `${item.buttonColor} opacity-50 cursor-not-allowed`
              : inCart
              ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 cursor-pointer"
              : `${item.buttonColor} cursor-pointer`
          }`}
        >
          {!item.available ? (
            <>Coming Soon</>
          ) : cartQty >= item.maxQty ? (
            <>Max in Cart</>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              {inCart ? "Add Another" : "Add to Cart"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
