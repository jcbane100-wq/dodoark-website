"use client";

import { useState } from "react";
import { AlertTriangle, Shield, Swords, TreePine, Ban, ChevronDown, ChevronUp } from "lucide-react";

interface RuleSection {
  id: string;
  title: string;
  icon: typeof Shield;
  iconColor: string;
  rules: { text: string; instantBan?: boolean }[];
}

const ruleSections: RuleSection[] = [
  {
    id: "general",
    title: "General Rules",
    icon: Shield,
    iconColor: "text-emerald-400",
    rules: [
      { text: "No cheating, hacking, or exploiting of any kind.", instantBan: true },
      { text: "No meshing (building under the mesh, shooting through mesh, etc.).", instantBan: true },
      { text: "No doxxing, real-life threats, or harassment.", instantBan: true },
      { text: "No racism, sexism, homophobia, or hate speech in chat or tribe/player names.", instantBan: true },
      { text: "No advertising other servers or communities." },
      { text: "No impersonating admins or staff members." },
      { text: "English only in global chat." },
      { text: "Follow admin instructions at all times. Arguing with admins in public channels will result in a mute." },
      { text: "Do not abuse game mechanics or bugs. Report any bugs to the admin team via Discord tickets." },
      { text: "Alt accounts are not allowed. One account per player.", instantBan: true },
      { text: "Teaming above the tribe limit (insiding with other tribes to bypass limits) is not allowed.", instantBan: true },
      { text: "Stream sniping is not allowed and will result in a ban.", instantBan: true },
    ],
  },
  {
    id: "pvp-building",
    title: "PvP Building Rules",
    icon: Swords,
    iconColor: "text-red-400",
    rules: [
      { text: "No building in mesh spots, under the mesh, or in unintended locations.", instantBan: true },
      { text: "No blocking obelisks, city terminals, or major resource spawns." },
      { text: "No spam building (foundation spam) across the map. Keep it to your base area." },
      { text: "No building in artifact caves (small caves with artifacts). Large caves are allowed." },
      { text: "Turret limit is 100 turrets in a 33-foundation radius. Exceeding this will result in turret wipe." },
      { text: "No more than 2 main bases per tribe across all maps in the cluster." },
      { text: "Teleporter and sleeping bag outposts are allowed but must not contain turrets." },
      { text: "No building within render distance of another tribe's base (except for raiding purposes)." },
      { text: "Clean up FOBs (Forward Operating Bases) within 24 hours of the raid ending." },
    ],
  },
  {
    id: "pvp-game",
    title: "PvP Game Rules",
    icon: Swords,
    iconColor: "text-red-400",
    rules: [
      { text: "Raiding is allowed 24/7 - this is PvP." },
      { text: "No passive dino killing unless they are blocking access to the base during a raid." },
      { text: "No caging players for more than 30 minutes." },
      { text: "No griefing new players on the beach. Allow players to reach at least stone tier before engaging." },
      { text: "Alliances are disabled. Do not team with other tribes during raids.", instantBan: true },
      { text: "No kiting wild dinos to other player's bases." },
      { text: "Insiding (joining a tribe to steal/destroy from within) is NOT allowed.", instantBan: true },
      { text: "If your tribe is wiped, you may not rejoin the server for 48 hours to prevent revenge cycling." },
      { text: "Do not repeatedly raid the same tribe within 48 hours (raid cooldown)." },
    ],
  },
  {
    id: "pve-building",
    title: "PvE Building Rules",
    icon: TreePine,
    iconColor: "text-blue-400",
    rules: [
      { text: "No blocking obelisks, city terminals, resource spawns, or explorer notes." },
      { text: "No building in artifact caves." },
      { text: "No spam building or foundation wiping. Place foundations only where you intend to build." },
      { text: "Maximum 2 bases per tribe per map." },
      { text: "Keep structure count reasonable. Excessive lag-causing builds will be asked to downsize." },
      { text: "Do not block waterways, paths, or commonly used routes." },
      { text: "Community buildings (public crafting stations, teleporters) are encouraged but must be maintained." },
      { text: "If you quit playing, demolish your structures or they will be removed after decay." },
      { text: "No pillar/foundation spam to reserve land. Build or lose it." },
    ],
  },
  {
    id: "pve-game",
    title: "PvE Game Rules",
    icon: TreePine,
    iconColor: "text-blue-400",
    rules: [
      { text: "No killing other players' tames." },
      { text: "No kiting wild dinos to other player's bases." },
      { text: "No stealing from other players' unlocked containers (even if technically possible)." },
      { text: "No luring aggressive wild dinos to other players during taming." },
      { text: "Tribe wars must be mutually agreed upon via Discord ticket (both tribes confirm)." },
      { text: "Do not pick up other players with flyers without consent." },
      { text: "Community events are organized via Discord. Participation is optional but encouraged." },
      { text: "Be respectful of shared resources. Do not monopolize rare spawns." },
      { text: "Help new players when possible. We are a community." },
    ],
  },
];

export default function RulesPage() {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(ruleSections.map((s) => s.id))
  );

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Server Rules</h1>
      <p className="page-subtitle">
        All players must follow these rules. Violations will result in warnings, temporary bans, or permanent bans
        depending on severity.
      </p>

      {/* Instant ban warning */}
      <div className="mb-10 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/5 p-5">
        <Ban className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
        <div>
          <h3 className="mb-1 font-semibold text-red-400">Instant Ban Offenses</h3>
          <p className="text-sm text-gray-400">
            Rules marked with a <span className="inline-flex items-center gap-1 text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" /> warning icon
            </span> are zero-tolerance offenses that result in an immediate permanent ban with no appeal.
          </p>
        </div>
      </div>

      {/* Rule sections */}
      <div className="space-y-4">
        {ruleSections.map((section) => {
          const isOpen = openSections.has(section.id);
          return (
            <div
              key={section.id}
              className="overflow-hidden rounded-xl border border-dark-600/50 bg-dark-800"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-dark-700/30"
              >
                <div className="flex items-center gap-3">
                  <section.icon className={`h-5 w-5 ${section.iconColor}`} />
                  <h2 className="text-lg font-bold text-white">{section.title}</h2>
                  <span className="rounded-full bg-dark-600 px-2.5 py-0.5 text-xs text-gray-400">
                    {section.rules.length} rules
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {isOpen && (
                <div className="border-t border-dark-600/50 px-6 py-4">
                  <ol className="space-y-3">
                    {section.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-dark-600 text-xs font-semibold text-gray-400">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <span className={`text-sm ${rule.instantBan ? "text-gray-200" : "text-gray-300"}`}>
                            {rule.text}
                          </span>
                          {rule.instantBan && (
                            <span className="ml-2 inline-flex items-center gap-1 rounded bg-red-500/15 px-2 py-0.5 text-xs font-medium text-red-400">
                              <AlertTriangle className="h-3 w-3" />
                              INSTANT BAN
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Appeal note */}
      <div className="mt-10 rounded-xl border border-dark-600/50 bg-dark-800 p-6 text-center">
        <h3 className="mb-2 text-lg font-bold text-white">Need to Report or Appeal?</h3>
        <p className="mb-4 text-sm text-gray-400">
          To report a rule violation or appeal a ban, open a ticket in our Discord server.
          Provide evidence (screenshots, video) whenever possible.
        </p>
        <a
          href="https://discord.gg/neHmXztaDw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#5865F2]/20 px-6 py-2.5 text-sm font-medium text-[#5865F2] transition-all hover:bg-[#5865F2]/30"
        >
          Open a Discord Ticket
        </a>
      </div>
    </div>
  );
}
