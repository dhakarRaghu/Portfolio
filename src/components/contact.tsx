export default function Contact() {
    return (
      <section id="contact" className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-6">Feel free to reach out for collaborations or just a friendly chat</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 animate__animated animate__fadeInLeft">
              <div className="bg-neutral-900 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:raghvendrasinghdhakar2@gmail.com"
                    className="flex items-center gap-4 text-gray-300 hover:text-blue-500 transition-colors"
                  >
                    <div className="bg-neutral-800 p-3 rounded-lg">
                      {/* Email SVG */}
                    </div>
                    <span>raghvendrasinghdhakar2@gmail.com</span>
                  </a>
                  {/* Add more contact links */}
                </div>
                <div className="mt-8">
                  <a
                    href="/resume.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    {/* Download SVG */}
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
            <div className="animate__animated animate__fadeInRight">
              <form className="bg-neutral-900 p-6 rounded-xl">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  {/* Add more form fields */}
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }