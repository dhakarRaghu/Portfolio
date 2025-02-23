export default function Footer() {
    return (
      <footer id="footer" className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <div className="flex items-center space-x-2">
                {/* Email SVG */}
                <a href="mailto:raghvendrasinghdhakar2@gmail.com" className="hover:text-blue-400">
                  raghvendrasinghdhakar2@gmail.com
                </a>
              </div>
              {/* Add phone */}
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                {/* Add more links */}
              </ul>
            </div>
            {/* Add Coding Profiles and Social Links */}
            <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
              <p className="text-neutral-400">© 2024 Raghvendra Singh Dhakar. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }