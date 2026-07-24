"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Requirement {
  id: string;
  project_id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  draft_content?: string;
}

export default function Requirements() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeRequirement, setActiveRequirement] = useState<Requirement | null>(null);
  const [draftingText, setDraftingText] = useState<string>("");
  const [isDrafting, setIsDrafting] = useState<boolean>(false);

  const [projectId, setProjectId] = useState<string | null>(null);

  // Hardcoded to strictly use the live AWS Elastic Beanstalk backend
  const API_BASE_URL = "http://bidready-backend-env.eba-rayatq56.us-east-1.elasticbeanstalk.com";

  const fetchRequirements = async () => {
    if (!projectId) {
      setLoading(false);
      return;
    }
    try {
      let url = `${API_BASE_URL}/api/v1/projects/${projectId}/requirements`;
      const params = new URLSearchParams();
      if (selectedCategory !== "All") params.append("category", selectedCategory);
      if (selectedPriority !== "All") params.append("priority", selectedPriority);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRequirements(data);
      }
    } catch (err) {
      console.error("Error fetching requirements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("current_project_id");
    setProjectId(stored);
  }, []);

  useEffect(() => {
    fetchRequirements();
  }, [selectedCategory, selectedPriority, projectId]);

  const filteredRequirements = requirements.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const startStreamingDraft = (reqId: string) => {
    setDraftingText("");
    setIsDrafting(true);

    const eventSource = new EventSource(`${API_BASE_URL}/api/v1/requirements/${reqId}/draft/stream`);
    let fullText = "";

    eventSource.onmessage = (event: MessageEvent) => {
      if (event.data === "[DONE]") {
        eventSource.close();
        setIsDrafting(false);
        fetch(`${API_BASE_URL}/api/v1/requirements/${reqId}/draft`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ draft_content: fullText })
        }).then(() => fetchRequirements());
        return;
      }
      fullText += event.data + " ";
      setDraftingText(fullText);
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsDrafting(false);
      fetch(`${API_BASE_URL}/api/v1/requirements/${reqId}/draft`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft_content: fullText })
      }).then(() => fetchRequirements());
    };
  };

  const handleExportMarkdown = () => {
    if (!projectId) return alert("No active project found");
    window.open(`${API_BASE_URL}/api/v1/projects/${projectId}/export`, "_blank");
  };

  const handleExportCSV = () => {
    if (!projectId) return alert("No active project found");
    window.open(`${API_BASE_URL}/api/v1/projects/${projectId}/export/csv`, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/60 border border-blue-800/40 px-3 py-1 rounded-full">
              Automated Parsing Matrix
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              Tender Requirements Matrix
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Extracted requirements for active project: <span className="text-white font-mono font-medium">{projectId || "None (Upload a PDF first)"}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <span>📊</span>
              <span>Export CSV Matrix</span>
            </button>

            <button
              onClick={handleExportMarkdown}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <span>📥</span>
              <span>Export Markdown</span>
            </button>

            <Link
              href="/chat"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>🤖</span>
              <span>Ask AI Chat</span>
            </Link>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
                Search Requirements
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="All">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Security">Security</option>
                <option value="Management">Management</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
                Priority
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requirements Table */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-4">Title</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Priority</th>
                  <th className="py-4 px-4">Drafted Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredRequirements.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">
                      {item.title}
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-xs">
                      <span className={item.priority === "High" ? "text-rose-400" : "text-amber-400"}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs">
                      {item.draft_content ? (
                        <span className="text-emerald-400 font-semibold">✅ Draft Ready</span>
                      ) : (
                        <span className="text-slate-500">Not Drafted</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => {
                          setActiveRequirement(item);
                          const isLegacyPlaceholder = item.draft_content?.includes("simulated AI draft") || item.draft_content?.includes("Amazon Bedrock");
                          setDraftingText(isLegacyPlaceholder ? "" : (item.draft_content || ""));
                        }}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                      >
                        View & Draft
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequirements.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              {loading ? "Loading requirements from backend..." : "No requirements found for this project. Please upload a PDF first!"}
            </div>
          )}
        </div>

        {/* Modal Drawer for Selected Requirement */}
        {activeRequirement && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400">
                    {activeRequirement.category} • {activeRequirement.priority} Priority
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {activeRequirement.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveRequirement(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs text-slate-500 uppercase block font-semibold">
                    Requirement Description
                  </span>
                  <p className="text-slate-300 leading-relaxed mt-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {activeRequirement.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500 uppercase block font-semibold">
                      AI Proposal Draft (Live Streaming)
                    </span>
                    <button
                      onClick={() => startStreamingDraft(activeRequirement.id)}
                      disabled={isDrafting}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center space-x-1 shadow-md"
                    >
                      <span>⚡</span>
                      <span>{isDrafting ? "Streaming..." : "Generate AI Response Draft"}</span>
                    </button>
                  </div>
                  <textarea
                    value={draftingText}
                    onChange={(e) => setDraftingText(e.target.value)}
                    placeholder="Click 'Generate AI Response Draft' to watch Claude 3 stream the compliance text..."
                    rows={8}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono leading-relaxed mt-1"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  onClick={() => setActiveRequirement(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}