import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  ArrowLeft,
  Check,
  Copy,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function speakName(
  name,
  pronunciationAudioText,
  language,
) {
  if (!('speechSynthesis' in window)) {
    return false
  }

  window.speechSynthesis.cancel()

  const textToSpeak =
    pronunciationAudioText?.trim() ||
    name

  const utterance =
    new SpeechSynthesisUtterance(
      textToSpeak,
    )

  const languageMap = {
    English: 'en-US',
    Spanish: 'es-ES',
    French: 'fr-FR',
    Italian: 'it-IT',
    German: 'de-DE',
    Portuguese: 'pt-PT',
    Japanese: 'ja-JP',
    Korean: 'ko-KR',
    Arabic: 'ar-SA',
    Chinese: 'zh-CN',
    Hindi: 'hi-IN',
    Yoruba: 'yo-NG',
    Igbo: 'ig-NG',
    Hausa: 'ha-NG',
  }

  utterance.lang =
    languageMap[language] ||
    'en-US'

  utterance.rate = 0.82
  utterance.pitch = 1
  utterance.volume = 1

  window.speechSynthesis.speak(
    utterance,
  )

  return true
}

function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

function readStoredNames() {
  try {
    const stored =
      sessionStorage.getItem(
        'mynamelab_results',
      )

    if (!stored) {
      return []
    }

    const parsed = JSON.parse(
      stored,
    )

    return Array.isArray(parsed)
      ? parsed
      : []
  } catch (error) {
    console.error(
      'Could not read stored names:',
      error,
    )

    return []
  }
}

function readPreferences() {
  return {
    type:
      sessionStorage.getItem(
        'mynamelab_type',
      ) || 'Business',

    language:
      sessionStorage.getItem(
        'mynamelab_language',
      ) || 'English',

    style:
      sessionStorage.getItem(
        'mynamelab_style',
      ) || 'Premium',

    description:
      sessionStorage.getItem(
        'mynamelab_description',
      ) || '',
  }
}

export default function Results() {
  const navigate = useNavigate()

  const [names, setNames] =
    useState(readStoredNames)

  const [preferences, setPreferences] =
    useState(readPreferences)

  const [copiedName, setCopiedName] =
    useState(null)

  const [speakingName, setSpeakingName] =
    useState(null)

  const [isGenerating, setIsGenerating] =
    useState(false)

  const [error, setError] =
    useState('')

  useEffect(() => {
    setNames(readStoredNames())
    setPreferences(
      readPreferences(),
    )
  }, [])

  useEffect(() => {
    return () => {
      stopSpeaking()
    }
  }, [])

  const {
    type,
    language,
    style,
    description,
  } = preferences

  const resultCount = names.length

  const subtitle = useMemo(() => {
    if (!type) {
      return 'Names worth considering.'
    }

    return `Names for your ${type.toLowerCase()}.`
  }, [type])

  async function handleCopy(name) {
    try {
      await navigator.clipboard.writeText(
        name,
      )

      setCopiedName(name)

      window.setTimeout(() => {
        setCopiedName(null)
      }, 1600)
    } catch (error) {
      console.error(
        'Copy failed:',
        error,
      )
    }
  }

  function handleSpeak(item) {
    if (
      speakingName === item.name
    ) {
      stopSpeaking()
      setSpeakingName(null)
      return
    }

    stopSpeaking()

    const didSpeak = speakName(
      item.name,
      item.pronunciationAudioText,
      language,
    )

    if (!didSpeak) {
      return
    }

    setSpeakingName(item.name)

    const estimatedDuration =
      Math.max(
        1200,
        (
          item.pronunciationAudioText ||
          item.name ||
          ''
        ).length * 90,
      )

    window.setTimeout(() => {
      setSpeakingName(
        (current) =>
          current === item.name
            ? null
            : current,
      )
    }, estimatedDuration)
  }

  async function handleGenerateMore() {
    if (isGenerating) {
      return
    }

    setError('')
    setIsGenerating(true)

    stopSpeaking()
    setSpeakingName(null)

    try {
      const excludedNames =
        names
          .map((item) =>
            String(
              item?.name || '',
            ).trim(),
          )
          .filter(Boolean)

      const response =
        await fetch(
          '/api/generate',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              type,
              language,
              style,
              description:
                description.trim(),
              excludeNames:
                excludedNames,
            }),
          },
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Something went wrong while finding more names.',
        )
      }

      if (
        !Array.isArray(
          data.names,
        ) ||
        data.names.length !== 10
      ) {
        throw new Error(
          'We could not get 10 new names. Please try again.',
        )
      }

      const updatedNames = [
        ...names,
        ...data.names,
      ]

      sessionStorage.setItem(
        'mynamelab_results',
        JSON.stringify(
          updatedNames,
        ),
      )

      setNames(updatedNames)

      window.setTimeout(() => {
        window.scrollTo({
          top:
            document.body
              .scrollHeight,
          behavior: 'smooth',
        })
      }, 100)
    } catch (error) {
      console.error(
        'Generate more failed:',
        error,
      )

      setError(
        error.message ||
          'We could not generate more names right now. Please try again.',
      )
    } finally {
      setIsGenerating(false)
    }
  }

  function handleBack() {
    stopSpeaking()
    setSpeakingName(null)

    navigate(
      '/generator/description',
    )
  }

  /*
   * Soft editorial color palette.
   * The colors repeat naturally when more
   * than six sets of names are generated.
   */
  const cardColors = [
    {
      background: '#F3DDD2',
      border: '#E4C7BA',
    },
    {
      background: '#DCE7D8',
      border: '#C6D6C1',
    },
    {
      background: '#E3DDF0',
      border: '#CEC5DF',
    },
    {
      background: '#F1E4B8',
      border: '#DED09C',
    },
    {
      background: '#D8E5EA',
      border: '#C1D5DC',
    },
    {
      background: '#EBD7DE',
      border: '#DCC0C9',
    },
  ]

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#24231f]">
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-20 pt-28 sm:px-8 lg:px-10">

        {/* HEADER */}
        <section className="mb-10">
          <button
            type="button"
            onClick={handleBack}
            className="mb-7 inline-flex items-center gap-2 text-sm text-[#6f6b61] transition hover:text-[#24231f]"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.7}
            />
            Back
          </button>

          <div className="flex flex-col gap-5 border-b border-[#d8d1c4] pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8a8377]">
                MyNameLab
              </p>

              <h1 className="max-w-[760px] font-serif text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                Names worth considering.
              </h1>

              <p className="mt-4 max-w-[600px] text-sm leading-6 text-[#706b61] sm:text-[15px]">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {type && (
                <span className="rounded-full border border-[#d4cdc0] bg-[#faf8f2] px-3 py-1.5 text-xs text-[#625e55]">
                  {type}
                </span>
              )}

              {style && (
                <span className="rounded-full border border-[#d4cdc0] bg-[#faf8f2] px-3 py-1.5 text-xs text-[#625e55]">
                  {style}
                </span>
              )}

              {language && (
                <span className="rounded-full border border-[#d4cdc0] bg-[#faf8f2] px-3 py-1.5 text-xs text-[#625e55]">
                  {language}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* DESCRIPTION */}
        {description && (
          <section className="mb-8 rounded-2xl border border-[#ddd6c9] bg-[#faf8f2] px-5 py-4 sm:px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#918a7d]">
              Your direction
            </p>

            <p className="mt-2 max-w-[850px] text-sm leading-6 text-[#5e5a52]">
              {description}
            </p>
          </section>
        )}

        {/* COUNT */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-[#777167]">
            {resultCount}{' '}
            {resultCount === 1
              ? 'name'
              : 'names'}
          </p>

          <p className="hidden text-xs text-[#969084] sm:block">
            Say them aloud. See what stays with you.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-xl border border-[#d8b8af] bg-[#f8eee9] px-4 py-3 text-center text-sm text-[#8d5147]">
            {error}
          </div>
        )}

        {/* NAME CARDS */}
        {names.length > 0 ? (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {names.map(
              (item, index) => {
                const isSpeaking =
                  speakingName ===
                  item.name

                const isCopied =
                  copiedName ===
                  item.name

                const color =
                  cardColors[
                    index %
                      cardColors.length
                  ]

                return (
                  <article
                    key={`${item.name}-${index}`}
                    style={{
                      backgroundColor:
                        color.background,
                      borderColor:
                        color.border,
                    }}
                    className="group flex min-h-[250px] flex-col justify-between rounded-[20px] border p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(72,65,53,0.10)]"
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-serif text-sm text-[#777064]/70">
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          '0',
                        )}
                      </span>

                      <div className="flex items-center gap-1">
                        {/* SPEAK */}
                        <button
                          type="button"
                          onClick={() =>
                            handleSpeak(
                              item,
                            )
                          }
                          aria-label={
                            isSpeaking
                              ? `Stop pronunciation of ${item.name}`
                              : `Hear pronunciation of ${item.name}`
                          }
                          title={
                            isSpeaking
                              ? 'Stop'
                              : 'Hear pronunciation'
                          }
                          className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                            isSpeaking
                              ? 'border-[#8d8270] bg-white/35 text-[#3e392f]'
                              : 'border-transparent text-[#777064] hover:border-black/10 hover:bg-white/30 hover:text-[#2f2c27]'
                          }`}
                        >
                          {isSpeaking ? (
                            <VolumeX
                              size={16}
                              strokeWidth={1.7}
                            />
                          ) : (
                            <Volume2
                              size={16}
                              strokeWidth={1.7}
                            />
                          )}
                        </button>

                        {/* COPY */}
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              item.name,
                            )
                          }
                          aria-label={`Copy ${item.name}`}
                          title="Copy name"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-[#777064] transition hover:border-black/10 hover:bg-white/30 hover:text-[#2f2c27]"
                        >
                          {isCopied ? (
                            <Check
                              size={16}
                              strokeWidth={1.8}
                            />
                          ) : (
                            <Copy
                              size={16}
                              strokeWidth={1.7}
                            />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* NAME */}
                    <div className="py-8">
                      <h2 className="break-words font-serif text-[29px] leading-[1.08] tracking-[-0.025em] text-[#27251f] sm:text-[31px]">
                        {item.name}
                      </h2>

                      {item.pronunciation && (
                        <p className="mt-3 text-xs italic leading-5 text-[#777064]">
                          {item.pronunciation}
                        </p>
                      )}
                    </div>

                    {/* DETAILS */}
                    <div className="border-t border-black/10 pt-4">
                      {item.type && (
                        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#777064]">
                          {item.type}
                        </p>
                      )}

                      {item.meaning && (
                        <p className="line-clamp-3 text-xs leading-5 text-[#5f5a50]">
                          {item.meaning}
                        </p>
                      )}
                    </div>
                  </article>
                )
              },
            )}
          </section>
        ) : (
          <section className="rounded-2xl border border-[#d8d1c4] bg-[#faf8f2] px-6 py-16 text-center">
            <p className="font-serif text-2xl">
              No names yet.
            </p>

            <p className="mt-2 text-sm text-[#777167]">
              Generate a new set of names
              to get started.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  '/generator/description',
                )
              }
              className="mt-6 rounded-full bg-[#2f2b25] px-5 py-3 text-sm text-white transition hover:bg-[#423d35]"
            >
              Generate names
            </button>
          </section>
        )}

        {/* GENERATE MORE */}
        {names.length > 0 && (
          <section className="mt-12 flex flex-col items-center text-center">
            <button
              type="button"
              onClick={
                handleGenerateMore
              }
              disabled={
                isGenerating
              }
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#2f2b25] bg-[#2f2b25] px-6 text-sm font-medium text-[#faf8f2] transition hover:bg-[#423d35] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Sparkles
                size={16}
                strokeWidth={1.7}
              />

              {isGenerating
                ? 'Finding more names...'
                : 'Generate more'}
            </button>

            <p className="mt-3 text-xs text-[#8a8377]">
              Your existing names will stay here.
            </p>
          </section>
        )}
      </div>
    </main>
  )
}