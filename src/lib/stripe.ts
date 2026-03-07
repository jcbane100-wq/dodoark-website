import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is required");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});

export interface StoreItem {
  slug: string;
  name: string;
  description: string;
  price_cents: number;
  category: string;
  cluster: "both" | "pvp" | "pve";
  required_map?: string;
  rcon_command_template: string;
  stripe_price_id?: string;
}

export const STORE_ITEMS: StoreItem[] = [
  // === PvE Exclusive ===
  {
    slug: "premium-plus",
    name: "Premium+ (1 Month)",
    description:
      "Premium+ rank on all PvE servers. Exclusive Discord role, Premium+ Map access, 2x mutations, 2x shiny spawns, dino finder.",
    price_cents: 0,
    category: "subscription",
    cluster: "pve",
    rcon_command_template: "ScriptCommand AddPremium {player_id}",
  },

  // === Both Clusters ===
  {
    slug: "loot-crate-5",
    name: "5 Loot Crates",
    description: "5 mystery crates with 3-5 drops each. Random high-tier dinos, weapons, saddles, blueprints, and element.",
    price_cents: 1499,
    category: "loot",
    cluster: "both",
    rcon_command_template: "ScriptCommand GiveLootCrates {player_id} 5",
  },
  {
    slug: "loot-crate-10",
    name: "10 + 2 Bonus Loot Crates",
    description: "12 mystery crates total. Random high-tier dinos, weapons, saddles, blueprints, and element.",
    price_cents: 2699,
    category: "loot",
    cluster: "both",
    rcon_command_template: "ScriptCommand GiveLootCrates {player_id} 12",
  },
  {
    slug: "loot-crate-20",
    name: "20 + 5 Bonus Loot Crates",
    description: "25 mystery crates total. Random high-tier dinos, weapons, saddles, blueprints, and element.",
    price_cents: 4499,
    category: "loot",
    cluster: "both",
    rcon_command_template: "ScriptCommand GiveLootCrates {player_id} 25",
  },
  {
    slug: "unlock-bosses",
    name: "Unlock All Bosses",
    description: "Unlock All Tek Engrams + Boss Ascensions. Increases your level cap by 45 levels.",
    price_cents: 4499,
    category: "unlock",
    cluster: "both",
    rcon_command_template: "GiveEngramsTekGramsTo {player_id}",
  },
  {
    slug: "unlock-notes",
    name: "Unlock All Notes",
    description: "Unlocks all Explorer Notes & Bobs Tale Notes. Increases your level cap.",
    price_cents: 3499,
    category: "unlock",
    cluster: "both",
    rcon_command_template: "GiveAllExplorersNotesTo {player_id}",
  },
  {
    slug: "max-level",
    name: "Max Level",
    description: "Instantly max your character level. Works with completed notes and ascensions.",
    price_cents: 2999,
    category: "boost",
    cluster: "both",
    rcon_command_template: "SetPlayerLevel {player_id} 105",
  },

  // === PvP Exclusive - Boss Kits ===
  {
    slug: "boss-kit-broodmother",
    name: "Boss Kit: Broodmother Alpha",
    description: "All artifacts and trophies needed for the Alpha Broodmother boss fight. Must be on The Island.",
    price_cents: 499,
    category: "boss-kit",
    cluster: "pvp",
    required_map: "The Island",
    rcon_command_template: "ScriptCommand GiveBossKit {player_id} Broodmother Alpha",
  },
  {
    slug: "boss-kit-megapithecus",
    name: "Boss Kit: Megapithecus Alpha",
    description: "All artifacts and trophies needed for the Alpha Megapithecus boss fight. Must be on The Island.",
    price_cents: 499,
    category: "boss-kit",
    cluster: "pvp",
    required_map: "The Island",
    rcon_command_template: "ScriptCommand GiveBossKit {player_id} Megapithecus Alpha",
  },
  {
    slug: "boss-kit-dragon",
    name: "Boss Kit: Dragon Alpha",
    description: "All artifacts and trophies needed for the Alpha Dragon boss fight. Must be on The Island.",
    price_cents: 499,
    category: "boss-kit",
    cluster: "pvp",
    required_map: "The Island",
    rcon_command_template: "ScriptCommand GiveBossKit {player_id} Dragon Alpha",
  },
  {
    slug: "boss-kit-manticore",
    name: "Boss Kit: Manticore Alpha",
    description: "All artifacts and trophies needed for the Alpha Manticore boss fight. Must be on Scorched Earth.",
    price_cents: 499,
    category: "boss-kit",
    cluster: "pvp",
    required_map: "Scorched Earth",
    rcon_command_template: "ScriptCommand GiveBossKit {player_id} Manticore Alpha",
  },
  {
    slug: "boss-kit-center-hard",
    name: "Boss Kit: Center Hard",
    description: "All artifacts and trophies needed for the Center Hard boss fight. Must be on The Center.",
    price_cents: 699,
    category: "boss-kit",
    cluster: "pvp",
    required_map: "The Center",
    rcon_command_template: "ScriptCommand GiveBossKit {player_id} Center Hard",
  },
  {
    slug: "boss-kit-aberration",
    name: "Boss Kit: Aberration Alpha",
    description: "All artifacts and trophies needed for the Aberration Alpha boss fight. Must be on Aberration.",
    price_cents: 699,
    category: "boss-kit",
    cluster: "pvp",
    required_map: "Aberration",
    rcon_command_template: "ScriptCommand GiveBossKit {player_id} Aberration Alpha",
  },
];

export function getStoreItem(slug: string): StoreItem | undefined {
  return STORE_ITEMS.find((item) => item.slug === slug);
}
