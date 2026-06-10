"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const BETAALLINK = "https://claudiavoogt.kennis.shop/pay/generatiefearless"

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.1, ...options })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isInView }
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  )
}

function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Generatie%20Fearless%20logo%20transparant-fCzyuLlfGIP7Bcv4uPBiFFgWO9l74s.png"
          alt="Generatie Fearless"
          width={150}
          height={50}
          className="h-8 md:h-10 w-auto"
        />
        <a
          href={BETAALLINK}
          className="bg-fuchsia text-white font-bold text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Start nu
        </a>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-whitesmoke pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection>
          <div className="flex justify-center mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Generatie%20Fearless%20logo%20transparant-fCzyuLlfGIP7Bcv4uPBiFFgWO9l74s.png"
              alt="Generatie Fearless"
              width={300}
              height={100}
              className="w-64 md:w-80 h-auto"
              priority
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h1 className="font-display italic text-2xl md:text-3xl lg:text-4xl text-paars text-center leading-tight">
            De cursus die jij als kind had willen hebben
          </h1>
        </AnimatedSection>

        <AnimatedSection className="mt-4">
          <p className="font-sans font-extrabold text-2xl md:text-4xl lg:text-5xl text-navy text-center leading-tight">
            Geef je kind de financiële voorsprong die jij nooit kreeg
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banner%20Generatie%20Fearless%20DEF-iqoiQIyUvpP2sNqZ62QEjYUK88gO6B.png"
              alt="Generatie Fearless - Financiële vrijheid begint vandaag"
              width={1600}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <a
            href={BETAALLINK}
            className="block w-full bg-fuchsia text-white text-center font-bold text-lg py-4 px-6 rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Ja, ik wil dit voor mijn kind
          </a>
          <p className="text-center text-navy/60 text-sm mt-3 font-sans">
            Je krijgt direct toegang, dus je kunt meteen starten!
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

function PainSection() {
  const painPoints = [
    {
      pain: "Je wil het anders doen dan je eigen ouders.",
      recognition: "Maar je weet niet waar je moet beginnen.",
    },
    {
      pain: "Je ziet je kind geld uitgeven zonder nadenken.",
      recognition: "Terwijl jij weet dat elke euro nu het verschil maakt later.",
    },
    {
      pain: "TikTok staat vol met crypto-hypes en snel-rijk-worden-gastjes.",
      recognition: "En jij wil je kind daar tegen beschermen. Maar ook niet tegenhouden.",
    },
  ]

  return (
    <section className="bg-navy py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection>
          <p className="font-display italic text-xl md:text-2xl lg:text-3xl text-white text-center leading-relaxed">
            {'"'}Van huis uit leerde jij niks over beleggen. Dat stopt hier.
            <br />
            Jij kunt je kind dit wél meegeven.{'"'}
          </p>
        </AnimatedSection>

        <div className="mt-12 md:mt-16 space-y-8">
          {painPoints.map((point, index) => (
            <AnimatedSection key={index}>
              <div className="text-white">
                <p className="font-sans font-bold text-lg md:text-xl">{point.pain}</p>
                <p className="font-serif text-white/70 mt-1">{point.recognition}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12">
          <div className="bg-fuchsia rounded-xl p-6 md:p-8">
            <p className="font-sans font-bold text-white text-lg md:text-xl text-center leading-relaxed">
              Als jij dit niet leert aan je kind, leert TikTok het wel. Maar dan wordt het waarschijnlijk een slecht verhaal...
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function AboutSection() {
  const stats = [
    { value: "28 jaar", label: "financiële ervaring" },
    { value: "3.000+", label: "klanten begeleid" },
    { value: "100%", label: "vrijheid" },
  ]

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection>
          <div className="flex items-center gap-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/StudioAnnemarije-Claudia-7%20kopie-wN0SvIwZVi5sCXbdvDKCnkzBIZPi67.jpg"
              alt="Claudia Voogt"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
            />
            <span className="font-sans font-semibold text-sm uppercase tracking-wider text-mint">
              Wie is Claudia Voogt?
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-4">
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl text-navy leading-tight">
            28 jaar financiële ervaring. En de moeder van een kind dat vanaf z&apos;n 11e al belegt.
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <div className="font-serif text-navy/80 space-y-4 leading-relaxed">
            <p>
              Ik ben beleggingsexpert en financieel vrijheidsmentor. 22 jaar werkte ik als zelfstandig
              financieel adviseur voor meer dan 3.000 klanten. Ik heb van binnenuit gezien hoe het
              financiële systeem werkt.
            </p>
            <p>
              Op een gegeven moment besloot ik mijn leven om te gooien. Ik verkocht mijn bedrijf en
              besloot mijn jarenlange ervaring en lessen over vermogen opbouwen door te geven aan
              anderen.
            </p>
            <p>
              Maar het mooiste wat ik heb gedaan? Mijn eigen zoon leren beleggen. Hij begon op zijn
              11e. Toen ik hem uitlegde hoe dividend werkt en hoe je dat kunt herbeleggen, was hij
              even stil. Toen riep hij:
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <blockquote className="font-display italic text-2xl md:text-3xl text-fuchsia leading-relaxed">
            {'"'}Mam, ik krijg nu echt een breinexplosie. Dit is gewoon infinity money!!{'"'}
          </blockquote>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <p className="font-serif text-navy/80 leading-relaxed">
            Dat moment wilde ik voor elk kind mogelijk maken. Dat is waarom ik{" "}
            <strong className="font-bold">Generatie Fearless</strong> heb gebouwd.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-12">
          <div className="bg-paars rounded-xl p-6 grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-sans font-extrabold text-xl md:text-2xl text-white">
                  {stat.value}
                </p>
                <p className="font-sans text-white/80 text-xs md:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function CourseSection() {
  const modules = [
    {
      title: "Het Geldbrein",
      description:
        "Doorbreek de geldovertuigingen die generaties lang zijn doorgegeven. Inclusief jouw eigen overtuigingen over geld.",
    },
    {
      title: "Het Potjessysteem",
      description:
        "Een simpel systeem van 4 potjes dat elk kind direct kan toepassen. Zakgeld, bijbaantje, verjaardag — alles gaat erdoorheen.",
    },
    {
      title: "Geld Laten Werken",
      description:
        "Wat is beleggen echt? Wat is een ETF? Waarom is vroeg beginnen het geheime ingrediënt?",
    },
    {
      title: "De Eerste Stap",
      description:
        "Stap voor stap een kindrekening openen bij een betrouwbare broker in Nederland en de eerste echte belegging doen.",
    },
    {
      title: "Fearless voor Altijd",
      description:
        "Hoe herken je een slechte belegging? Hoe houd je de gewoonte van beleggen levend? En wat is de volgende stap als je kind groeit?",
    },
  ]

  return (
    <section className="bg-whitesmoke py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection>
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl text-navy">
            Wat je krijgt
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-4">
          <p className="font-serif text-lg md:text-xl text-navy/80 leading-relaxed">
            Geen theorie. Geen saaie spreadsheets. Gewoon doen.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <div className="max-w-lg mx-auto">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mockup%20Generatie%20Fearless%20transparant-7TfZYFMCUkAk6GzSUCT5UiQK7T0Ku5.png"
              alt="Generatie Fearless cursus op laptop, tablet en telefoon"
              width={1080}
              height={1080}
              className="w-full h-auto"
            />
          </div>
        </AnimatedSection>

        <div className="mt-10 space-y-4">
          {modules.map((module, index) => (
            <AnimatedSection key={index}>
              <div className="bg-white rounded-xl p-5 md:p-6 border-l-4 border-paars shadow-sm">
                <h3 className="font-sans font-bold text-lg md:text-xl text-navy">
                  Module {index + 1}: {module.title}
                </h3>
                <p className="font-serif text-navy/70 mt-2 leading-relaxed">{module.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function BonusesSection() {
  const bonuses = [
    {
      title: "Het Generatie Fearless Werkboek",
      description: "Oefeningen per module voor jou, maar ook voor jou en je kind samen.",
    },
    {
      title: "De Infinity Money Calculator",
      description:
        "Zie in één oogopslag wat jouw kind opbouwt als het nu begint met beleggen voor de lange termijn.",
    },
    {
      title: "De Generatie Fearless Startlijst",
      description: "Een startlijst met beleggingen om mee te beginnen. Met uitleg waarom. Het is het startpunt, geen eindpunt.",
    },
  ]

  return (
    <section className="bg-fuchsia py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection>
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl text-white text-center">
            Dit krijg je er gratis bij
          </h2>
        </AnimatedSection>

        <div className="mt-10 space-y-4">
          {bonuses.map((bonus, index) => (
            <AnimatedSection key={index}>
              <div className="bg-white rounded-xl p-5 md:p-6">
                <h3 className="font-sans font-bold text-lg md:text-xl text-navy">{bonus.title}</h3>
                <p className="font-serif text-navy/70 mt-2">{bonus.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10">
          <a
            href={BETAALLINK}
            className="block w-full bg-paars text-white text-center font-bold text-lg py-4 px-6 rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Ja, ik wil dit voor mijn kind
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}

function QuoteSection() {
  return (
    <section className="bg-navy py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <AnimatedSection>
          <p className="font-display italic text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed">
            {'"'}Leer je kind beleggen - en geef ze de voorsprong die jij nooit kreeg.{'"'}
          </p>
          <p className="font-sans font-semibold text-mint mt-6 tracking-wider">
            Generatie Fearless
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    {
      question: "Voor welke leeftijd is deze cursus geschikt?",
      answer:
        "De cursus is geschikt voor ouders met kinderen vanaf ongeveer 10 jaar. Dat is de leeftijd waarop kinderen abstract kunnen nadenken over geld en de concepten echt beginnen te begrijpen. Maar de mindset en het potjessysteem kun je al veel eerder introduceren. Hoe eerder de gewoonte is ingesleten, hoe groter het effect later.",
    },
    {
      question: "Moet mijn kind meedoen of is het alleen voor mij als ouder?",
      answer:
        "Jij volgt de cursus als ouder. Jij bent de gids. Maar je krijgt tools en oefeningen die speciaal zijn ontworpen om samen met je kind te doen. Denk aan werkboekopdrachten, gespreksstarters en de Infinity Money Calculator die je samen invult. Je kind hoeft niet achter het scherm te zitten voor elke les. Maar de momenten die er echt toe doen, doe je samen.",
    },
    {
      question: "Ik weet zelf weinig van beleggen. Kan ik deze cursus dan wel volgen?",
      answer:
        "Absoluut. Deze cursus is juist gemaakt voor ouders die zelf nooit iets over beleggen hebben geleerd. Ik leg alles stap voor stap uit, zonder jargon, zonder ingewikkelde theorieën. Je hoeft geen financieel expert te zijn. Sterker nog, veel ouders die deze cursus volgen leren zelf ook enorm veel. Dat is de bonus die je er gratis bij krijgt.",
    },
    {
      question: "Wat heb ik nodig om te beginnen?",
      answer:
        "Allereerst de wil om je kind een andere start te geven dan jij hebt gehad. Verder heb je nodig: een kind met een bankrekening, of de bereidheid om die samen te openen. Een telefoon of laptop om de lessen te bekijken. Ongeveer 15 minuten per week om samen door te werken. En later een account bij de broker voor de kindrekening, dat wordt volledig stap voor stap uitgelegd. Geen voorkennis. Geen groot startkapitaal. Geen ingewikkelde tools. Gewoon beginnen.",
    },
    {
      question: "Wat maakt deze cursus anders dan jouw programma Investeren kun je Leren?",
      answer:
        "Heel goede vraag. En een eerlijk antwoord. Generatie Fearless en Investeren kun je Leren zijn twee heel verschillende producten voor twee heel verschillende fases. Generatie Fearless is voor kinderen die beginnen. Met kleine bedragen, zakgeld, bijbaantjes. Ze leren een gewoonte opbouwen, begrijpen hoe geld werkt en doen hun eerste beleggingen. Generatie Fearless is specifiek ontworpen voor ouders die hun kind willen leren beleggen. De taal is anders, de voorbeelden zijn anders, en de focus ligt op samen doen met je kind. Je krijgt praktische tools om je kind stap voor stap mee te nemen. Investeren kun je Leren is voor volwassenen die een serieus vermogen willen opbouwen. Daarin leer je welke fondsen/ETF's het best presteren, hoe je die kunt vinden, hoe je je vermogen actief beschermt en hoe je een strategie bouwt waarbij je geld exponentieel groeit. Dat is een heel ander niveau, met andere verantwoordelijkheden en andere bedragen. Zie het zo: Generatie Fearless is het fietsje met zijwieltjes. Je kind leert balanceren, krijgt vertrouwen en bouwt een gewoonte voor het leven. Investeren kun je Leren is leren om echt te leren fietsen.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection>
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl text-navy text-center">
            Veelgestelde vragen
          </h2>
        </AnimatedSection>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index}>
              <div className="border border-navy/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-whitesmoke transition-colors"
                >
                  <span className="font-sans font-semibold text-navy pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-paars flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-[1200px]" : "max-h-0"
                  }`}
                >
                  <p className="font-serif text-navy/70 p-5 pt-0 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="bg-navy py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <AnimatedSection>
          <h2 className="font-sans font-extrabold text-[32px] md:text-[42px] text-white leading-tight">
            De vraag is niet of deze cursus duur is.
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-4">
          <p className="font-display italic text-[28px] md:text-[36px] text-fuchsia leading-tight">
            De vraag is wat het kost als je niets doet.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <div className="font-serif text-white/85 text-lg leading-[1.8] space-y-6 text-left md:text-center">
            <p>
              Nog een generatie die niks meekrijgt over geld. Nog een kind dat op zijn 30e van nul
              moet beginnen met beleggen en niet weet waar te beginnen. Afhankelijk blijven. Zonder plan. Zonder gewoonte.
            </p>
            <p>
              Deze cursus is voor ouders die deze cyclus willen doorbreken.
              Die zeggen: bij mij stopt het. Mijn kind krijgt wat ik nooit heb gekregen.
            </p>
            <p>
              Als jij die ouder bent, dan is deze cursus geen kostenpost. Het is de beste investering die je ooit
              voor je kind kunt doen.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <a
            href={BETAALLINK}
            className="inline-block w-full md:w-auto md:min-w-[320px] bg-fuchsia text-white text-center font-sans font-extrabold text-lg py-[18px] px-8 rounded-lg hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Ik wil de cyclus breken
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}

function FinalCTASection() {
  return (
    <section className="bg-paars py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <AnimatedSection>
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
            Jouw kind heeft één voordeel dat niemand meer kan afpakken.
          </h2>
          <p className="font-sans text-white/90 text-lg md:text-xl mt-4">Tijd. En die tikt.</p>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <a
            href={BETAALLINK}
            className="block w-full max-w-md mx-auto bg-fuchsia text-white text-center font-bold text-lg py-4 px-6 rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Ja, ik wil dit voor mijn kind
          </a>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <p className="font-display italic text-mint text-lg md:text-xl">
            Als je begint met 5 euro per maand, dan is dat geen klein bedrag.
            <br />
            Het is het begin van alles...
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-navy py-8 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <p className="font-sans text-white/60 text-sm">
          © {new Date().getFullYear()} Generatie Fearless. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main>
      <StickyHeader />
      <HeroSection />
      <PainSection />
      <AboutSection />
      <CourseSection />
      <BonusesSection />
      <QuoteSection />
      <FAQSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
