import Link from "next/link";
import { MessageCircle, ExternalLink, Heart } from "lucide-react";

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

const footerLinks: Record<string, FooterLink[]> = {
  Navigation: [
    { href: "/", label: "Home" },
    { href: "/servers", label: "Server IPs" },
    { href: "/settings", label: "Settings" },
    { href: "/rules", label: "Rules" },
    { href: "/status", label: "Status" },
  ],
  Community: [
    { href: "https://discord.gg/dodoark", label: "Discord", external: true },
    { href: "/store", label: "Store" },
    { href: "/rules", label: "Server Rules" },
  ],
  Resources: [
    { href: "https://ark.wiki.gg", label: "ARK Wiki", external: true },
    { href: "https://survivetheark.com", label: "Official ARK", external: true },
    { href: "/status", label: "Server Status" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-dark-600/50 bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🦤</span>
              <span className="text-xl font-extrabold">
                <span className="text-emerald-400">Dodo</span>
                <span className="text-white">Ark</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Premium ARK Survival Ascended server cluster. Boosted rates, active community, and fair play.
            </p>
            <a
              href="https://discord.gg/dodoark"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#5865F2]/15 px-4 py-2 text-sm font-medium text-[#5865F2] transition-all hover:bg-[#5865F2]/25"
            >
              <MessageCircle className="h-4 w-4" />
              Join our Discord
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-emerald-400"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 transition-colors hover:text-emerald-400"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-dark-600/50 pt-8 sm:flex-row">
          <p className="text-sm text-gray-600">
            &copy; 2024&ndash;2026 DodoArk. All rights reserved. Not affiliated with Studio Wildcard.
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-600">
            Made with <Heart className="h-3.5 w-3.5 text-red-500" /> for the ARK community
          </p>
        </div>

        {/* Crossplay note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-700">
            Crossplay supported: Steam + Xbox + PlayStation
          </p>
        </div>
      </div>
    </footer>
  );
}
