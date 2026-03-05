import { getSupabase } from "./supabase";
import { servers, type ServerWithStatus, type ServerStatus } from "./servers";

const fallbackStatuses: Record<string, { status: ServerStatus; playerCount: number; uptime: string }> = {
  "pvp-island": { status: "online", playerCount: 32, uptime: "2d 14h" },
  "pvp-scorched": { status: "online", playerCount: 18, uptime: "2d 14h" },
  "pvp-center": { status: "online", playerCount: 24, uptime: "1d 8h" },
  "pvp-aberration": { status: "online", playerCount: 12, uptime: "2d 14h" },
  "pvp-extinction": { status: "online", playerCount: 20, uptime: "2d 14h" },
  "pvp-astraeos": { status: "online", playerCount: 28, uptime: "1d 22h" },
  "pvp-ragnarok": { status: "online", playerCount: 35, uptime: "3d 2h" },
  "pvp-valguero": { status: "online", playerCount: 15, uptime: "2d 9h" },
  "pvp-lostcolony": { status: "online", playerCount: 22, uptime: "1d 5h" },
  "pve-island": { status: "online", playerCount: 30, uptime: "4d 6h" },
  "pve-scorched": { status: "online", playerCount: 14, uptime: "4d 6h" },
  "pve-center": { status: "online", playerCount: 19, uptime: "4d 6h" },
  "pve-aberration": { status: "restarting", playerCount: 0, uptime: "0h 2m" },
  "pve-extinction": { status: "online", playerCount: 16, uptime: "3d 11h" },
  "pve-astraeos": { status: "online", playerCount: 21, uptime: "3d 18h" },
  "pve-ragnarok": { status: "online", playerCount: 25, uptime: "4d 6h" },
  "pve-valguero": { status: "online", playerCount: 11, uptime: "3d 1h" },
  "pve-lostcolony": { status: "online", playerCount: 17, uptime: "2d 15h" },
};

function getStaticServers(): ServerWithStatus[] {
  return servers.map((server) => {
    const mock = fallbackStatuses[server.id] || {
      status: "offline" as ServerStatus,
      playerCount: 0,
      uptime: "0h",
    };
    return { ...server, ...mock };
  });
}

interface ServerRow {
  id: string;
  name: string;
  map: string;
  cluster: "pvp" | "pve";
  host: string;
  port: number;
  max_players: number;
  status: "online" | "offline" | "restarting";
  player_count: number;
  uptime: string;
}

export async function getServers(): Promise<ServerWithStatus[]> {
  try {
    const supabase = getSupabase();
    if (!supabase) return getStaticServers();

    const { data, error } = await supabase
      .from("servers")
      .select("*")
      .order("cluster")
      .order("map");

    if (error || !data || data.length === 0) {
      return getStaticServers();
    }

    return (data as unknown as ServerRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      map: row.map,
      cluster: row.cluster,
      host: row.host,
      port: row.port,
      maxPlayers: row.max_players,
      status: row.status,
      playerCount: row.player_count,
      uptime: row.uptime,
    }));
  } catch {
    return getStaticServers();
  }
}

export async function getServerStatus(id: string): Promise<ServerWithStatus | null> {
  const allServers = await getServers();
  return allServers.find((s) => s.id === id) || null;
}

export function getTotalPlayers(serversData?: ServerWithStatus[]): number {
  if (serversData) return serversData.reduce((sum, s) => sum + s.playerCount, 0);
  return Object.values(fallbackStatuses).reduce((sum, s) => sum + s.playerCount, 0);
}

export function getOnlineServerCount(serversData?: ServerWithStatus[]): number {
  if (serversData) return serversData.filter((s) => s.status === "online").length;
  return Object.values(fallbackStatuses).filter((s) => s.status === "online").length;
}
