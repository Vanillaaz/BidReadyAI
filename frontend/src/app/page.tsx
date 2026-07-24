import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Shared Reusable Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* IBM Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/50 text-blue-400 text-xs font-semibold tracking-wide mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>IBM Internship Frontend Capstone Project</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-tight">
              Win Bids Faster with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Intelligent AI Tender Analysis
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Upload complex RFP and tender documents. BidReady AI automatically extracts technical requirements, flags legal risks, verifies compliance, and streams AI assistance to craft winning proposals.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/upload"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all text-base flex items-center justify-center space-x-2 group"
              >
                <span>Upload Tender Document</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl transition-all text-base flex items-center justify-center space-x-2"
              >
                <span>Explore Live Dashboard</span>
              </Link>
            </div>

            {/* Interactive Preview Mockup Card */}
            <div className="mt-16 max-w-5xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    Smart_City_Infrastructure_RFP.pdf — AI Analysis
                  </span>
                </div>
                <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2.5 py-1 rounded-md font-semibold">
                  96% Match Score
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-blue-400 font-semibold block mb-1">REQ-001 • Compliance</span>
                  <h4 className="font-semibold text-sm text-slate-200">ISO 27001 Security Standard</h4>
                  <p className="text-xs text-slate-400 mt-2">Clause 3.1.2 requirement parsed and mapped to internal security policy.</p>
                  <span className="mt-3 inline-block text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    COMPLIANT
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-amber-400 font-semibold block mb-1">REQ-003 • Technical</span>
                  <h4 className="font-semibold text-sm text-slate-200">1-Hour SLA On-Site Response</h4>
                  <p className="text-xs text-slate-400 mt-2">Clause 6.2.0 requires physical technician presence across all regional sites.</p>
                  <span className="mt-3 inline-block text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded font-bold">
                    NEEDS REVIEW
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-rose-400 font-semibold block mb-1">REQ-004 • Legal Risk</span>
                  <h4 className="font-semibold text-sm text-slate-200">Uncapped Indemnity Liability</h4>
                  <p className="text-xs text-slate-400 mt-2">Clause 8.1.3 presents high financial exposure on third-party IP claims.</p>
                  <span className="mt-3 inline-block text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded font-bold">
                    HIGH RISK FLAG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-24 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                Platform Capabilities
              </h2>
              <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
                Everything You Need to Analyze & Submit Winning Proposals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  🔍
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Automated Extraction</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Extract technical, financial, and legal clauses directly from multi-page PDFs or Word documents in seconds.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  🚨
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Risk Scanning</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Identify high-risk penalty terms, non-standard indemnities, and rigid SLAs before making bidding commitments.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Compliance Matrix</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Auto-generate structured compliance tables showing mandatory vs optional criteria match scores.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  💬
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Streaming AI Chat</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Ask natural language questions about your uploaded documents and get real-time context-aware answers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Workflow */}
        <section className="py-24 bg-slate-900/60 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-14">
              How BidReady AI Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Upload Tender File</h3>
                <p className="text-sm text-slate-400">
                  Drag and drop PDF, DOCX, or text files into our secure processor.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI Deep Analysis</h3>
                <p className="text-sm text-slate-400">
                  AI parses legal terms, technical specs, and flags critical compliance gaps.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Export & Prepare Bid</h3>
                <p className="text-sm text-slate-400">
                  Review the requirements matrix, chat with AI, and generate final bid reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Bar */}
        <section className="py-16 bg-blue-950/40 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-extrabold text-white">500+</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Tenders Analyzed</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-blue-400">95%</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Extraction Accuracy</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-white">10x</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Faster Proposal Review</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-indigo-400">24/7</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">AI Assistant Availability</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Reusable Footer */}
      <Footer />
    </div>
  );
}