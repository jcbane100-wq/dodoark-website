export type ClusterType = "pvp" | "pve";

export type ServerStatus = "online" | "offline" | "restarting";

export interface Server {
  id: string;
  name: string;
  map: string;
  cluster: ClusterType;
  host: string;
  port: number;
  maxPlayers: number;
}

export interface ServerWithStatus extends Server {
  status: ServerStatus;
  playerCount: number;
  uptime: string;
}

export const servers: Server[] = [
  // PvP Cluster
  {
    id: "pvp-island",
    name: "DodoArk PvP - The Island",
    map: "The Island",
    cluster: "pvp",
    host: "play.dodoark.com",
    port: 7777,
    maxPlayers: 50,
  },
  {
    id: "pvp-scorched",
    name: "DodoArk PvP - Scorched Earth",
    map: "Scorched Earth",
    cluster: "pvp",
    host: "play.dodoark.com",
    port: 7779,
    maxPlayers: 50,
  },
  {
    id: "pvp-center",
    name: "DodoArk PvP - The Center",
    map: "The Center",
    cluster: "pvp",
    host: "play.dodoark.com",
    port: 7781,
    maxPlayers: 50,
  },
  {
    id: "pvp-aberration",
    name: "DodoArk PvP - Aberration",
    map: "Aberration",
    cluster: "pvp",
    host: "play.dodoark.com",
    port: 7783,
    maxPlayers: 50,
  },
  {
    id: "pvp-extinction",
    name: "DodoArk PvP - Extinction",
    map: "Extinction",
    cluster: "pvp",
    host: "play.dodoark.com",
    port: 7785,
    maxPlayers: 50,
  },
  {
    id: "pvp-astraeos",
    name: "DodoArk PvP - Astraeos",
    map: "Astraeos",
    cluster: "pvp",
    host: "play.dodoark.com",
    port: 7787,
    maxPlayers: 50,
  },
  {
    id: "pvp-ragnarok",
    name: "DodoArk PvP - Ragnarok",
    map: "Ragnarok",
    cluster: "pvp",
    host: "play.dodoark.com",
    port: 7789,
    maxPlayers: 50,
  },
  {
    id: "pvp-valguero",
    name: "DodoArk PvP - Valguero",
    map: "Valguero",
    cluster: "pvp",
    host: "play.dodoark.com",
    port: 7791,
    maxPlayers: 50,
  },
  {
    id: "pvp-lostcolony",
    name: "DodoArk PvP - Lost Colony",
    map: "Lost Colony",
    cluster: "pvp",
    host: "play.dodoark.com",
    port: 7793,
    maxPlayers: 50,
  },
  // PvE Cluster
  {
    id: "pve-island",
    name: "DodoArk PvE - The Island",
    map: "The Island",
    cluster: "pve",
    host: "play.dodoark.com",
    port: 7795,
    maxPlayers: 50,
  },
  {
    id: "pve-scorched",
    name: "DodoArk PvE - Scorched Earth",
    map: "Scorched Earth",
    cluster: "pve",
    host: "play.dodoark.com",
    port: 7797,
    maxPlayers: 50,
  },
  {
    id: "pve-center",
    name: "DodoArk PvE - The Center",
    map: "The Center",
    cluster: "pve",
    host: "play.dodoark.com",
    port: 7799,
    maxPlayers: 50,
  },
  {
    id: "pve-aberration",
    name: "DodoArk PvE - Aberration",
    map: "Aberration",
    cluster: "pve",
    host: "play.dodoark.com",
    port: 7801,
    maxPlayers: 50,
  },
  {
    id: "pve-extinction",
    name: "DodoArk PvE - Extinction",
    map: "Extinction",
    cluster: "pve",
    host: "play.dodoark.com",
    port: 7803,
    maxPlayers: 50,
  },
  {
    id: "pve-astraeos",
    name: "DodoArk PvE - Astraeos",
    map: "Astraeos",
    cluster: "pve",
    host: "play.dodoark.com",
    port: 7805,
    maxPlayers: 50,
  },
  {
    id: "pve-ragnarok",
    name: "DodoArk PvE - Ragnarok",
    map: "Ragnarok",
    cluster: "pve",
    host: "play.dodoark.com",
    port: 7807,
    maxPlayers: 50,
  },
  {
    id: "pve-valguero",
    name: "DodoArk PvE - Valguero",
    map: "Valguero",
    cluster: "pve",
    host: "play.dodoark.com",
    port: 7809,
    maxPlayers: 50,
  },
  {
    id: "pve-lostcolony",
    name: "DodoArk PvE - Lost Colony",
    map: "Lost Colony",
    cluster: "pve",
    host: "play.dodoark.com",
    port: 7811,
    maxPlayers: 50,
  },
];

export const pvpServers = servers.filter((s) => s.cluster === "pvp");
export const pveServers = servers.filter((s) => s.cluster === "pve");

export function getConnectionString(server: Server): string {
  return `${server.host}:${server.port}`;
}
