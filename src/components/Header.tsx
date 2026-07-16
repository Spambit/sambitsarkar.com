"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Decisions", href: "/decisions" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="site-name">
          Sambit Sarkar
        </Link>
        <nav className="flex gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "nav-link-active"
                  : "nav-link"
              }
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
