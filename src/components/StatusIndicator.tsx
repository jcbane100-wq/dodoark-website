"use client";

import type { ServerStatus } from "@/lib/servers";

interface StatusIndicatorProps {
  status: ServerStatus;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const statusConfig = {
  online: {
    color: "bg-green-500",
    ring: "ring-green-500/30",
    label: "Online",
    textColor: "text-green-400",
  },
  offline: {
    color: "bg-red-500",
    ring: "ring-red-500/30",
    label: "Offline",
    textColor: "text-red-400",
  },
  restarting: {
    color: "bg-yellow-500",
    ring: "ring-yellow-500/30",
    label: "Restarting",
    textColor: "text-yellow-400",
  },
};

const sizeConfig = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
  lg: "h-4 w-4",
};

export default function StatusIndicator({
  status,
  size = "md",
  showLabel = false,
}: StatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex">
        <span
          className={`${config.color} ${sizeConfig[size]} rounded-full ${
            status === "online" ? "animate-pulse-slow" : ""
          }`}
        />
        {status === "online" && (
          <span
            className={`absolute inset-0 ${sizeConfig[size]} rounded-full ${config.color} opacity-40 animate-ping`}
          />
        )}
      </span>
      {showLabel && (
        <span className={`text-sm font-medium ${config.textColor}`}>
          {config.label}
        </span>
      )}
    </div>
  );
}
