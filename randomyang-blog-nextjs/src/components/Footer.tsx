import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-auxiliary border-t border-gray-200">
      <div className="container py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-8 text-sm text-text-light">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/archives" className="hover:text-primary transition-colors">
              Archives
            </Link>
            <Link href="/tags" className="hover:text-primary transition-colors">
              Tags
            </Link>
            <Link href="/categories" className="hover:text-primary transition-colors">
              Categories
            </Link>
          </div>
          
          <div className="text-center text-sm text-text-lighter">
            <p>© {currentYear} RandomYang. All rights reserved.</p>
            <p className="mt-2">
              Powered by{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Next.js
              </a>
              {" "}|{" "}
              Theme inspired by{" "}
              <a
                href="https://github.com/random-yang/paper"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Paper
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}