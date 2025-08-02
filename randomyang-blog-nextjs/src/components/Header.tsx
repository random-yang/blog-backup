"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Archives", href: "/archives" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/random-yang", icon: "github" },
  { label: "CodePen", href: "https://codepen.io/randomyang", icon: "codepen" },
  { label: "Dribbble", href: "https://dribbble.com/randomyang", icon: "dribbble" },
  { label: "Twitter", href: "https://twitter.com/randomyang", icon: "twitter" },
  { label: "Email", href: "mailto:randomyang@example.com", icon: "email" },
  { label: "RSS", href: "/rss.xml", icon: "rss" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* <Link href="/" className="text-3xl font-bold text-text-primary no-underline hover:text-primary transition-colors">
              RandomYang
            </Link> */}
            
            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg no-underline transition-all relative group ${
                    pathname === item.href ? "text-primary" : "text-text-primary hover:text-primary"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform ${
                    pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.icon}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <span className="text-lg">{link.icon[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}