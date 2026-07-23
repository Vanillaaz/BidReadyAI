import Link from "next/link";

export default function Upload() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-blue-900 text-white shadow-md">
        <h1 className="text-2xl font-bold">BidReady AI</h1>

        <div className="space-x-6">
          <Link href="/" className="hover:text-yellow-300">Home</Link>
          <Link href="/dashboard" className="hover:text-yellow-300">
            Dashboard
          </Link>
          <Link href="/upload" className="text-yellow-300 font-semibold">
            Upload
          </Link>
          <Link href="/about" className="hover:text-yellow-300">About</Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center py-16 px-6">

        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Upload Tender Document
        </h1>

        <p className="text-gray-600 text-lg mb-10 text-center">
          Upload your tender document and let BidReady AI analyze it.
        </p>

        {/* Upload Box */}
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-10">

          <div className="border-2 border-dashed border-blue-500 rounded-xl p-12 text-center">

            <div className="text-6xl mb-4">📄</div>

            <h2 className="text-2xl font-bold mb-3">
              Drag & Drop Files Here
            </h2>

            <p className="text-gray-500 mb-6">
              or click below to choose a file
            </p>

            <input
              type="file"
              className="block mx-auto mb-6"
              accept=".pdf,.doc,.docx,.txt"
            />

            <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg">
              Upload Document
            </button>

          </div>

        </div>

        {/* Supported Files */}
        <div className="mt-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">

          <h2 className="text-xl font-bold mb-4">
            Supported File Types
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>PDF Documents (.pdf)</li>
            <li>Word Documents (.doc, .docx)</li>
            <li>Text Files (.txt)</li>
          </ul>

        </div>

      </div>

    </main>
  );
}