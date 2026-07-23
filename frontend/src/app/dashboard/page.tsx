import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-blue-900 text-white shadow-md">
        <h1 className="text-2xl font-bold">BidReady AI</h1>

        <div className="space-x-6">
          <Link href="/" className="hover:text-yellow-300">Home</Link>
          <Link href="/dashboard" className="text-yellow-300 font-semibold">
            Dashboard
          </Link>
          <Link href="/upload" className="hover:text-yellow-300">Upload</Link>
          <Link href="/about" className="hover:text-yellow-300">About</Link>
        </div>
      </nav>

      <div className="p-10">

        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          Dashboard
        </h1>

        <p className="text-gray-600 mb-10">
          Overview of BidReady AI activities
        </p>

        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-blue-700 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-4xl font-bold">12</h2>
            <p className="mt-2">Documents Uploaded</p>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-4xl font-bold">85</h2>
            <p className="mt-2">Requirements Found</p>
          </div>

          <div className="bg-purple-600 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-4xl font-bold">24</h2>
            <p className="mt-2">AI Responses</p>
          </div>

          <div className="bg-orange-500 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-4xl font-bold">10</h2>
            <p className="mt-2">Reports Generated</p>
          </div>

        </div>

        {/* Recent Activity */}

        <div className="bg-white rounded-xl shadow-lg mt-12 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-blue-900 text-white">

                <th className="p-3 text-left">Document</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">
                <td className="p-3">Tender_001.pdf</td>
                <td className="p-3 text-green-600 font-semibold">
                  Completed
                </td>
                <td className="p-3">21 Jul 2026</td>
              </tr>

              <tr className="border-b">
                <td className="p-3">Road_Project.pdf</td>
                <td className="p-3 text-yellow-600 font-semibold">
                  Processing
                </td>
                <td className="p-3">20 Jul 2026</td>
              </tr>

              <tr className="border-b">
                <td className="p-3">Bridge_RFP.pdf</td>
                <td className="p-3 text-green-600 font-semibold">
                  Completed
                </td>
                <td className="p-3">18 Jul 2026</td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* Quick Actions */}

        <div className="mt-10 flex flex-wrap gap-5">

          <Link
            href="/upload"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
          >
            Upload New Document
          </Link>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
            Generate Report
          </button>

        </div>

      </div>

    </main>
  );
}