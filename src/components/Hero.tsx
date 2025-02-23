export default function Hero() {
    return (
      <section id="hero" className="min-h-[70vh] flex items-center bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 animate__animated animate__fadeInLeft">
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white">
                    Hi, I'm <span className="text-blue-500">Raghvendra Singh</span>
                  </h1>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-gray-400 mb-6">
                Full stack Developer | Competitive Programmer | Open Source Contributor
              </p>
              <div className="flex gap-4 mb-8">
                <a
                  href="mailto:raghvendrasinghdhakar2@gmail.com"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Get in Touch
                </a>
                <a
                  href="#projects"
                  className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg hover:border-blue-500 hover:text-blue-500 transition duration-300"
                >
                  View Projects
                </a>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Raghu"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {/* GitHub SVG */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387..." />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/raghvendra1853"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {/* LinkedIn SVG */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328..." />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex-1 animate__animated animate__fadeInRight">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full"></div>
                <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 rounded-xl border border-neutral-800">
                  <pre className="text-gray-300 font-mono text-sm">
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-green-400">developer</span> = {"{"}
                    <br />
                    &nbsp;&nbsp;name: <span className="text-yellow-300">"Raghvendra Singh"</span>,
                    <br />
                    &nbsp;&nbsp;location: <span className="text-yellow-300">"Nagpur, India"</span>,
                    <br />
                    &nbsp;&nbsp;education: <span className="text-yellow-300">"IIIT Nagpur"</span>,
                    <br />
                    &nbsp;&nbsp;skills: [
                    <span className="text-yellow-300">"Backend"</span>,{" "}
                    <span className="text-yellow-300">"AI"</span>,{" "}
                    <span className="text-yellow-300">"CP"</span>],
                    <br />
                    &nbsp;&nbsp;experience: <span className="text-purple-400">true</span>,
                    <br />
                    &nbsp;&nbsp;coffee: <span className="text-purple-400">Infinity</span>
                    <br />
                    {"}"}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }