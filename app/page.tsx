"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const BETAALLINK = "https://claudiavoogt.kennis.shop/pay/generatiefearless"

// Aftelklok naar het einde van de introductieprijs. Verdwijnt automatisch na precies 1 week.
const OFFER_END = new Date("2026-07-08T00:00:00+02:00").getTime()

function CountdownBanner() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (now === null) return null // voorkomt hydration-mismatch
  if (now >= OFFER_END) return null // na precies 1 week weg

  const diff = Math.max(0, OFFER_END - now)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  const units = [
    { v: days, l: "dagen" },
    { v: hours, l: "uur" },
    { v: minutes, l: "min" },
    { v: seconds, l: "sec" },
  ]

  return (
    <div className="bg-paars rounded-2xl px-6 py-5 md:py-6 max-w-2xl mx-auto shadow-lg">
      <p className="font-sans font-bold text-mint text-center text-sm md:text-base uppercase tracking-wider">
        Introductieprijs nog geldig
      </p>
      <div className="flex justify-center gap-3 md:gap-6 mt-3">
        {units.map((u) => (
          <div key={u.l} className="flex flex-col items-center">
            <span className="font-sans font-extrabold text-white text-3xl md:text-5xl tabular-nums leading-none">
              {String(u.v).padStart(2, "0")}
            </span>
            <span className="font-sans text-white/70 text-xs md:text-sm uppercase tracking-wide mt-1">
              {u.l}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

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
      <div className="container mx-auto px-4 flex items-center justify-end">
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
        <AnimatedSection className="mb-8">
          <CountdownBanner />
        </AnimatedSection>

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
        "Een simpel systeem van 4 potjes dat elk kind direct kan toepassen. Zakgeld, bijbaantje, verjaardag. Alles gaat erdoorheen.",
    },
    {
      title: "Geld Laten Werken",
      description:
        "Wat is beleggen echt? Wat is een ETF? Waarom is vroeg beginnen het geheime ingrediënt? En hoe herken je een slechte belegging?",
    },
    {
      title: "De Eerste Stap",
      description:
        "Stap voor stap een kindrekening openen bij een betrouwbare broker. En je kind gaat de eerste belegging aankopen!",
    },
    {
      title: "Fearless voor Altijd",
      description:
        "Hoe houd je de gewoonte van beleggen levend? En wat is de volgende stap als je kind groeit?",
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
            Geen saaie theorie of grafieken. Gewoon doen.
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
            Deze 3 bonussen krijg je erbij:
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

function ResultSection() {
  return (
    <section className="bg-paars py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <AnimatedSection>
          <p className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
            Na Generatie Fearless weet je kind hoe het slim met geld en (later) inkomen omgaat én hoe het vermogen opbouwt.
          </p>
        </AnimatedSection>
        <AnimatedSection className="mt-6">
          <p className="font-display italic text-2xl md:text-3xl text-mint leading-tight">
            Sterker nog: je kind ís dan al vermogen aan het opbouwen.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

function ReviewSection() {
  return (
    <section className="bg-navy py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection>
          <div className="max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/review-inge.png"
              alt="Review van Inge over de online academy"
              width={1254}
              height={1254}
              className="w-full h-auto block"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function ClarifierSection() {
  return (
    <section className="bg-mint py-14 md:py-20 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <AnimatedSection>
          <p className="font-sans font-semibold text-sm uppercase tracking-[0.2em] text-navy/70">
            Twee vliegen in één klap
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-4">
          <h2 className="font-sans font-extrabold text-2xl md:text-4xl lg:text-[44px] text-navy leading-tight">
            Je kind leert slimmer omgaan met geld <span className="text-fuchsia">én</span> beleggen
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-5">
          <p className="font-serif text-navy/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Dit is geen beleggen vóór jou als ouder. Het is een cursus waarmee jíj je kind
            stap voor stap leert hoe geld werkt, én hoe het z&apos;n eerste beleggingen doet.
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
        "De cursus is geschikt voor ouders met kinderen vanaf ongeveer 10 tot ongeveer 16 jaar. Dat is de leeftijd waarop kinderen abstract kunnen nadenken over geld en de concepten echt beginnen te begrijpen. Maar de mindset en het potjessysteem kun je al veel eerder introduceren (vanaf het moment dat ze zakgeld krijgen). Hoe eerder de gewoonte is ingesleten, hoe groter het effect later.",
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
      question: "Zit er persoonlijke begeleiding van jou bij?",
      answer:
        "Nee, deze cursus doorloop je zelfstandig, samen met je kind. Kom je écht ergens niet uit? Stuur me dan een mail, dan ga ik je helpen.",
    },
    {
      question: "Hoe lang heb ik toegang tot de online cursus?",
      answer:
        "Je houdt onbeperkt toegang. Je kunt wanneer je maar wil de lessen opnieuw bekijken!",
    },
    {
      question: "Hoe krijg ik mijn kind mee?",
      answer:
        "Een vraag die ik vaak hoor, en heel terecht. Niet elk kind staat meteen te springen, en dat is precies waar veel ouders vastlopen. Daarom zit er een aparte bonusles bij die je stap voor stap meeneemt in hoe je je kind enthousiast maakt, en wat je doet als het in eerste instantie nee zegt. Je hoeft je kind niet te overtuigen of te dwingen. Je hoeft alleen de juiste deur open te zetten, de rest doet de cursus.",
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

function CycleBreakerSection() {
  return (
    <section className="bg-whitesmoke py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <AnimatedSection>
          <p className="font-display italic text-2xl md:text-3xl lg:text-4xl text-paars leading-tight">
            Jij hebt altijd alles geregeld voor je kind. Maar dit niet.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-4">
          <p className="font-serif text-navy/70 text-lg leading-relaxed">
            Niet omdat je het niet wilde. Maar omdat niemand het jou ooit heeft geleerd.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <p className="font-serif text-navy/85 text-lg leading-relaxed">
            Generatie Fearless verandert dat. In vijf modules leer jij, samen met je kind, hoe geld
            echt werkt. Hoe een eerste belegging eruitziet. Hoe je een geldsysteem opzet dat
            automatisch doorgroeit, ook als je er niet naar kijkt.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid md:grid-cols-2 gap-6 md:gap-10">
          <AnimatedSection>
            <div className="bg-white rounded-xl p-6 h-full border-l-4 border-mint">
              <p className="font-sans font-bold text-navy">Wat jouw kind meeneemt</p>
              <p className="font-serif text-navy/70 mt-2 leading-relaxed">
                Een rekening op zijn eigen naam, een eerste belegging die al groeit, en het begrip
                dat de meeste volwassenen op hun 35e nog niet hebben. Dat geld voor je kan werken.
                Niet andersom.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-xl p-6 h-full border-l-4 border-paars">
              <p className="font-sans font-bold text-navy">Wat jij meeneemt</p>
              <p className="font-serif text-navy/70 mt-4 leading-relaxed">
                Het gesprek over geld is niet langer ongemakkelijk. Je weet wat je doorgeeft. En die
                stille zorg, die al jaren op de achtergrond knaagt, die is eindelijk ergens omgezet
                in iets concreets.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-16">
          <p className="font-serif text-navy/85 text-lg leading-relaxed">
            Je koopt dit niet alleen voor je kind. Je repareert ook iets in jezelf. Iets wat jouw
            ouders je nooit hebben meegegeven: kennis over geld.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <p className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl text-fuchsia leading-tight">
            Jij doorbreekt de cyclus. Vandaag.
          </p>
        </AnimatedSection>
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
      <ClarifierSection />
      <PainSection />
      <AboutSection />
      <CourseSection />
      <ResultSection />
      <BonusesSection />
      <ReviewSection />
      <FAQSection />
      <CycleBreakerSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
