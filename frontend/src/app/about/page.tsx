import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/60 border border-blue-800/40 px-3 py-1 rounded-full">
            IBM Internship Capstone Project
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            About BidReady AI
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            BidReady AI is an enterprise-grade AI-powered tender analysis platform designed to streamline bid proposal workflows, reduce manual clause checking, and maximize proposal win rates.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Our Core Mission</h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            Preparing proposals for government and enterprise tenders often involves reading hundreds of pages of dense specifications, strict compliance checklists, and risk-heavy legal contracts. BidReady AI harnesses modern Natural Language Processing and Generative AI to automate requirement extraction, cross-reference compliance criteria, and deliver streaming interactive assistance.
          </p>
        </div>

        {/* Value Pillars Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Why BidReady AI?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-3xl mx-auto mb-4">
                🤖
              </div>
              <h3 className="font-bold text-lg text-white mb-2">AI-Driven Insights</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated clause parsing pinpoints critical requirements instantly.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto mb-4">
                ⚡
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Rapid Review</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Process 100+ page RFP documents in seconds rather than hours.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center text-3xl mx-auto mb-4">
                🛡️
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Risk Detection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Highlight uncapped liability, strict SLAs, and missing certifications.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-3xl mx-auto mb-4">
                📊
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Structured Reports</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate clean compliance matrices for team evaluation.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack & Team */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4">Technology Architecture</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">🔹</span>
                <span><strong>Framework:</strong> Next.js (App Router) & React</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">🔹</span>
                <span><strong>Type Safety:</strong> TypeScript</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">🔹</span>
                <span><strong>Styling:</strong> Tailwind CSS</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">🔹</span>
                <span><strong>UI Engineering:</strong> Member 1 Responsibilities</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-3xl mb-4">
              👨‍💻
            </div>
            <h3 className="text-xl font-bold text-white">IBM Internship Project</h3>
            <p className="text-xs text-slate-400 mt-2 max-w-sm">
              Built as part of the IBM AI & Full-Stack Development Internship initiative.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all inline-block"
              >
                Go to Live App Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}