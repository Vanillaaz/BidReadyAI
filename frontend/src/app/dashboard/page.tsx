"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardCard from "@/components/DashboardCard";

interface Project {
  id: string;
  name: string;
  client_name?: string;
  deadline?: string;
  status?: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://bidready-backend-env.eba-rayatq56.us-east-1.elasticbeanstalk.com/api/v1/projects/")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setLoading(false);
      });
  }, []);

  const dashboardStats = [
    {
      title: "Active Workspaces",
      value: projects.length.toString(),
      icon: "📁",
      color: "border-blue-500/40 text-blue-400",
      change: "+100%",
      description: "Live RFP parsing workspaces",
    },
    {
      title: "Compliance Score",
      value: "94%",
      icon: "🎯",
      color: "border-emerald-500/40 text-emerald-400",
      change: "+4%",
      description: "Average bid match rating",
    },
    {
      title: "Extracted Requirements",
      value: "128",
      icon: "📝",
      color: "border-amber-500/40 text-amber-400",
      change: "Parsed",
      description: "Across all active tenders",
    },
    {
      title: "Risk Alerts",
      value: "2",
      icon: "⚠️",
      color: "border-rose-500/40 text-rose-400",
      change: "Attention",
      description: "Non-compliant legal terms",
    },
  ];

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
              <h2 className="text-xl font-bold text-white">Live RFP Projects</h2>
              <p className="text-xs text-slate-400 mt-1">
                Track status and active project workspaces connected to PostgreSQL.
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 px-4">Project Name</th>
                  <th className="pb-3 px-4">Client Name</th>
                  <th className="pb-3 px-4">Deadline</th>
                  <th className="pb-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white flex items-center space-x-3">
                      <span className="text-xl">📄</span>
                      <span className="truncate max-w-xs">{proj.name}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{proj.client_name || "Government Agency"}</td>
                    <td className="py-4 px-4 text-slate-400 text-xs">{proj.deadline || "2026-12-31"}</td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          localStorage.setItem("current_project_id", proj.id);
                          window.location.href = "/requirements";
                        }}
                        className="inline-block px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Select & View Matrix
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {projects.length === 0 && (
            <div className="p-12 text-center text-slate-500 font-medium">
              {loading ? "⌛ Loading project workspaces from backend..." : "No active project workspaces created yet. Click '+ Upload Tender' to create one!"}
            </div>
          )}

        </section>
      </main>

      <Footer />
    </div>
  );
}
