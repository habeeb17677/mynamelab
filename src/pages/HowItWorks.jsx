import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#f3f1e7] text-[#101923]">
      <Header />

      <main className="pt-[72px]">
        <section className="mx-auto max-w-[1010px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#4e5659]">
              Process
            </p>

            <h1 className="serif mt-4 text-[44px] leading-none tracking-[-0.04em] sm:text-[58px]">
              How it works.
            </h1>

            <p className="mt-4 text-[15px] text-[#454d51]">
              Finding a name shouldn't feel complicated.
            </p>
          </div>

          <div className="mt-16 grid border-y border-[#d8d5c9] md:grid-cols-3">
            <div className="border-b border-[#d8d5c9] px-6 py-9 md:border-b-0 md:border-r">
              <span className="text-[12px]">01 — CHOOSE</span>

              <h2 className="serif mt-5 text-[28px] leading-tight">
                Tell us what you're naming.
              </h2>

              <p className="mt-4 text-[13px] leading-6 text-[#454d51]">
                Choose your project type, language and preferred style.
              </p>
            </div>

            <div className="border-b border-[#d8d5c9] px-6 py-9 md:border-b-0 md:border-r">
              <span className="text-[12px]">02 — DESCRIBE</span>

              <h2 className="serif mt-5 text-[28px] leading-tight">
                Give us the context.
              </h2>

              <p className="mt-4 text-[13px] leading-6 text-[#454d51]">
                Tell us about your idea, audience, mood and what the name
                should represent.
              </p>
            </div>

            <div className="px-6 py-9">
              <span className="text-[12px]">03 — DISCOVER</span>

              <h2 className="serif mt-5 text-[28px] leading-tight">
                Explore names worth keeping.
              </h2>

              <p className="mt-4 text-[13px] leading-6 text-[#454d51]">
                Receive a curated set of names designed around your direction.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/generator"
              className="inline-flex rounded-full bg-[#10202d] px-6 py-3 text-[13px] font-medium text-white"
            >
              Find Your Name
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HowItWorks