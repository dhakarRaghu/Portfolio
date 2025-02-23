export default function Projects() {
    return (
      <section id="projects" className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold text-white mb-4">Key Projects</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-neutral-900 rounded-xl overflow-hidden shadow-xl animate__animated animate__fadeInLeft">
              <div className="relative">
                <div className="aspect-video bg-neutral-700 flex items-center justify-center">
                  <svg className="w-16 h-16 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <span className="px-2 py-1 bg-blue-500 text-xs text-white rounded-full">Jan 2025</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">GitBuddy Live</h3>
                <p className="text-gray-400 mb-4">A full-stack AI-powered GitHub SaaS platform...</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-neutral-700 text-sm text-gray-300 rounded-full">Next.js 15</span>
                  {/* Add more tech */}
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-blue-500 hover:text-blue-400 flex items-center gap-2">
                    {/* GitHub SVG */}
                    <span>View Code</span>
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-400 flex items-center gap-2">
                    {/* Live Demo SVG */}
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
            {/* Add more projects similarly */}
          </div>
        </div>
      </section>
    );
  }