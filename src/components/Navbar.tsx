"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 bg-bg border-b border-border flex items-center justify-between px-6">
      <Link
        href="/"
        className="font-mono text-sm font-bold tracking-wider text-accent"
      >
        Hongddi&apos;s Atelier
      </Link>
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-mono transition-colors duration-200 pb-1 ${
              isActive(link.href)
                ? "text-white border-b-2 border-white"
                : "text-text-secondary hover:text-text"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
