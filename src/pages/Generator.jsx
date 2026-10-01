import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const categories = [
  'Business',
  'Brand',
  'Gamer Tag',
  'Username',
  'App',
  'Website',
  'YouTube',
  'Team',
  'Nickname',
  'Pet',
  'Character',
  'Project',
]

function Generator() {
  const navigate = useNavigate()

  const [selectedType, setSelectedType] = useState(() => {
    return sessionStorage.getItem('mynamelab_type') || ''
  })

  const handleSelect = (category) => {
    setSelectedType(category)
    sessionStorage.setItem('mynamelab_type', category)
  }

  const handleContinue = () => {
    if (!selectedType) {
      return
    }

    navigate('/generator/language')
  }

  return (
    <div className="min-h-screen bg-[#f3f1e7] text-[#101923]">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d8d5c9] bg-[#f3f1e7]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1010px] items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <span className="serif text-[34px] leading-none">
              N
            </span>

            <span className="serif text-[19px]">
              MyNameLab
            </span>
          </Link>

          <span className="text-[13px]">
            01 / 04
          </span>
        </div>
      </header>

      <main className="pt-[72px]">
        <section className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1010px] flex-col border-x border-[#d8d5c9]">
          
          {/* CONTENT */}
          <div className="flex flex-1 flex-col items-center px-5 py-12 sm:px-8 sm:py-16">
            
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#555d60]">
              Step 1 of 4
            </p>

            <h1 className="serif mt-5 text-center text-[42px] leading-[1.03] tracking-[-0.045em] sm:text-[54px]">
              What are you naming?
            </h1>

            <p className="mt-4 text-center text-[15px] text-[#454d51]">
              Choose what you need a name for.
            </p>

            {/* CATEGORY GRID */}
            <div className="mt-10 grid w-full max-w-[820px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((category, index) => {
                const selected = selectedType === category

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleSelect(category)}
                    aria-pressed={selected}
                    className={`
                      relative flex min-h-[82px]
                      items-center justify-center
                      rounded-[8px]
                      border
                      px-4
                      text-center
                      text-[16px]
                      transition-all
                      duration-200
                      focus:outline-none
                      ${
                        selected
                          ? 'border-[#172630] bg-[#dce4e3] shadow-[0_5px_16px_rgba(20,30,35,0.12)]'
                          : 'border-[#c9c7bd] bg-[#f5f3ea] hover:border-[#747c7e] hover:bg-[#f8f6ee]'
                      }
                    `}
                  >
                    {/* SELECTED CHECK */}
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full">
                        <Check
                          className="h-4 w-4"
                          strokeWidth={1.8}
                        />
                      </span>
                    )}

                    {/* SMALL REFERENCE MARKER */}
                    {!selected && (
                      <span
                        className={`
                          absolute right-3 top-3
                          text-[8px]
                          font-medium
                          ${
                            index % 3 === 0
                              ? 'text-[#a39368]'
                              : index % 3 === 1
                                ? 'text-[#7e91a0]'
                                : 'text-[#b18a7c]'
                          }
                        `}
                      >
                        {String((index % 2) + 1).padStart(2, '0')}
                      </span>
                    )}

                    <span>{category}</span>
                  </button>
                )
              })}
            </div>

            {/* SELECTED INDICATOR */}
            <div className="mt-6 h-5 text-center">
              {selectedType ? (
                <p className="text-[12px] text-[#555d60]">
                  Selected: <span className="font-medium">{selectedType}</span>
                </p>
              ) : (
                <p className="text-[12px] text-[#777d7f]">
                  Select an option to continue.
                </p>
              )}
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="flex flex-col-reverse gap-4 border-t border-[#d8d5c9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            
            <Link
              to="/"
              className="flex items-center gap-2 text-[13px] transition-opacity hover:opacity-60"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />

              <span className="hidden sm:inline">
                Back to home
              </span>

              <span className="sm:hidden">
                Back
              </span>
            </Link>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedType}
              className={`
                flex items-center justify-center gap-2
                self-end
                rounded-full
                px-5 py-3
                text-[13px]
                font-medium
                transition
                ${
                  selectedType
                    ? 'bg-[#10202d] text-white hover:bg-[#182d3d]'
                    : 'cursor-not-allowed bg-[#d8d6cd] text-[#858786]'
                }
              `}
            >
              Continue

              <ArrowRight
                className="h-4 w-4"
                strokeWidth={1.6}
              />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Generator