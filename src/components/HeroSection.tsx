import Link from "next/link";
import { ChevronRight, MessageCircle, Gamepad2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4">
          <div className="h-[500px] w-[800px] rounded-full bg-emerald-500/5 blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0">
          <div className="h-[300px] w-[400px] rounded-full bg-emerald-600/5 blur-3xl" />
        </div>
        <div className="absolute bottom-0 right-0">
          <div className="h-[300px] w-[400px] rounded-full bg-emerald-600/3 blur-3xl" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
          <Gamepad2 className="h-4 w-4" />
          ARK Survival Ascended Server Cluster
        </div>

        {/* Title */}
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-white">Welcome to </span>
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            DodoArk
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl">
          Premium PvP &amp; PvE servers with boosted rates, active community, and fair play.
          Cross-platform support for Steam, Xbox, and PlayStation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/servers"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
          >
            Join Our Servers
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="https://discord.gg/NwWWu5k2Th"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#5865F2]/30 bg-[#5865F2]/10 px-8 py-3.5 text-base font-semibold text-[#5865F2] transition-all hover:bg-[#5865F2]/20"
          >
            <MessageCircle className="h-5 w-5" />
            Join Discord
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: "18", label: "Servers" },
            { value: "284+", label: "Active Players" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-dark-600/50 bg-dark-800/50 p-4">
              <div className="text-2xl font-bold text-emerald-400 sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
