import CipherTool from "@/components/cipher-tool"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg")`,
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>
      <div className="relative container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400">
            Cipher Visualization Tool
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Explore the fascinating world of classical encryption techniques with this interactive tool. Enter your
            text, choose a key, and watch how different ciphers transform your message with step-by-step visualizations.
          </p>
        </header>
        <main>
          <CipherTool />
        </main>
        <footer className="mt-16 text-center text-sm text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <p>
              Created with Next.js, Tailwind CSS, and mathematical precision.
              By{' '}
              <a
                className="hover:underline text-white"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/MuhammadAusafJamal"
              >
                Muhammad Ausaf Jamal
              </a>.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
