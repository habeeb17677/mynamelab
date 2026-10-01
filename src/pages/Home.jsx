import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const visualNames = [
  {
    name: 'Northline',
    label: '01 ORIGIN',
    className:
      'left-[8%] top-[10%] rotate-[-5deg] bg-[#c8d4bc]',
  },
  {
    name: 'Aster',
    label: '02 CONCEPT',
    className:
      'right-[7%] top-[7%] rotate-[4deg] bg-[#d6c9dc]',
  },
  {
    name: 'Velora',
    label: '02 CONCEPT',
    className:
      'right-[16%] top-[34%] rotate-[1deg] bg-[#a9c2d2]',
  },
  {
    name: 'Morrow',
    label: '01 ORIGIN',
    className:
      'left-[23%] top-[49%] rotate-[-3deg] bg-[#df8d73]',
  },
  {
    name: 'Luma',
    label: '02 CONCEPT',
    className:
      'right-[1%] bottom-[7%] rotate-[3deg] bg-[#e5dcc4]',
  },
  {
    name: 'Aster',
    label: '01 ORIGIN',
    className:
      'left-[2%] bottom-[10%] rotate-[3deg] bg-[#c9c0d8]',
  },
]

function Home() {
  return (
    <div className="min-h-screen bg-[#f3f1e7] text-[#101923]">
      <Header />

      <main className="pt-[72px]">
        {/* HERO */}
        <section className="border-b border-[#d8d5c9]">
          <div className="mx-auto grid min-h-[430px] max-w-[1010px] grid-cols-1 border-x border-[#d8d5c9] lg:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-12">
              <h1 className="serif max-w-[520px] text-[48px] leading-[0.98] tracking-[-0.045em] sm:text-[62px] lg:text-[64px]">
                Find a name
                <br />
                worth keeping.
              </h1>

              <p className="mt-6 max-w-[480px] text-[15px] leading-[1.55] text-[#30383d] sm:text-[16px]">
                An editorial naming studio for businesses, brands,
                apps, and projects. Crafting identity with intention.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link
                  to="/generator"
                  className="rounded-full bg-[#10202d] px-5 py-3 text-[13px] font-medium text-white transition hover:bg-[#182d3d]"
                >
                  Find Your Name
                </Link>

                <Link
                  to="/how-it-works"
                  className="group flex items-center gap-1.5 text-[14px] text-[#172028]"
                >
                  See how it works
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* NAME BOARD */}
            <div className="relative min-h-[350px] overflow-hidden border-t border-[#d8d5c9] bg-[#eeece2] lg:border-l lg:border-t-0">
              <div className="absolute inset-0 opacity-40">
                <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8d6c9] blur-3xl" />
              </div>

              {visualNames.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className={`absolute w-[165px] rounded-[5px] border border-black/10 px-3 py-2.5 shadow-[0_8px_18px_rgba(30,40,40,0.12)] sm:w-[185px] ${item.className}`}
                >
                  <div className="text-[7px] font-medium tracking-[0.08em] text-[#283238]">
                    {item.label}
                  </div>

                  <div className="serif mt-3 text-[27px] leading-none tracking-[-0.035em]">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="border-b border-[#d8d5c9]">
          <div className="mx-auto grid max-w-[1010px] grid-cols-2 border-x border-[#d8d5c9] sm:grid-cols-4">
            <div className="border-b border-r border-[#d8d5c9] px-5 py-4 text-center sm:border-b-0">
              <p className="text-[13px] font-medium">
                12 Naming Categories
              </p>
            </div>

            <div className="border-b border-[#d8d5c9] px-5 py-4 text-center sm:border-b-0 sm:border-r">
              <p className="text-[13px] font-medium">
                Multiple Language Contexts
              </p>
            </div>

            <div className="border-r border-[#d8d5c9] px-5 py-4 text-center">
              <p className="text-[13px] font-medium">
                9 Creative Styles
              </p>
            </div>

            <div className="px-5 py-4 text-center">
              <p className="text-[13px] font-medium">
                10 Curated Suggestions
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS PREVIEW */}
        <section className="border-b border-[#d8d5c9]">
          <div className="mx-auto grid max-w-[1010px] grid-cols-1 border-x border-[#d8d5c9] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="px-6 py-12 sm:px-10 lg:px-12">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#4e5659]">
                How it works
              </p>

              <div className="mt-7 grid gap-8 sm:grid-cols-3 lg:gap-6">
                <div>
                  <span className="text-[14px]">01</span>

                  <h2 className="mt-3 text-[15px] font-medium">
                    Choose / Define
                  </h2>

                  <p className="mt-1.5 text-[12px] leading-5 text-[#4d5559]">
                    Choose your category, language and style.
                  </p>
                </div>

                <div>
                  <span className="text-[14px]">02</span>

                  <h2 className="mt-3 text-[15px] font-medium">
                    Describe / Outline
                  </h2>

                  <p className="mt-1.5 text-[12px] leading-5 text-[#4d5559]">
                    Tell us about your idea and what it represents.
                  </p>
                </div>

                <div>
                  <span className="text-[14px]">03</span>

                  <h2 className="mt-3 text-[15px] font-medium">
                    Discover / Explore
                  </h2>

                  <p className="mt-1.5 text-[12px] leading-5 text-[#4d5559]">
                    Explore carefully generated names worth considering.
                  </p>
                </div>
              </div>
            </div>

            {/* COLORFUL NAME GRID */}
            <div className="border-t border-[#d8d5c9] px-6 py-10 sm:px-10 lg:border-l lg:border-t-0 lg:px-10">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                <div className="flex min-h-[70px] items-center justify-center rounded-[4px] bg-[#e5d6b8]">
                  <span className="serif text-[19px]">Aura</span>
                </div>

                <div className="flex min-h-[70px] items-center justify-center rounded-[4px] bg-[#cec4d9]">
                  <span className="serif text-[19px]">Kinetic</span>
                </div>

                <div className="flex min-h-[70px] items-center justify-center rounded-[4px] bg-[#afc3d3]">
                  <span className="serif text-[19px]">Ostro</span>
                </div>

                <div className="flex min-h-[70px] items-center justify-center rounded-[4px] bg-[#e1aaa0]">
                  <span className="serif text-[19px]">Evel</span>
                </div>

                <div className="flex min-h-[70px] items-center justify-center rounded-[4px] bg-[#e8e2d1]">
                  <span className="serif text-[19px]">Flipa</span>
                </div>

                <div className="flex min-h-[70px] items-center justify-center rounded-[4px] bg-[#d9c4b8]">
                  <span className="serif text-[19px]">Rhov</span>
                </div>
              </div>

              <h2 className="serif mt-7 max-w-[260px] text-[31px] leading-[1.02] tracking-[-0.04em]">
                Made for names that feel right.
              </h2>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home