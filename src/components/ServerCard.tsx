"use client";

import { useState } from "react";
import { Copy, Check, Users, MapPin } from "lucide-react";
import type { ServerWithStatus } from "@/lib/servers";
import { getConnectionString } from "@/lib/servers";
import StatusIndicator from "./StatusIndicator";

interface ServerCardProps {
  server: ServerWithStatus;
  compact?: boolean;
}

export default function ServerCard({ server, compact = false }: ServerCardProps) {
  const [copied, setCopied] = useState(false);
  const connectionString = getConnectionString(server);
  const isPvP = server.cluster === "pvp";

  const accentBorder = isPvP ? "border-pvp/30" : "border-pve/30";
  const accentBg = isPvP ? "bg-pvp/10" : "bg-pve/10";
  const accentText = isPvP ? "text-pvp" : "text-pve";
  const accentBadgeBg = isPvP ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400";
  const hoverBorder = isPvP ? "hover:border-pvp/50" : "hover:border-pve/50";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(connectionString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = connectionString;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (compact) {
    return (
      <div
        className={`flex items-center justify-between rounded-lg border ${accentBorder} ${hoverBorder} bg-dark-800/50 px-4 py-3 transition-all`}
      >
        <div className="flex items-center gap-3">
          <StatusIndicator status={server.status} size="sm" />
          <span className="text-sm font-medium text-gray-200">{server.map}</span>
          <span className={`rounded px-2 py-0.5 text-xs font-medium ${accentBadgeBg}`}>
            {server.cluster.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            <Users className="mr-1 inline h-3.5 w-3.5" />
            {server.playerCount}/{server.maxPlayers}
          </span>
          <button
            onClick={handleCopy}
            className="rounded bg-dark-600 px-2.5 py-1 text-xs text-gray-300 transition-colors hover:bg-dark-500 hover:text-white"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : "Copy IP"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border ${accentBorder} ${hoverBorder} bg-dark-800 p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/20`}
    >
      {/* Accent top bar */}
      <div
        className={`absolute inset-x-0 top-0 h-1 ${isPvP ? "bg-gradient-to-r from-red-600 to-red-400" : "bg-gradient-to-r from-blue-600 to-blue-400"}`}
      />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">{server.name}</h3>
          </div>
          <div className="mb-3 flex items-center gap-3">
            <span className={`rounded px-2 py-0.5 text-xs font-semibold ${accentBadgeBg}`}>
              {server.cluster.toUpperCase()}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <MapPin className="h-3.5 w-3.5" />
              {server.map}
            </span>
          </div>
        </div>
        <StatusIndicator status={server.status} size="lg" showLabel />
      </div>

      <div className={`mb-4 rounded-lg ${accentBg} p-3`}>
        <div className="flex items-center justify-between">
          <code className="text-sm font-mono text-gray-200">{connectionString}</code>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              copied
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy IP
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Users className="h-4 w-4" />
          <span>
            <span className="font-semibold text-white">{server.playerCount}</span>
            /{server.maxPlayers} players
          </span>
        </div>
        {server.status === "online" && (
          <span className="text-gray-500">
            Uptime: {server.uptime}
          </span>
        )}
      </div>
    </div>
  );
}
