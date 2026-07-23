import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-blue-900 text-white shadow-md sticky top-0">
        <h1 className="text-3xl font-bold">BidReady AI</h1>

        <div className="space-x-8 text-lg">
          <Link href="/" className="hover:text-yellow-300">Home</Link>
          <Link href="/dashboard" className="hover:text-yellow-300 transition-colors duration-300">Dashboard</Link>
          <Link href="/upload" className="hover:text-yellow-300">Upload</Link>
          <Link href="/about" className="hover:text-yellow-300">About</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6">

        <h1 className="text-6xl font-bold text-blue-900 mb-6">
          Welcome to BidReady AI
        </h1>

        <p className="text-xl text-gray-700 max-w-3xl mb-10">
          AI-powered platform that analyzes tender documents, extracts
          requirements, performs compliance checks, and generates intelligent
          reports to help organizations prepare winning bids faster.
        </p>

        <div className="space-x-5">
          <Link
            href="/upload"
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg"
          >
            Get Started
          </Link>

          <Link
            href="/about"
            className="border border-blue-700 text-blue-700 hover:bg-blue-100 px-8 py-4 rounded-lg"
          >
            Learn More
          </Link>
        </div>

      </section>

      {/* Features */}

      <section className="py-20 bg-white">

        <h2 className="text-4xl font-bold text-center text-blue-900 mb-14">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-10">

          <div className="bg-gray-100 rounded-xl p-8 shadow hover:shadow-lg">
            <div className="text-5xl mb-5">📄</div>

            <h3 className="text-2xl font-bold mb-3">
              Requirement Extraction
            </h3>

            <p>
              Automatically extracts tender requirements from uploaded
              documents.
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow hover:shadow-lg">
            <div className="text-5xl mb-5">🤖</div>

            <h3 className="text-2xl font-bold mb-3">
              AI Analysis
            </h3>

            <p>
              AI summarizes documents and highlights important clauses.
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow hover:shadow-lg">
            <div className="text-5xl mb-5">📊</div>

            <h3 className="text-2xl font-bold mb-3">
              Compliance Check
            </h3>

            <p>
              Compare tender documents against requirements instantly.
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow hover:shadow-lg">
            <div className="text-5xl mb-5">📑</div>

            <h3 className="text-2xl font-bold mb-3">
              Report Generation
            </h3>

            <p>
              Generate downloadable reports with AI insights.
            </p>
          </div>

        </div>

      </section>

      {/* How it Works */}

      <section className="py-20 bg-gray-100">

        <h2 className="text-4xl font-bold text-center text-blue-900 mb-14">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-8 px-8">

          <div className="bg-white rounded-xl shadow-lg p-8 w-72 text-center">
            <h3 className="text-3xl mb-4">1️⃣</h3>
            <h4 className="font-bold text-xl mb-3">
              Upload Document
            </h4>

            <p>
              Upload tender PDFs, DOCX, or text files.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 w-72 text-center">
            <h3 className="text-3xl mb-4">2️⃣</h3>
            <h4 className="font-bold text-xl mb-3">
              AI Analysis
            </h4>

            <p>
              AI extracts requirements, risks and key information.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 w-72 text-center">
            <h3 className="text-3xl mb-4">3️⃣</h3>
            <h4 className="font-bold text-xl mb-3">
              Generate Report
            </h4>

            <p>
              Export compliance reports and bid summaries.
            </p>
          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="py-20 bg-white">

        <div className="grid md:grid-cols-4 gap-10 text-center px-10">

          <div>
            <h2 className="text-5xl font-bold text-blue-900">500+</h2>
            <p className="mt-3 text-lg">Documents Processed</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-blue-900">95%</h2>
            <p className="mt-3 text-lg">Accuracy</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-blue-900">150+</h2>
            <p className="mt-3 text-lg">Reports Generated</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-blue-900">24/7</h2>
            <p className="mt-3 text-lg">AI Assistance</p>
          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-blue-900 text-white text-center py-10">

        <h2 className="text-3xl font-bold">
          BidReady AI
        </h2>

        <p className="mt-3">
          AI Powered Tender Analysis Platform
        </p>

        <p className="mt-6 text-gray-300">
          © 2026 IBM Internship Project
        </p>

      </footer>

    </main>
  );
}