import { aboutCopy, howItWorks, faqItems, sectionLabels } from '@/lib/seo'
import { SiteLocale } from '@/lib/site'

/* Shared editorial section frame: mono kicker, serif heading, hairline rule. */
function SectionShell({
  index,
  kicker,
  title,
  children,
}: {
  index: string
  kicker: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="flex items-baseline gap-4">
        <span className="kicker num">§ {index}</span>
        <span className="kicker">{kicker}</span>
      </div>
      <h2 className="mt-3 text-balance font-display text-2xl font-normal leading-snug text-foreground sm:text-3xl">
        {title}
      </h2>
      <div className="rule rule-draw mt-6" />
      <div className="mt-8">{children}</div>
    </section>
  )
}

export function About({ locale }: { locale: SiteLocale }) {
  const labels = sectionLabels[locale]
  return (
    <SectionShell index="01" kicker={labels.about.kicker} title={labels.about.title}>
      <div className="space-y-5">
        {aboutCopy[locale].map((para, i) => (
          <p key={i} className="text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
            {para}
          </p>
        ))}
      </div>
    </SectionShell>
  )
}

export function HowItWorks({ locale }: { locale: SiteLocale }) {
  const data = howItWorks[locale]
  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="flex items-baseline gap-4">
        <span className="kicker num">§ 02</span>
        <span className="kicker">{data.title}</span>
      </div>
      <h2 className="sr-only-screen">{data.title}</h2>
      <div className="rule rule-draw mt-6" />
      <ol className="mt-8 space-y-6">
        {data.steps.map((step, i) => (
          <li key={i} className="flex gap-5">
            <span className="num font-mono text-sm text-primary/80">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function FAQ({ locale }: { locale: SiteLocale }) {
  const labels = sectionLabels[locale]
  return (
    <SectionShell index="03" kicker={labels.faq.kicker} title={labels.faq.title}>
      <div className="divide-y divide-border">
        {faqItems.map((item, i) => (
          <details key={i} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-balance font-display text-lg font-normal text-foreground marker:hidden">
              {item.q[locale]}
              <span
                aria-hidden
                className="mt-1 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-pretty text-base leading-relaxed text-foreground/70">
              {item.a[locale]}
            </p>
          </details>
        ))}
      </div>
    </SectionShell>
  )
}
