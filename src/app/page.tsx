import Link from "next/link";
import {
  Zap,
  Users,
  Shield,
  Gamepad2,
  Swords,
  TreePine,
  ChevronRight,
  MessageCircle,
  Star,
  Clock,
  Globe,
  HeadphonesIcon,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { pvpServers, pveServers } from "@/lib/servers";

const features = [
  {
    icon: Zap,
    title: "Boosted Rates",
    description:
      "Optimized XP, harvesting, taming, and breeding rates so you spend less time grinding and more time playing.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: Users,
    title: "Active Community",
    description:
      "Join hundreds of active players across our PvP and PvE clusters. Active Discord with events and giveaways.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Shield,
    title: "Fair Play",
    description:
      "Strict rules against cheating, meshing, and exploiting. Active admin team monitoring all servers 24/7.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Globe,
    title: "Cross-Platform",
    description:
      "Play with friends on Steam, Xbox, and PlayStation. Full crossplay support on all servers.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
];

const sellingPoints = [
  {
    icon: Clock,
    title: "99.9% Uptime",
    description: "Enterprise-grade hosting with automatic restarts and monitoring.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Active admin team available around the clock via Discord tickets.",
  },
  {
    icon: Star,
    title: "Regular Events",
    description: "Weekly community events, boss fights, and tournaments with prizes.",
  },
  {
    icon: Gamepad2,
    title: "9 Maps Per Cluster",
    description: "Full cluster with The Island, Scorched Earth, The Center, Aberration, Extinction, Astraeos, Ragnarok, Valguero, and Lost Colony.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
              Why Play on DodoArk?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              We provide the best ARK Survival Ascended experience with optimized settings,
              dedicated hardware, and an active community.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="card-hover group">
                <div
                  className={`mb-4 inline-flex rounded-xl ${feature.bg} p-3`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Server Overview */}
      <section className="border-y border-dark-600/30 bg-dark-800/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-white">
              Our Server Clusters
            </h2>
            <p className="text-gray-400">
              Choose your playstyle with our PvP and PvE clusters, each featuring 9 maps.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* PvP Cluster */}
            <div className="overflow-hidden rounded-2xl border border-red-500/20 bg-dark-800">
              <div className="border-b border-red-500/20 bg-gradient-to-r from-red-500/10 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-500/20 p-2.5">
                    <Swords className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">PvP Cluster</h3>
                    <p className="text-sm text-gray-400">
                      5x rates &middot; Tribe limit 6 &middot; No alliances
                    </p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-dark-600/50 p-4">
                {pvpServers.map((server) => (
                  <div
                    key={server.id}
                    className="flex items-center justify-between px-2 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium text-gray-200">
                        {server.map}
                      </span>
                    </div>
                    <code className="text-xs text-gray-500">
                      {server.host}:{server.port}
                    </code>
                  </div>
                ))}
              </div>
              <div className="border-t border-dark-600/50 p-4">
                <Link
                  href="/servers"
                  className="flex items-center justify-center gap-2 rounded-lg bg-red-500/15 px-4 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-500/25"
                >
                  View PvP Servers
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* PvE Cluster */}
            <div className="overflow-hidden rounded-2xl border border-blue-500/20 bg-dark-800">
              <div className="border-b border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-500/20 p-2.5">
                    <TreePine className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">PvE Cluster</h3>
                    <p className="text-sm text-gray-400">
                      Up to 15x breeding &middot; Tribe limit 6 &middot; Alliances enabled
                    </p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-dark-600/50 p-4">
                {pveServers.map((server) => (
                  <div
                    key={server.id}
                    className="flex items-center justify-between px-2 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium text-gray-200">
                        {server.map}
                      </span>
                    </div>
                    <code className="text-xs text-gray-500">
                      {server.host}:{server.port}
                    </code>
                  </div>
                ))}
              </div>
              <div className="border-t border-dark-600/50 p-4">
                <Link
                  href="/servers"
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-500/15 px-4 py-2.5 text-sm font-medium text-blue-400 transition-all hover:bg-blue-500/25"
                >
                  View PvE Servers
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why DodoArk */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl">
                The Best ARK Experience
              </h2>
              <p className="mb-8 text-gray-400">
                DodoArk was built by experienced ARK players who understand what makes
                a great server. We've fine-tuned every setting to create the perfect
                balance between challenge and fun.
              </p>
              <div className="space-y-6">
                {sellingPoints.map((point) => (
                  <div key={point.title} className="flex gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-emerald-500/10 p-2.5">
                      <point.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-white">
                        {point.title}
                      </h3>
                      <p className="text-sm text-gray-400">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community stats card */}
            <div className="rounded-2xl border border-dark-600/50 bg-dark-800 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#5865F2]/20 p-2.5">
                  <MessageCircle className="h-6 w-6 text-[#5865F2]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Join Our Community</h3>
                  <p className="text-sm text-gray-400">Active Discord server</p>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-dark-700 p-4 text-center">
                  <div className="text-2xl font-bold text-white">1,200+</div>
                  <div className="text-xs text-gray-500">Discord Members</div>
                </div>
                <div className="rounded-xl bg-dark-700 p-4 text-center">
                  <div className="text-2xl font-bold text-white">284+</div>
                  <div className="text-xs text-gray-500">Active Players</div>
                </div>
                <div className="rounded-xl bg-dark-700 p-4 text-center">
                  <div className="text-2xl font-bold text-white">18</div>
                  <div className="text-xs text-gray-500">Game Servers</div>
                </div>
                <div className="rounded-xl bg-dark-700 p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">Live</div>
                  <div className="text-xs text-gray-500">Support</div>
                </div>
              </div>

              <a
                href="https://discord.gg/dodoark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5865F2] px-6 py-3 text-base font-semibold text-white transition-all hover:bg-[#4752c4]"
              >
                <MessageCircle className="h-5 w-5" />
                Join Discord Server
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
