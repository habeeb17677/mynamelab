import Header from '../components/Header'
import Footer from '../components/Footer'

function Privacy() {
  return (
    <div className="min-h-screen bg-[#f3f1e7] text-[#101923]">
      <Header />

      <main className="px-5 pb-20 pt-[72px] sm:px-8">
        <article className="mx-auto max-w-[760px] py-16 sm:py-24">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#4e5659]">
            Legal
          </p>

          <h1 className="serif mt-4 text-[46px] leading-none tracking-[-0.04em] sm:text-[60px]">
            Privacy
          </h1>

          <p className="mt-5 text-[13px] text-[#656b6c]">
            Last updated: October 2026
          </p>

          <div className="mt-12 space-y-10 text-[14px] leading-7 text-[#3f474b]">
            <section>
              <h2 className="serif text-[25px] text-[#101923]">
                Information we receive
              </h2>

              <p className="mt-3">
                MyNameLab may receive information that you voluntarily provide
                when using the naming tool or contacting us.
              </p>
            </section>

            <section>
              <h2 className="serif text-[25px] text-[#101923]">
                How information is used
              </h2>

              <p className="mt-3">
                Information may be used to provide the naming service,
                respond to messages and improve the experience.
              </p>
            </section>

            <section>
              <h2 className="serif text-[25px] text-[#101923]">
                No account required
              </h2>

              <p className="mt-3">
                MyNameLab does not require users to create an account or
                maintain a profile to use the naming tool.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

export default Privacy