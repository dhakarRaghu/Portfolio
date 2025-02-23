export default function Skills() {
    return (
      <section id="skills" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold text-white mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInLeft">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">C/C++</span>
                <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">Python</span>
                {/* Add more languages */}
              </div>
            </div>
            {/* Add Web Development, Databases, and Developer Tools sections similarly */}
            <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInLeft">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">C/C++</span>
                <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">Python</span>
                {/* Add more languages */}
              </div>
            </div>
            <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInLeft">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Web Development
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">C/C++</span>
                <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">Python</span>
                {/* Add more languages */}
              </div>
            </div>
            <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInLeft">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">C/C++</span>
                <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">Python</span>
                {/* Add more languages */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }