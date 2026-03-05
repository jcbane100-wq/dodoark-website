import { Crown, Swords, TreePine, Coins, Package, ShoppingCart, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Store - DodoArk",
  description: "DodoArk server store. Purchase ranks, packages, and cosmetics to support the servers.",
};

const storeCategories = [
  {
    icon: Crown,
    title: "Global Ranks",
    description:
      "Premium ranks with perks across all servers. Get colored chat, priority queue, bonus kits, and more.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    borderColor: "border-yellow-500/20",
    buttonColor: "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25",
    items: ["VIP Rank", "VIP+ Rank", "MVP Rank", "Legend Rank"],
  },
  {
    icon: Swords,
    title: "PvP Packages",
    description:
      "Starter kits, resource packs, and PvP-specific items for the PvP cluster. Get a head start on your conquest.",
    color: "text-red-400",
    bg: "bg-red-400/10",
    borderColor: "border-red-500/20",
    buttonColor: "bg-red-500/15 text-red-400 hover:bg-red-500/25",
    items: ["Starter Kit", "Raider Pack", "Turret Bundle", "Base Starter"],
  },
  {
    icon: TreePine,
    title: "PvE Packages",
    description:
      "Building materials, breeding items, and PvE-focused kits for the PvE cluster. Build your dream base.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    borderColor: "border-blue-500/20",
    buttonColor: "bg-blue-500/15 text-blue-400 hover:bg-blue-500/25",
    items: ["Builder Kit", "Breeder Pack", "Explorer Bundle", "Tek Starter"],
  },
  {
    icon: Coins,
    title: "Points / Currency",
    description:
      "Purchase in-game points to spend at the in-game shop. Use points for items, dinos, and services.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    borderColor: "border-emerald-500/20",
    buttonColor: "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25",
    items: ["1,000 Points", "5,000 Points", "10,000 Points", "25,000 Points"],
  },
  {
    icon: Package,
    title: "Crates",
    description:
      "Mystery crates with randomized loot. From common to legendary, test your luck with our crate system.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    borderColor: "border-purple-500/20",
    buttonColor: "bg-purple-500/15 text-purple-400 hover:bg-purple-500/25",
    items: ["Common Crate", "Rare Crate", "Epic Crate", "Legendary Crate"],
  },
];

export default function StorePage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Store</h1>
      <p className="page-subtitle">
        Support DodoArk and get awesome perks. All purchases go directly towards server hosting and development.
      </p>

      {/* Coming soon banner */}
      <div className="mb-10 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent">
        <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
          <div className="flex-shrink-0 rounded-2xl bg-emerald-500/10 p-4">
            <ShoppingCart className="h-10 w-10 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-2xl font-bold text-white">Store Coming Soon!</h2>
            <p className="text-gray-400">
              Our store is currently being set up and will be powered by Tebex. Stay tuned for launch
              announcements in our Discord server.
            </p>
          </div>
          <a
            href="https://discord.gg/neHmXztaDw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-emerald-500/20 px-6 py-3 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/30"
          >
            Get Notified
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {storeCategories.map((category) => (
          <div
            key={category.title}
            className={`group overflow-hidden rounded-xl border ${category.borderColor} bg-dark-800 transition-all hover:shadow-lg hover:shadow-black/20`}
          >
            <div className="p-6">
              <div className={`mb-4 inline-flex rounded-xl ${category.bg} p-3`}>
                <category.icon className={`h-7 w-7 ${category.color}`} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{category.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-400">
                {category.description}
              </p>

              {/* Preview items */}
              <div className="mb-5 space-y-2">
                {category.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg bg-dark-700/50 px-3 py-2 text-sm text-gray-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                    {item}
                  </div>
                ))}
              </div>

              <button
                disabled
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium opacity-50 cursor-not-allowed ${category.buttonColor}`}
              >
                Browse
                <span className="text-xs">(Coming Soon)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Powered by Tebex */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-600">
          Powered by Tebex &mdash; Secure payments via PayPal, Credit Card, and more.
        </p>
      </div>
    </div>
  );
}
