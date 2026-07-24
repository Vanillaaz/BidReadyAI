import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                ⚡
              </div>
              <span className="font-bold text-xl text-white">
                BidReady <span className="text-blue-400">AI</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              AI-powered tender document analysis, automated requirement extraction, and compliance checking for faster, winning proposals.
            </p>
            <div className="flex items-center space-x-2 text-xs text-blue-400 bg-blue-950/60 border border-blue-800/40 px-3 py-1.5 rounded-md w-fit">
              <span>🚀</span>
              <span className="font-medium">IBM Internship Capstone Project</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/requirements" className="hover:text-blue-400 transition-colors">
                  Requirements Matrix
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-blue-400 transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/upload" className="hover:text-blue-400 transition-colors">
                  Upload Document
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Features */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Platform Features
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Requirement Extraction</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Compliance Verification</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Legal Risk Flagging</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Interactive AI Chat</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Structured Summary Export</span>
              </li>
            </ul>
          </div>

          {/* Project Details */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Project Info
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-slate-400">
                Developed as part of the IBM AI & Frontend Engineering Internship Program.
              </p>
              <div className="pt-2">
                <span className="text-xs text-slate-500 block">Tech Stack</span>
                <span className="text-xs font-mono text-slate-300">
                  Next.js • React • TypeScript • Tailwind CSS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BidReady AI. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Member 1 (Frontend & UI Engineering Responsibilities)</p>
        </div>
      </div>
    </footer>
  );
}
