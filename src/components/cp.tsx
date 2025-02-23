export default function CompetitiveProgramming() {
    return (
      <section id="competitive-programming" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold text-white mb-4">Competitive Programming</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInLeft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Codeforces</h3>
                <span className="px-3 py-1 bg-blue-500 text-sm text-white rounded-full">@pupil</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Max Rating</span>
                  <span className="text-white font-semibold">1369</span>
                </div>
                {/* Add more stats */}
              </div>
              <a
                href="https://codeforces.com/profile/pupil"
                target="_blank"
                className="mt-6 flex items-center justify-center gap-2 text-blue-500 hover:text-blue-400"
              >
                <span>View Profile</span>
                {/* External link SVG */}
              </a>
            </div>
            {/* Add LeetCode and Overall Stats similarly */}
          </div>
        </div>
      </section>
    );
  }