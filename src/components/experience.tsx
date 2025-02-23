export default function Experience() {
    return (
      <section id="experience" className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold text-white mb-4">Experience & Contributions</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-neutral-700"></div>
            <div className="space-y-12">
              <div className="relative animate__animated animate__fadeInLeft">
                <div className="md:w-1/2 md:pr-8 md:ml-auto">
                  <div className="bg-neutral-900 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-500 text-sm text-white rounded-full">Present</span>
                      <span className="text-gray-400">Open Source</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Joplin Open Source Project</h3>
                    <p className="text-gray-300 mb-4">
                      Contributed to the development of the Joplin open-source project...
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                      <li>Showcased proficiency in debugging and cross-platform development</li>
                      {/* Add more items */}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-neutral-700 text-sm text-gray-300 rounded-full">JavaScript</span>
                      {/* Add more tech */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Add more timeline items */}
            </div>
          </div>
        </div>
      </section>
    );
  }