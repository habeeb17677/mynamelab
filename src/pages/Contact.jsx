import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
} from 'lucide-react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyekebjn'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '',
  })

  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    if (status !== 'idle') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData._gotcha) {
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
          _subject: `MyNameLab Contact: ${formData.subject || 'New message'}`,
          _replyto: formData.email.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.errors?.map((item) => item.message).join(', ') ||
            'Something went wrong. Please try again.',
        )
      }

      setStatus('success')

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        _gotcha: '',
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error.message || 'Something went wrong. Please try again.',
      )
    }
  }

  const handleSendAnother = () => {
    setStatus('idle')
    setErrorMessage('')
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#1F2523]">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#DCD5CA] bg-[#F7F3EC]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label="MyNameLab home"
          >
            <span className="font-serif text-[30px] leading-none tracking-[-0.06em] text-[#1F2523]">
              N
            </span>

            <span className="hidden text-[15px] font-medium tracking-[-0.01em] sm:block">
              MyNameLab
            </span>
          </Link>

          <nav className="flex items-center gap-5 sm:gap-8">
            <Link
              to="/how-it-works"
              className="text-[13px] font-medium text-[#5D625F] transition hover:text-[#1F2523]"
            >
              How it works
            </Link>

            <Link
              to="/contact"
              className="text-[13px] font-medium text-[#1F2523]"
            >
              Contact
            </Link>

            <Link
              to="/generator"
              className="group hidden items-center gap-1.5 rounded-full bg-[#1F2523] px-4 py-2.5 text-[13px] font-medium text-[#F7F3EC] transition hover:bg-[#343A37] sm:flex"
            >
              Start naming
              <ArrowUpRight
                size={14}
                strokeWidth={1.8}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-5 pb-20 pt-[120px] sm:px-8 sm:pt-[140px]">
        {/* Intro */}
        <section className="mx-auto max-w-[820px] text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCD5CA] bg-[#FBF8F2] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#747974]">
            <Mail size={13} strokeWidth={1.6} />
            Get in touch
          </div>

          <h1 className="font-serif text-[48px] leading-[0.98] tracking-[-0.045em] text-[#1F2523] sm:text-[64px]">
            Let&apos;s talk.
          </h1>

          <p className="mx-auto mt-5 max-w-[610px] text-[15px] leading-7 text-[#666B67] sm:text-[16px]">
            Have a question, found something that could be better, or simply
            want to say hello? Send us a message. We&apos;d love to hear from
            you.
          </p>
        </section>

        {/* Main contact area */}
        <section className="mx-auto mt-12 grid max-w-[1040px] gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          {/* Left information */}
          <aside className="rounded-[24px] border border-[#DCD5CA] bg-[#EFE8DD] p-7 sm:p-9">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4CABE] bg-[#F7F3EC]">
              <span className="font-serif text-[22px] tracking-[-0.06em]">
                N
              </span>
            </div>

            <h2 className="mt-7 font-serif text-[31px] leading-[1.05] tracking-[-0.035em]">
              Have something to share?
            </h2>

            <p className="mt-4 text-[14px] leading-6 text-[#686D69]">
              MyNameLab is built to make finding the right name feel simple.
              Your questions, ideas, feedback, and bug reports help us make it
              better.
            </p>

            <div className="my-8 h-px bg-[#D5CEC3]" />

            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#858983]">
                  Good reasons to reach out
                </p>
              </div>

              <div className="space-y-4 text-[13px] leading-5 text-[#555B57]">
                <div className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#777D78]" />
                  <p>Something isn&apos;t working as expected.</p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#777D78]" />
                  <p>You have an idea for improving MyNameLab.</p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#777D78]" />
                  <p>You want to share feedback about generated names.</p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#777D78]" />
                  <p>You simply want to say hello.</p>
                </div>
              </div>
            </div>

            <div className="mt-9 rounded-[18px] border border-[#D5CEC3] bg-[#F7F3EC]/70 p-4">
              <p className="text-[12px] leading-5 text-[#6D726E]">
                No account is needed to contact us.
              </p>
            </div>
          </aside>

          {/* Form */}
          <div className="rounded-[24px] border border-[#DCD5CA] bg-[#FBF8F2] p-6 sm:p-9">
            {status === 'success' ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9D8C8] bg-[#E7F0E5]">
                  <CheckCircle2
                    size={30}
                    strokeWidth={1.5}
                    className="text-[#4E6751]"
                  />
                </div>

                <h2 className="mt-6 font-serif text-[36px] leading-tight tracking-[-0.035em]">
                  Message sent.
                </h2>

                <p className="mt-3 max-w-[430px] text-[14px] leading-6 text-[#6A706B]">
                  Thanks for reaching out to MyNameLab. Your message has been
                  received.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleSendAnother}
                    className="rounded-full border border-[#CFC8BD] bg-[#F7F3EC] px-5 py-3 text-[13px] font-medium text-[#303632] transition hover:border-[#AFA89E] hover:bg-white"
                  >
                    Send another message
                  </button>

                  <Link
                    to="/"
                    className="group flex items-center justify-center gap-1.5 rounded-full bg-[#1F2523] px-5 py-3 text-[13px] font-medium text-[#F7F3EC] transition hover:bg-[#343A37]"
                  >
                    Back home
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#858983]">
                    Contact form
                  </p>

                  <h2 className="mt-2 font-serif text-[31px] leading-tight tracking-[-0.035em]">
                    Send us a message
                  </h2>
                </div>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="mb-6 rounded-[14px] border border-[#E2C8C0] bg-[#F8E9E4] px-4 py-3 text-[13px] leading-5 text-[#784C43]"
                  >
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                    aria-hidden="true"
                  />

                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-[12px] font-medium text-[#454B47]"
                      >
                        Your name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={80}
                        autoComplete="name"
                        placeholder="Your name"
                        className="h-12 w-full rounded-[12px] border border-[#D7D0C5] bg-[#F7F3EC] px-4 text-[13px] text-[#1F2523] outline-none transition placeholder:text-[#9A9C97] focus:border-[#8D928C] focus:ring-2 focus:ring-[#DCD5CA]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-[12px] font-medium text-[#454B47]"
                      >
                        Email address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={120}
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="h-12 w-full rounded-[12px] border border-[#D7D0C5] bg-[#F7F3EC] px-4 text-[13px] text-[#1F2523] outline-none transition placeholder:text-[#9A9C97] focus:border-[#8D928C] focus:ring-2 focus:ring-[#DCD5CA]"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-[12px] font-medium text-[#454B47]"
                    >
                      What&apos;s this about?
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-12 w-full appearance-none rounded-[12px] border border-[#D7D0C5] bg-[#F7F3EC] px-4 text-[13px] text-[#1F2523] outline-none transition focus:border-[#8D928C] focus:ring-2 focus:ring-[#DCD5CA]"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="General question">
                        General question
                      </option>
                      <option value="Feedback">Feedback</option>
                      <option value="Bug report">Bug report</option>
                      <option value="Naming results">
                        Naming results
                      </option>
                      <option value="Business or partnership">
                        Business or partnership
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <label
                        htmlFor="message"
                        className="text-[12px] font-medium text-[#454B47]"
                      >
                        Message
                      </label>

                      <span className="text-[11px] text-[#969994]">
                        {formData.message.length}/2000
                      </span>
                    </div>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={7}
                      placeholder="Tell us what's on your mind..."
                      className="w-full resize-y rounded-[12px] border border-[#D7D0C5] bg-[#F7F3EC] px-4 py-3.5 text-[13px] leading-6 text-[#1F2523] outline-none transition placeholder:text-[#9A9C97] focus:border-[#8D928C] focus:ring-2 focus:ring-[#DCD5CA]"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1F2523] px-6 text-[13px] font-medium text-[#F7F3EC] transition hover:bg-[#343A37] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2
                            size={16}
                            strokeWidth={1.8}
                            className="animate-spin"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send
                            size={15}
                            strokeWidth={1.7}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                          Send message
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-[11px] leading-5 text-[#8B8E89]">
                    By sending this message, you agree that we can use the
                    information you provide to respond to your request.
                  </p>
                </form>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DCD5CA]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            aria-label="MyNameLab home"
          >
            <span className="font-serif text-[23px] leading-none tracking-[-0.06em]">
              N
            </span>
            <span className="text-[12px] font-medium text-[#5D625F]">
              MyNameLab
            </span>
          </Link>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#747974]">
            <Link
              to="/how-it-works"
              className="transition hover:text-[#1F2523]"
            >
              How it works
            </Link>

            <Link to="/privacy" className="transition hover:text-[#1F2523]">
              Privacy
            </Link>

            <Link to="/terms" className="transition hover:text-[#1F2523]">
              Terms
            </Link>

            <Link to="/contact" className="text-[#1F2523]">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Contact