import { ArrowLeft, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Description() {
  const navigate = useNavigate()

  const [description, setDescription] = useState(() => {
    return sessionStorage.getItem('mynamelab_description') || ''
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const selectedType =
    sessionStorage.getItem('mynamelab_type') || 'Business'

  const language =
    sessionStorage.getItem('mynamelab_language') || 'English'

  const style =
    sessionStorage.getItem('mynamelab_style') || 'Premium'

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Tell us a little about your idea first.')
      return
    }

    setError('')
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedType,
          language,
          style,
          description: description.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Something went wrong while generating names.',
        )
      }

      if (!data.names || data.names.length !== 10) {
        throw new Error(
          'Gemini did not return exactly 10 names. Please try again.',
        )
      }

      // Save the exact Gemini response.
      sessionStorage.setItem(
        'mynamelab_results',
        JSON.stringify(data.names),
      )

      sessionStorage.setItem(
        'mynamelab_description',
        description.trim(),
      )

      navigate('/results')
    } catch (err) {
      setError(
        err.message ||
          'We could not generate names right now. Please try again.',
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f1e7] text-[#101923]">
      {/* HEADER */}
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
            04 / 04
          </span>
        </div>
      </header>

      <main className="pt-[72px]">
        <section className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1010px] flex-col border-x border-[#d8d5c9]">
          {/* CONTENT */}
          <div className="flex flex-1 flex-col items-center px-5 py-12 sm:px-8 sm:py-16">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#555d60]">
              Step 4 of 4
            </p>

            <h1 className="serif mt-5 text-center text-[42px] leading-[1.03] tracking-[-0.045em] sm:text-[55px]">
              Tell us about your idea.
            </h1>

            <p className="mt-4 text-center text-[15px] text-[#454d51]">
              Give us a little context and we'll create names around it.
            </p>

            {/* SELECTED OPTIONS */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <span className="rounded-full border border-[#c9c7bd] bg-[#eee9dc] px-4 py-2 text-[12px]">
                {selectedType}
              </span>

              <span className="rounded-full border border-[#c9c7bd] bg-[#eee9dc] px-4 py-2 text-[12px]">
                {language}
              </span>

              <span className="rounded-full border border-[#c9c7bd] bg-[#eee9dc] px-4 py-2 text-[12px]">
                {style}
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-7 w-full max-w-[520px]">
              <textarea
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value)
                  setError('')
                }}
                rows={7}
                disabled={isGenerating}
                placeholder="Example: A premium skincare brand using natural ingredients with simple elegant packaging."
                className="w-full resize-none rounded-[7px] border border-[#7d8586] bg-[#f7f5ec] px-5 py-4 text-[15px] leading-6 text-[#20282d] outline-none placeholder:text-[#858987] focus:border-[#172630] focus:ring-1 focus:ring-[#172630] disabled:opacity-60"
              />

              <p className="mt-3 text-center text-[12px] text-[#555d60]">
                The more context you give us, the better we can shape the names.
              </p>

              {error && (
                <p className="mt-3 text-center text-[12px] text-[#9a5145]">
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex flex-col-reverse gap-4 border-t border-[#d8d5c9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => navigate('/generator/style')}
              className="flex items-center gap-2 text-[13px] disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 self-end rounded-full bg-[#10202d] px-5 py-3 text-[13px] font-medium text-white transition hover:bg-[#182d3d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Finding names...
                </>
              ) : (
                <>
                  Generate Names
                  <Sparkles className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Description