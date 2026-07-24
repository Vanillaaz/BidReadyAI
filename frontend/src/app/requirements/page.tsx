"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { requirementsData, RequirementItem } from "@/data/dummyData";

export default function Requirements() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeRequirement, setActiveRequirement] = useState<RequirementItem | null>(null);

  const filteredRequirements = requirementsData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || item.complianceStatus === selectedStatus;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: RequirementItem["complianceStatus"]) => {
    switch (status) {
      case "Compliant":
        return "bg-emerald-950 text-emerald-400 border-emerald-800/50";
      case "Needs Review":
        return "bg-amber-950 text-amber-400 border-amber-800/50";
      case "Non-Compliant":
        return "bg-rose-950 text-rose-400 border-rose-800/50";
    }
  };

  const getRiskBadge = (risk: RequirementItem["riskLevel"]) => {
    switch (risk) {
      case "Low":
        return "text-emerald-400";
      case "Medium":
        return "text-amber-400";
      case "High":
        return "text-rose-400 font-bold";
    }
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
              Parsed requirements for <span className="text-white font-medium">Smart_City_Infrastructure_RFP.pdf</span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => alert("Exporting Requirements Matrix as CSV...")}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <span>📥</span>
              <span>Export CSV</span>
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
                Search Clauses
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, clause or keyword..."
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
                <option value="Financial">Financial</option>
                <option value="Legal">Legal</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>

            {/* Compliance Status Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
                Compliance Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="All">All Statuses</option>
                <option value="Compliant">Compliant</option>
                <option value="Needs Review">Needs Review</option>
                <option value="Non-Compliant">Non-Compliant</option>
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
                  <th className="py-4 px-4">Clause Ref</th>
                  <th className="py-4 px-4">Requirement Title</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Compliance</th>
                  <th className="py-4 px-4">Risk Level</th>
                  <th className="py-4 px-4">Page</th>
                  <th className="py-4 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredRequirements.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-mono text-xs text-blue-400 font-bold">
                      {item.clause}
                    </td>
                    <td className="py-4 px-4 font-semibold text-white">
                      {item.title}
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${getStatusBadge(
                          item.complianceStatus
                        )}`}
                      >
                        {item.complianceStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-semibold ${getRiskBadge(item.riskLevel)}`}>
                        {item.riskLevel} Risk
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-400 font-mono">
                      p. {item.pageNumber}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setActiveRequirement(item)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequirements.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No matching requirements found for the selected filters.
            </div>
          )}
        </div>

        {/* Modal Drawer for Selected Requirement */}
        {activeRequirement && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400">
                    {activeRequirement.clause} • Page {activeRequirement.pageNumber}
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
                    Description
                  </span>
                  <p className="text-slate-300 leading-relaxed mt-1">
                    {activeRequirement.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-500 block">Compliance</span>
                    <span className="font-semibold text-white mt-1 block">
                      {activeRequirement.complianceStatus}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-500 block">Risk Evaluation</span>
                    <span className={`font-semibold mt-1 block ${getRiskBadge(activeRequirement.riskLevel)}`}>
                      {activeRequirement.riskLevel} Risk
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  onClick={() => setActiveRequirement(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
                >
                  Close
                </button>
                <Link
                  href="/chat"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl"
                >
                  Discuss with AI Chat
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
