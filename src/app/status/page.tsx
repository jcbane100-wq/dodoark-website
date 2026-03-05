import { Activity, Server, Users, Clock, RefreshCw } from "lucide-react";
import StatusIndicator from "@/components/StatusIndicator";
import { getServers, getTotalPlayers, getOnlineServerCount } from "@/lib/api";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Server Status - DodoArk",
  description: "Live status of all DodoArk ARK Survival Ascended servers.",
};

export default async function StatusPage() {
  const allServers = await getServers();
  const totalPlayers = getTotalPlayers(allServers);
  const onlineCount = getOnlineServerCount(allServers);
  const pvpServers = allServers.filter((s) => s.cluster === "pvp");
  const pveServers = allServers.filter((s) => s.cluster === "pve");

  return (
    <div className="page-container">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Server Status</h1>
          <p className="text-lg text-gray-400">
            Live status of all DodoArk servers.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-dark-600/50 bg-dark-800 px-4 py-2 text-sm text-gray-400">
          <RefreshCw className="h-4 w-4" />
          Updates every 60s
        </div>
      </div>

      {/* Overall stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-dark-600/50 bg-dark-800 p-5">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
            <Server className="h-4 w-4" />
            Total Servers
          </div>
          <div className="text-3xl font-bold text-white">{allServers.length}</div>
        </div>
        <div className="rounded-xl border border-dark-600/50 bg-dark-800 p-5">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
            <Activity className="h-4 w-4 text-green-400" />
            Online
          </div>
          <div className="text-3xl font-bold text-emerald-400">{onlineCount}</div>
        </div>
        <div className="rounded-xl border border-dark-600/50 bg-dark-800 p-5">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
            <Users className="h-4 w-4" />
            Total Players
          </div>
          <div className="text-3xl font-bold text-white">{totalPlayers}</div>
        </div>
        <div className="rounded-xl border border-dark-600/50 bg-dark-800 p-5">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
            <Clock className="h-4 w-4" />
            Avg Uptime
          </div>
          <div className="text-3xl font-bold text-white">99.9%</div>
        </div>
      </div>

      {/* PvP servers */}
      <section className="mb-12">
        <h2 className="section-title flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          PvP Cluster
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pvpServers.map((server) => (
            <div key={server.id} className="rounded-xl border border-dark-600/50 bg-dark-800 p-5">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white">{server.map}</h3>
                  <p className="text-sm text-gray-500">{server.name}</p>
                </div>
                <StatusIndicator status={server.status} size="md" showLabel />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-dark-700/50 p-2.5 text-center">
                  <div className="text-xs text-gray-500">Players</div>
                  <div className="text-sm font-semibold text-white">
                    {server.playerCount}/{server.maxPlayers}
                  </div>
                </div>
                <div className="rounded-lg bg-dark-700/50 p-2.5 text-center">
                  <div className="text-xs text-gray-500">Uptime</div>
                  <div className="text-sm font-semibold text-white">{server.uptime}</div>
                </div>
                <div className="rounded-lg bg-dark-700/50 p-2.5 text-center">
                  <div className="text-xs text-gray-500">Type</div>
                  <div className="text-sm font-semibold text-red-400">PvP</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PvE servers */}
      <section>
        <h2 className="section-title flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-500" />
          PvE Cluster
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pveServers.map((server) => (
            <div key={server.id} className="rounded-xl border border-dark-600/50 bg-dark-800 p-5">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white">{server.map}</h3>
                  <p className="text-sm text-gray-500">{server.name}</p>
                </div>
                <StatusIndicator status={server.status} size="md" showLabel />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-dark-700/50 p-2.5 text-center">
                  <div className="text-xs text-gray-500">Players</div>
                  <div className="text-sm font-semibold text-white">
                    {server.playerCount}/{server.maxPlayers}
                  </div>
                </div>
                <div className="rounded-lg bg-dark-700/50 p-2.5 text-center">
                  <div className="text-xs text-gray-500">Uptime</div>
                  <div className="text-sm font-semibold text-white">{server.uptime}</div>
                </div>
                <div className="rounded-lg bg-dark-700/50 p-2.5 text-center">
                  <div className="text-xs text-gray-500">Type</div>
                  <div className="text-sm font-semibold text-blue-400">PvE</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
