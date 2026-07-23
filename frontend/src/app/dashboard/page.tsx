"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardCard from "@/components/DashboardCard";
import { dashboardStats, recentActivity, ActivityItem } from "@/data/dummyData";

export default function Dashboard() {
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const filteredActivities = filterStatus === "All"
    ? recentActivity
    : recentActivity.filter((act) => act.status === filterStatus);

  const getStatusBadge = (status: ActivityItem["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-950 text-emerald-400 border-emerald-800/50";
      case "Processing":
        return "bg-amber-950 text-amber-400 border-amber-800/50 animate-pulseSlow";
      case "Uploaded":
        return "bg-blue-950 text-blue-400 border-blue-800/50";
      case "Flagged":
        return "bg-rose-950 text-rose-400 border-rose-800/50";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tender Overview Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time analytics, compliance tracking, and document processing status.
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
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center space-x-2"
            >
              <span>+ Upload Tender</span>
            </Link>
          </div>
        </div>

        {/* Statistics Cards Grid */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              change={card.change}
              description={card.description}
            />
          ))}
        </section>

        {/* Recent Activity Table */}
        <section className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white">Recent Tender Analysis</h2>
              <p className="text-xs text-slate-400 mt-1">
                Track status and compliance match scores for recently uploaded documents.
              </p>
            </div>

            {/* Status Filter Chips */}
            <div className="flex items-center space-x-2 text-xs overflow-x-auto pb-2 sm:pb-0">
              {["All", "Completed", "Processing", "Uploaded", "Flagged"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    filterStatus === status
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 px-4">Document Name</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Match Score</th>
                  <th className="pb-3 px-4">Date Uploaded</th>
                  <th className="pb-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white flex items-center space-x-3">
                      <span className="text-xl">📄</span>
                      <span className="truncate max-w-xs">{activity.documentName}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{activity.category}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${getStatusBadge(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${
                              activity.matchScore >= 90
                                ? "bg-emerald-500"
                                : activity.matchScore >= 75
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${activity.matchScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-200">
                          {activity.matchScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-xs">{activity.date}</td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <Link
                        href="/chat"
                        className="inline-block px-3 py-1 bg-blue-950 hover:bg-blue-900 border border-blue-800 text-blue-400 text-xs font-semibold rounded-lg transition-colors"
                      >
                        AI Chat
                      </Link>
                      <Link
                        href="/requirements"
                        className="inline-block px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                      >
                        Requirements
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}