const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Anupam. All rights reserved.
        </p>

        <div className="flex gap-4 text-sm">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            Contact
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer
