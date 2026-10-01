import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#d8d5c9] bg-[#f3f1e7]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1010px] items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="MyNameLab home"
        >
          <span className="serif text-[34px] leading-none text-[#101923]">
            N
          </span>

          <span className="serif text-[19px] tracking-[-0.02em] text-[#101923]">
            MyNameLab
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/generator"
            className="text-[14px] text-[#151b21] transition-opacity hover:opacity-60"
          >
            Name Generator
          </Link>

          <Link
            to="/how-it-works"
            className="text-[14px] text-[#151b21] transition-opacity hover:opacity-60"
          >
            How It Works
          </Link>
        </nav>

        <Link
          to="/generator"
          className="group flex items-center gap-2 rounded-full bg-[#10202d] px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#182d3d]"
        >
          Find a Name
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  )
}

export default Header