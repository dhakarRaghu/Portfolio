export default function About() {
    return (
      <section id="about" className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate__animated animate__fadeInLeft">
              <h3 className="text-2xl font-bold text-white mb-6">
                FullStack Developer & Competitive Programmer
              </h3>
              <p className="text-gray-300 mb-6">
                Currently pursuing Bachelor of Technology in Computer Science at Indian Institute of Information Technology Nagpur...
              </p>
              <p className="text-gray-300 mb-6">
                With expertise in building scalable backend systems and a strong foundation in data structures and algorithms...
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <h4 className="text-blue-500 text-lg font-semibold mb-2">800+</h4>
                  <p className="text-gray-300">CP Problems Solved</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <h4 className="text-blue-500 text-lg font-semibold mb-2">@pupil</h4>
                  <p className="text-gray-300">Codeforces Rating</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">Next.js</span>
                <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">Express.js</span>
                {/* Add more skills */}
              </div>
            </div>
            <div className="animate__animated animate__fadeInRight">
              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                      {/* Problem Solving SVG */}
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M12 4v16" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Problem Solving</h4>
                      <p className="text-gray-400">Strong algorithmic skills with 800+ problems solved</p>
                    </div>
                  </div>
                  {/* Add Backend Development and AI Integration sections similarly */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }