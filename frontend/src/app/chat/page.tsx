"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";
import { sampleDocuments } from "@/data/dummyData";

export default function ChatPage() {
  const [selectedDocId, setSelectedDocId] = useState<string>("doc-1");

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/60 border border-blue-800/40 px-3 py-1 rounded-full">
              Streaming Copilot
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              AI Tender Assistant
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Ask questions, parse complex clauses, and draft response snippets in real-time.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/requirements"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-colors"
            >
              Requirements Matrix
            </Link>
            <Link
              href="/upload"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all"
            >
              Upload New Document
            </Link>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Document Selector Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Active Document Context
              </h3>

              <div className="space-y-3">
                {sampleDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      selectedDocId === doc.id
                        ? "bg-blue-950/60 border-blue-600 text-white shadow-sm"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">📄</span>
                      <p className="text-xs font-semibold truncate flex-1">
                        {doc.name}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{doc.size}</span>
                      <span className="font-mono text-blue-400">
                        {doc.requirementsCount} REQs
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Helper Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                AI Capability Checklist
              </h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-400">✓</span>
                  <span>Clause interpretation & summary</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-400">✓</span>
                  <span>Legal liability risk flagging</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-400">✓</span>
                  <span>Draft bid response wording</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Main AI Chat Interface Component */}
          <div className="lg:col-span-3">
            <ChatInterface />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
