import MobileMenu from './MobileMenu'; // Import the Client Component for mobile menu

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-neutral-900/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-blue-500 text-xl font-bold">RSD</span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#hero" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              <a href="#skills" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Skills
              </a>
              <a href="#projects" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Projects
              </a>
              <a href="#competitive-programming" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                CP
              </a>
              <a href="#experience" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Experience
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
            </div>
          </div>
          {/* Mobile Menu Button and Menu (Client Component) */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}