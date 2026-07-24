"use client";

import { useState, ChangeEvent, DragEvent } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    setIsCompleted(false);
    setIsUploading(true);
    setUploadProgress(10);

    // Simulate progress animation
    let current = 10;
    const timer = setInterval(() => {
      current += 20;
      if (current >= 100) {
        setUploadProgress(100);
        setIsUploading(false);
        setIsCompleted(true);
        clearInterval(timer);
      } else {
        setUploadProgress(current);
      }
    }, 300);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/60 border border-blue-800/40 px-3 py-1 rounded-full">
            Document Ingestion Pipeline
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
            Upload Tender & RFP Documents
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Upload your PDF or Word document to trigger automated AI requirement parsing, risk detection, and compliance scoring.
          </p>
        </div>

        {/* Upload Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all ${
              isDragging
                ? "border-blue-500 bg-blue-950/40 scale-[1.01]"
                : "border-slate-700 hover:border-slate-600 bg-slate-950/50"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-3xl mx-auto mb-4">
              📁
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Drag and drop your tender file here
            </h2>

            <p className="text-slate-400 text-sm mb-6">
              Supports PDF, DOCX, and TXT files up to 25MB
            </p>

            <label className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl cursor-pointer shadow-md transition-all">
              <span>Browse File System</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          {/* Progress / Selected File State */}
          {selectedFile && (
            <div className="mt-8 bg-slate-950 border border-slate-800 rounded-xl p-5 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3 truncate">
                  <span className="text-2xl">📄</span>
                  <div className="truncate">
                    <p className="font-semibold text-sm text-white truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-blue-400">
                  {uploadProgress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>

              {/* Completion Action Buttons */}
              {isCompleted && (
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                    <span>✅</span>
                    <span>Document indexed & analyzed successfully!</span>
                  </span>

                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <Link
                      href="/requirements"
                      className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors text-center"
                    >
                      View Requirements Matrix
                    </Link>
                    <Link
                      href="/chat"
                      className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md transition-all text-center"
                    >
                      Start AI Chat
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Requirements & Guidelines */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-3">
              Supported Formats
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Portable Document Format (.pdf)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Microsoft Word Documents (.doc, .docx)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Plain Text (.txt)</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-3">
              Processing Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400">⚡</span>
                <span>Extracts tables, clauses, and SLAs automatically</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400">🔒</span>
                <span>End-to-end encrypted file parsing</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400">🎯</span>
                <span>Generates instant compliance match score</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}