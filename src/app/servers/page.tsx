import { Swords, TreePine, Monitor } from "lucide-react";
import ServerCard from "@/components/ServerCard";
import { pvpServers, pveServers, type ServerWithStatus } from "@/lib/servers";
import { getServers } from "@/lib/api";

export const metadata = {
  title: "Server IPs - DodoArk",
  description: "Connect to DodoArk PvP and PvE ARK Survival Ascended servers. All server IPs and connection details.",
};

export default async function ServersPage() {
  const allServers = await getServers();
  const pvp = allServers.filter((s) => s.cluster === "pvp");
  const pve = allServers.filter((s) => s.cluster === "pve");

  return (
    <div className="page-container">
      <div className="mb-4">
        <h1 className="page-title">Server IPs</h1>
        <p className="page-subtitle">
          Connect to any of our 18 servers across PvP and PvE clusters. All servers support crossplay
          (Steam + Xbox + PlayStation).
        </p>
      </div>

      {/* Crossplay notice */}
      <div className="mb-10 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <Monitor className="h-5 w-5 flex-shrink-0 text-emerald-400" />
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-emerald-400">Crossplay Enabled</span> &mdash; All servers
          support Steam, Xbox, and PlayStation. Search for &quot;DodoArk&quot; in the unofficial server browser
          or connect directly using the IPs below.
        </p>
      </div>

      {/* PvP Cluster */}
      <section className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-red-500/20 p-2">
            <Swords className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">PvP Cluster</h2>
            <p className="text-sm text-gray-400">
              5x rates &middot; Tribe limit 6 &middot; Alliances disabled &middot; Wild dinos up to 150
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pvp.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </section>

      {/* PvE Cluster */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/20 p-2">
            <TreePine className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">PvE Cluster</h2>
            <p className="text-sm text-gray-400">
              Up to 15x breeding &middot; Tribe limit 6 &middot; Alliances enabled (max 10) &middot; Tribe war enabled
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pve.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </section>
    </div>
  );
}
