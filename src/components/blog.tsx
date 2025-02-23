export default function Blog() {
    return (
      <section id="blog" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold text-white mb-4">Technical Blog</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-6">Sharing insights about Backend Development, AI, and Competitive Programming</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg animate__animated animate__fadeInUp">
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Jan 15, 2024</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Building Scalable Backend Systems with Next.js</h3>
                <p className="text-gray-400 mb-4">Exploring best practices for building performant...</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-neutral-700 text-sm text-gray-300 rounded-full">Next.js</span>
                  {/* Add more tags */}
                </div>
                <a href="#" className="text-blue-500 hover:text-blue-400 inline-flex items-center gap-2">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Add more blog posts */}
          </div>
        </div>
      </section>
    );
  }