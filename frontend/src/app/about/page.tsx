import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-blue-900 text-white shadow-md">
        <h1 className="text-2xl font-bold">BidReady AI</h1>

        <div className="space-x-6">
          <Link href="/" className="hover:text-yellow-300">
            Home
          </Link>

          <Link href="/dashboard" className="hover:text-yellow-300">
            Dashboard
          </Link>

          <Link href="/upload" className="hover:text-yellow-300">
            Upload
          </Link>

          <Link href="/about" className="text-yellow-300 font-semibold">
            About
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-16 px-6">
        <h1 className="text-5xl font-bold text-blue-900 mb-6">
          About BidReady AI
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          BidReady AI is an AI-powered tender analysis platform designed to
          simplify the bid preparation process. It helps organizations upload
          tender documents, extract requirements, analyze content using AI,
          and generate structured reports for faster and smarter decision
          making.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Our Mission
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-700 leading-8">
            Our mission is to make tender analysis easier, faster, and more
            accurate using Artificial Intelligence. By reducing manual work,
            organizations can focus on preparing stronger proposals and
            improving their chances of winning bids.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto py-10 px-6">

        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Why Choose BidReady AI?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="font-bold text-xl mb-2">AI Powered</h3>
            <p>Advanced AI extracts important information quickly.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-bold text-xl mb-2">Fast Processing</h3>
            <p>Analyze large tender documents within seconds.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="font-bold text-xl mb-2">Secure</h3>
            <p>Your uploaded documents remain protected.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="font-bold text-xl mb-2">Smart Reports</h3>
            <p>Generate professional reports for bid preparation.</p>
          </div>

        </div>

      </section>

      {/* Team */}
      <section className="py-16 bg-white mt-10">

        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Project Team
        </h2>

        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-xl shadow-lg p-8 w-96 text-center">

            <div className="text-6xl mb-4">👨‍💻</div>

            <h3 className="text-2xl font-bold">
              IBM Internship Team
            </h3>

            <p className="mt-3 text-gray-600">
              Frontend • Backend • AI Development
            </p>

          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-8 mt-10">

        <h2 className="text-2xl font-bold">
          BidReady AI
        </h2>

        <p className="mt-3">
          AI Powered Tender Analysis Platform
        </p>

        <p className="mt-5 text-gray-300">
          © 2026 IBM Internship Project
        </p>

      </footer>

    </main>
  );
}