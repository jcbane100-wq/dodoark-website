"use client";

import { useState } from "react";
import { Swords, TreePine, Settings, Timer } from "lucide-react";

type SettingCategory = {
  name: string;
  icon: typeof Settings;
  settings: { label: string; value: string }[];
};

const pvpSettings: SettingCategory[] = [
  {
    name: "General",
    icon: Settings,
    settings: [
      { label: "Max Tribe Size", value: "6" },
      { label: "Alliances", value: "Disabled" },
      { label: "Max Wild Dino Level", value: "150" },
      { label: "Max Tamed Dino Level", value: "450" },
      { label: "Max Character Level", value: "105" },
      { label: "Dino Wipes", value: "2x per day" },
    ],
  },
  {
    name: "Rates",
    icon: Settings,
    settings: [
      { label: "XP Multiplier", value: "5x" },
      { label: "Harvest Rate", value: "5x" },
      { label: "Taming Speed", value: "5x" },
      { label: "Breeding Speed", value: "5x" },
      { label: "Crop Growth", value: "5x" },
    ],
  },
  {
    name: "Breeding",
    icon: Settings,
    settings: [
      { label: "Breeding Multiplier", value: "5x" },
      { label: "Egg Hatch Speed", value: "5x" },
      { label: "Baby Mature Speed", value: "5x" },
      { label: "Cuddle Interval", value: "Reduced" },
    ],
  },
  {
    name: "PvP Settings",
    icon: Swords,
    settings: [
      { label: "Turret Limit", value: "100" },
      { label: "Turret Damage", value: "1.5x" },
      { label: "Structure Damage Multiplier", value: "0.5x (structures take less damage)" },
      { label: "Offline Raid Protection", value: "Disabled" },
    ],
  },
  {
    name: "Decay Timers",
    icon: Timer,
    settings: [
      { label: "Thatch", value: "4 days" },
      { label: "Wood / Dinos", value: "7 days" },
      { label: "Stone", value: "11 days" },
      { label: "Metal", value: "15 days" },
      { label: "Tek", value: "20 days" },
    ],
  },
];

const pveSettings: SettingCategory[] = [
  {
    name: "General",
    icon: Settings,
    settings: [
      { label: "Max Tribe Size", value: "6" },
      { label: "Alliances", value: "Enabled (max 10)" },
      { label: "Max Wild Dino Level", value: "150" },
      { label: "Max Character Level", value: "105" },
      { label: "Tribe War", value: "Enabled" },
      { label: "Dino Wipes", value: "1x per day" },
    ],
  },
  {
    name: "Rates",
    icon: Settings,
    settings: [
      { label: "XP Multiplier", value: "2x" },
      { label: "Harvest Rate", value: "5x" },
      { label: "Taming Speed", value: "10x" },
    ],
  },
  {
    name: "Breeding",
    icon: Settings,
    settings: [
      { label: "Breeding Multiplier", value: "15x" },
      { label: "Mating Interval", value: "5x (75% faster)" },
      { label: "Egg Hatch Speed", value: "15x" },
      { label: "Baby Mature Speed", value: "15x" },
      { label: "Cuddle Interval", value: "Greatly Reduced" },
    ],
  },
  {
    name: "Player Stats",
    icon: Settings,
    settings: [
      { label: "Weight", value: "20x per level" },
      { label: "Health", value: "1.25x per level" },
      { label: "Stamina", value: "2x per level" },
      { label: "Oxygen", value: "2x per level" },
      { label: "Food", value: "3x per level" },
      { label: "Water", value: "3x per level" },
      { label: "Fortitude", value: "2x per level" },
    ],
  },
  {
    name: "Decay Timers",
    icon: Timer,
    settings: [
      { label: "Thatch", value: "4 days" },
      { label: "Wood / Dinos", value: "7 days" },
      { label: "Stone", value: "11 days" },
      { label: "Metal", value: "15 days" },
      { label: "Tek", value: "20 days" },
    ],
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"pvp" | "pve">("pvp");
  const settings = activeTab === "pvp" ? pvpSettings : pveSettings;

  return (
    <div className="page-container">
      <h1 className="page-title">Server Settings</h1>
      <p className="page-subtitle">
        View the rates and configuration for our PvP and PvE clusters.
      </p>

      {/* Tab switcher */}
      <div className="mb-10 flex gap-2 rounded-xl border border-dark-600/50 bg-dark-800 p-1.5">
        <button
          onClick={() => setActiveTab("pvp")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            activeTab === "pvp"
              ? "bg-red-500/20 text-red-400 shadow-sm"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Swords className="h-4 w-4" />
          PvP Cluster
        </button>
        <button
          onClick={() => setActiveTab("pve")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            activeTab === "pve"
              ? "bg-blue-500/20 text-blue-400 shadow-sm"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <TreePine className="h-4 w-4" />
          PvE Cluster
        </button>
      </div>

      {/* Settings categories */}
      <div className="space-y-6">
        {settings.map((category) => (
          <div
            key={category.name}
            className="overflow-hidden rounded-xl border border-dark-600/50 bg-dark-800"
          >
            <div className="flex items-center gap-3 border-b border-dark-600/50 px-6 py-4">
              <category.icon
                className={`h-5 w-5 ${
                  activeTab === "pvp" ? "text-red-400" : "text-blue-400"
                }`}
              />
              <h2 className="text-lg font-bold text-white">{category.name}</h2>
            </div>
            <div className="divide-y divide-dark-600/30">
              {category.settings.map((setting, idx) => (
                <div
                  key={setting.label}
                  className={`flex items-center justify-between px-6 py-3.5 ${
                    idx % 2 === 0 ? "bg-dark-800" : "bg-dark-700/30"
                  }`}
                >
                  <span className="text-sm text-gray-300">{setting.label}</span>
                  <span
                    className={`text-sm font-semibold ${
                      activeTab === "pvp" ? "text-red-400" : "text-blue-400"
                    }`}
                  >
                    {setting.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
