import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-[#d8d5c9]">
      <div className="mx-auto flex max-w-[1010px] flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5"
        >
          <span className="serif text-[28px] leading-none">
            N
          </span>

          <span className="serif text-[16px]">
            MyNameLab
          </span>
        </Link>

        <p className="text-[12px] text-[#454a4b]">
          Find a name worth keeping.
        </p>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[#454a4b]">
          <Link
            to="/contact"
            className="transition-opacity hover:opacity-60"
          >
            Contact
          </Link>

          <Link
            to="/terms"
            className="transition-opacity hover:opacity-60"
          >
            Terms
          </Link>

          <Link
            to="/privacy"
            className="transition-opacity hover:opacity-60"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer