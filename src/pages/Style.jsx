import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const styles = [
  'Modern',
  'Professional',
  'Cool',
  'Minimal',
  'Premium',
  'Luxury',
  'Funny',
  'Bold',
  'Cute',
]

function Style() {
  const navigate = useNavigate()

  const [selectedStyle, setSelectedStyle] = useState(() => {
    return sessionStorage.getItem('mynamelab_style') || ''
  })

  const handleSelect = (value) => {
    setSelectedStyle(value)
    sessionStorage.setItem('mynamelab_style', value)
  }

  const handleContinue = () => {
    if (!selectedStyle) return

    navigate('/generator/description')
  }

  return (
    <div className="min-h-screen bg-[#f3f1e7] text-[#101923]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d8d5c9] bg-[#f3f1e7]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1010px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="serif text-[34px] leading-none">
              N
            </span>

            <span className="serif text-[19px]">
              MyNameLab
            </span>
          </div>

          <span className="text-[13px]">
            03 / 04
          </span>
        </div>
      </header>

      <main className="pt-[72px]">
        <section className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1010px] flex-col border-x border-[#d8d5c9]">
          <div className="flex flex-1 flex-col items-center justify-center px-5 py-12 sm:px-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#555d60]">
              Step 3 of 4
            </p>

            <h1 className="serif mt-5 text-center text-[42px] leading-[1.03] tracking-[-0.045em] sm:text-[55px]">
              What should it feel like?
            </h1>

            <p className="mt-4 text-center text-[15px] text-[#454d51]">
              Choose the personality and mood you want your name to have.
            </p>

            <div className="mt-10 grid w-full max-w-[600px] grid-cols-2 gap-3 sm:grid-cols-3">
              {styles.map((style) => {
                const selected = selectedStyle === style

                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => handleSelect(style)}
                    className={`
                      relative flex min-h-[96px]
                      items-center justify-center
                      rounded-[9px]
                      border
                      text-[17px]
                      transition-all
                      ${
                        selected
                          ? 'border-[#172630] bg-[#dce4e3] shadow-[0_5px_16px_rgba(20,30,35,0.12)]'
                          : 'border-[#c9c7bd] bg-[#f5f3ea] hover:border-[#747c7e]'
                      }
                    `}
                  >
                    {selected && (
                      <Check
                        className="absolute right-3 top-3 h-4 w-4"
                        strokeWidth={1.8}
                      />
                    )}

                    {style}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-4 border-t border-[#d8d5c9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <button
              type="button"
              onClick={() => navigate('/generator/language')}
              className="flex items-center gap-2 text-[13px]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedStyle}
              className={`
                flex items-center gap-2
                self-end rounded-full
                px-5 py-3
                text-[13px] font-medium
                ${
                  selectedStyle
                    ? 'bg-[#10202d] text-white'
                    : 'cursor-not-allowed bg-[#d8d6cd] text-[#858786]'
                }
              `}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Style