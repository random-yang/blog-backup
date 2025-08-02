"use client";

import Link from "next/link";
import { useState } from "react";
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-3xl font-bold text-text-primary no-underline hover:text-primary transition-colors">
              RandomYang
            </Link>
            
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
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                {isDarkMode ? (
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                ) : (
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}