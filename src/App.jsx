import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

const withBase = (path) => {
  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  return `${normalizedBase}/${normalizedPath}`
}

const heroGalleryImages = [
  {
    path: 'images/convoy-hero-01.png',
    alt: 'Night convoy overlooking the city skyline',
  },
  {
    path: 'images/convoy-hero-02.png',
    alt: 'Drivers lining up at a car meet',
  },
  {
    path: 'images/convoy-hero-03.png',
    alt: 'Convoy cars cruising through neon-lit streets',
  },
]

const baseMetrics = [
  { label: 'Target private beta convoys per day', value: '5+' },
  { label: 'Latency budget for live updates', value: '< 1s' },
  { label: 'Elite tier conversion goal', value: '3%' },
]

const experiencePillars = [
  {
    title: 'Live Map + Convoys',
    description:
      'Road-snapped vehicle icons, convoy invites, and live telemetry keep friends together even on unfamiliar routes.',
  },
  {
    title: 'In-Car Dashboards',
    description:
      'Native CarPlay and Android Auto views deliver turn-by-turn cues, convoy status, and push-to-talk voice without distraction.',
  },
  {
    title: 'Community & Routes',
    description:
      'Crowd-curated meetups, scenic drives, and creator routes are moderated for safety and quality before they go live.',
  },
  {
    title: 'Privacy First',
    description:
      'Ghost mode timers, location fuzzing, and private zones give drivers control while emergency overrides protect crews.',
  },
]

const tiers = [
  {
    name: 'Free',
    price: '$0',
    blurb: 'Join convoys, earn XP, and explore community events.',
    items: ['1 active convoy slot', 'Basic analytics', 'Ads supported'],
  },
  {
    name: 'Pro',
    price: '$6.99',
    blurb: 'Unlock enthusiast tools, personal analytics, and customization.',
    items: [
      'Full driver analytics and heatmaps',
      'Custom icons, trails, and banners',
      'Ad-free experience with offline logs',
    ],
  },
  {
    name: 'Elite',
    price: '$14.99',
    blurb: 'Built for crews and hosts running premium events.',
    items: [
      'Manage up to 10 convoys with co-hosts',
      'Advanced crew analytics dashboard',
      'Replay mode, expanded voice, early-access betas',
    ],
  },
]

const palette = [
  {
    role: 'Primary',
    name: 'Convoy Orange',
    hex: '#EB5A2D',
    description: 'Primary actions, hero CTAs, and map trails.',
  },
  {
    role: 'Secondary',
    name: 'Neon Violet',
    hex: '#A13BF1',
    description: 'Hover states, gradients, and voice indicators.',
  },
  {
    role: 'Background (Dark)',
    name: 'Midnight Asphalt',
    hex: '#0F0C1A',
    description: 'Hero backdrop and dashboard canvas.',
  },
  {
    role: 'Background (Light)',
    name: 'Twilight Surface',
    hex: '#1E1B2E',
    description: 'Cards, secondary panels, and overlays.',
  },
  {
    role: 'Accent Glow',
    name: 'Route Glow',
    hex: '#FF9C00',
    description: 'Live telemetry pulses and highlight glows.',
  },
  {
    role: 'Success / Active',
    name: 'Live Signal Green',
    hex: '#00E28A',
    description: 'Active voice and online convoy states.',
  },
]

const gradients = [
  {
    name: 'Sunset Route',
    css: 'linear-gradient(135deg, #EB5A2D 0%, #A13BF1 100%)',
  },
  {
    name: 'Twilight Drive',
    css: 'linear-gradient(180deg, #1E1B2E 0%, #0F0C1A 100%)',
  },
  {
    name: 'Convoy Glow',
    css: 'linear-gradient(90deg, #FF9C00 0%, #EB5A2D 40%, #A13BF1 100%)',
  },
]

const roadmap = [
  {
    phase: 'Now',
    items: [
      'Finalize stack decisions for maps, telemetry, and voice',
      'Prototype privacy flows and CarPlay dashboards',
      'Stand up advertiser onboarding wireframes',
    ],
  },
  {
    phase: 'Next',
    items: [
      'Ship real-time telemetry service with crew subscriptions',
      'Launch closed beta with curated route submissions',
      'Instrument analytics pipeline for XP, tiers, and ad conversions',
    ],
  },
  {
    phase: 'Later',
    items: [
      'Expand AR encounters and convoy replays',
      'Roll out crew wallets and sponsor integrations',
      'Open self-serve advertiser portal to priority cities',
    ],
  },
]

const usageTips = [
  'Use Convoy Orange for hero buttons and map highlights.',
  'Layer Midnight Asphalt backgrounds with Twilight Surface cards for depth.',
  'Add subtle Route Glow or Neon Violet blurs to reinforce energy.',
  'Maintain a 4.5:1 contrast ratio for text on dark surfaces.',
]

function App() {
  const [newsletterForm, setNewsletterForm] = useState({
    name: '',
    email: '',
    source: 'website',
  })
  const [newsletterStatus, setNewsletterStatus] = useState('idle')
  const [newsletterMessage, setNewsletterMessage] = useState('')
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    roleInterest: '',
    experience: '',
    portfolioUrl: '',
    message: '',
  })
  const [applicationStatus, setApplicationStatus] = useState('idle')
  const [applicationMessage, setApplicationMessage] = useState('')
  const [stats, setStats] = useState(null)
  const [statsStatus, setStatsStatus] = useState('idle')

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }),
    [],
  )

  const loadSummary = useCallback(async () => {
    try {
      setStatsStatus((previous) =>
        previous === 'success' ? 'refreshing' : 'loading',
      )
      const response = await fetch(`${API_BASE_URL}/api/stats/summary`)
      if (!response.ok) {
        throw new Error('Failed to load summary metrics.')
      }
      const payload = await response.json()
      setStats(payload.data ?? null)
      setStatsStatus('success')
    } catch (error) {
      console.error('Failed to load stats summary', error)
      setStatsStatus('error')
    }
  }, [])

  useEffect(() => {
    loadSummary()
  }, [loadSummary])

  const metrics = useMemo(() => {
    const dynamic = []
    if (stats?.newsletter?.total != null) {
      dynamic.push({
        label: 'Convoy insiders on the mailing list',
        value: numberFormatter.format(stats.newsletter.total),
      })
    }
    if (stats?.applications?.total != null) {
      dynamic.push({
        label: 'Team applications received',
        value: numberFormatter.format(stats.applications.total),
      })
    }
    return [...dynamic, ...baseMetrics]
  }, [stats, numberFormatter])

  const newsletterBlurb =
    stats?.newsletter?.total != null
      ? `${numberFormatter.format(
          stats.newsletter.total,
        )} drivers already get the early release notes.`
      : 'Get early access drops and roadmap notes. No spam.'

  const applicationBlurb =
    stats?.applications?.total != null
      ? `We have heard from ${numberFormatter.format(
          stats.applications.total,
        )} builders so far.`
      : 'We review every application weekly.'

  const heroGallerySources = heroGalleryImages.map((item) => ({
    ...item,
    src: withBase(item.path),
  }))
  const heroBackgroundImage = heroGallerySources[0].src

  const handleNewsletterChange = (event) => {
    const { name, value } = event.target
    setNewsletterForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault()
    setNewsletterStatus('loading')
    setNewsletterMessage('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterForm.email,
          name: newsletterForm.name || undefined,
          source: newsletterForm.source,
        }),
      })
      const payload = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(payload?.error?.message || 'Unable to join the list.')
      }
      setNewsletterStatus('success')
      setNewsletterMessage(payload?.data?.message ?? 'Welcome to the crew.')
      setNewsletterForm({ name: '', email: '', source: 'website' })
      loadSummary()
    } catch (error) {
      console.error('Newsletter signup failed', error)
      setNewsletterStatus('error')
      setNewsletterMessage(error.message || 'Something went wrong.')
    }
  }

  const handleApplicationChange = (event) => {
    const { name, value } = event.target
    setApplicationForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleApplicationSubmit = async (event) => {
    event.preventDefault()
    setApplicationStatus('loading')
    setApplicationMessage('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: applicationForm.name,
          email: applicationForm.email,
          roleInterest: applicationForm.roleInterest,
          experience: applicationForm.experience || undefined,
          portfolioUrl: applicationForm.portfolioUrl || undefined,
          message: applicationForm.message,
        }),
      })
      const payload = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(
          payload?.error?.message || 'Unable to submit right now.',
        )
      }
      setApplicationStatus('success')
      setApplicationMessage(
        payload?.data?.message ??
          'Application received. Thanks for reaching out.',
      )
      setApplicationForm({
        name: '',
        email: '',
        roleInterest: '',
        experience: '',
        portfolioUrl: '',
        message: '',
      })
      loadSummary()
    } catch (error) {
      console.error('Application submission failed', error)
      setApplicationStatus('error')
      setApplicationMessage(error.message || 'Something went wrong.')
    }
  }

  return (
    <div className="page" style={{ '--hero-bg-image': `url(${heroBackgroundImage})` }}>
      <header className="hero">
        <div className="hero__badge">Convoy Preview</div>
        <h1 className="hero__title">Drive. Connect. Belong.</h1>
        <p className="hero__subtitle">
          Convoy is the social layer for real-world car culture. Coordinate
          convoys, discover routes, and keep your crew connected from on-ramp to
          afterparty.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#experience">
            Explore the experience
          </a>
          <a className="button button--ghost" href="#team">
            Apply to the team
          </a>
          <a className="button button--ghost" href="#palette">
            View design palette
          </a>
        </div>
        <div className="metrics">
          {(statsStatus === 'loading' || statsStatus === 'refreshing') && (
            <div className="metric metric--status">
              <span className="metric__value">...</span>
              <span className="metric__label">Loading live stats</span>
            </div>
          )}
          {statsStatus === 'error' && (
            <div className="metric metric--status metric--error">
              <span className="metric__value">--</span>
              <span className="metric__label">Live stats unavailable</span>
            </div>
          )}
          {metrics.map((metric) => (
            <div key={metric.label} className="metric">
              <span className="metric__value">{metric.value}</span>
              <span className="metric__label">{metric.label}</span>
            </div>
          ))}
        </div>
        <div className="hero__gallery">
          {heroGallerySources.map(({ path, src, alt }) => (
            <img key={path} src={src} alt={alt} />
          ))}
        </div>
        <form className="inline-form" onSubmit={handleNewsletterSubmit}>
          <div className="inline-form__row">
            <label className="sr-only" htmlFor="newsletter-name">
              Name
            </label>
            <input
              id="newsletter-name"
              name="name"
              type="text"
              placeholder="Name (optional)"
              value={newsletterForm.name}
              onChange={handleNewsletterChange}
              disabled={newsletterStatus === 'loading'}
            />
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={newsletterForm.email}
              onChange={handleNewsletterChange}
              disabled={newsletterStatus === 'loading'}
            />
            <button
              type="submit"
              className="button button--primary"
              disabled={
                newsletterStatus === 'loading' || !newsletterForm.email
              }
            >
              {newsletterStatus === 'loading'
                ? 'Joining...'
                : 'Join the list'}
            </button>
          </div>
          <p className="inline-form__note">{newsletterBlurb}</p>
          {newsletterStatus === 'success' && (
            <p className="form-feedback form-feedback--success" role="status">
              {newsletterMessage}
            </p>
          )}
          {newsletterStatus === 'error' && (
            <p className="form-feedback form-feedback--error" role="alert">
              {newsletterMessage}
            </p>
          )}
        </form>
      </header>

      <main>
        <section id="experience" className="section">
          <h2 className="section__title">Experience pillars</h2>
          <div className="pillars">
            {experiencePillars.map((pillar) => (
              <article key={pillar.title} className="pillar-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--divider">
          <div className="section__grid">
            <div>
              <h2 className="section__title">Privacy-first foundation</h2>
              <p>
                Drivers control when, how, and with whom their location is
                shared. Ghost mode timers, private zones, and location fuzzing
                give flexibility, while emergency overrides and convoy host
                rules keep teams protected.
              </p>
            </div>
            <ul className="plain-list">
              <li>Ghost mode presets: 15 min, 1 hr, until turned off</li>
              <li>Friends-only visibility with 300 m fuzzing for non-friends</li>
              <li>Private zones around home, work, or staging areas</li>
              <li>Safety overrides for convoy hosts and SOS scenarios</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">Subscription tiers</h2>
          <div className="tiers">
            {tiers.map((tier) => (
              <article key={tier.name} className="tier-card">
                <div className="tier-card__header">
                  <h3>{tier.name}</h3>
                  <span className="tier-card__price">{tier.price}/mo</span>
                </div>
                <p className="tier-card__blurb">{tier.blurb}</p>
                <ul className="plain-list plain-list--check">
                  {tier.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--alt">
          <h2 className="section__title">Crew subscriptions</h2>
          <div className="section__grid">
            <p>
              Crew, club, and pro team plans unlock shared hosting, always-on
              voice rooms, and analytics that make organizing meets effortless.
              Leaders can manage billing, assign co-hosts, and unlock custom
              themes that make their brand recognizable on the map.
            </p>
            <ul className="plain-list plain-list--bullet">
              <li>Shared convoy hosting with crew IDs and co-host slots</li>
              <li>Persistent voice and messaging hubs between drives</li>
              <li>Group analytics for attendance, distance, and safety scores</li>
              <li>Seasonal leaderboards and printable recap packs (future)</li>
            </ul>
          </div>
        </section>

        <section id="team" className="section team-section">
          <div className="section__grid">
            <div>
              <h2 className="section__title">Join the build crew</h2>
              <p>
                We are assembling a tight crew of builders to ship the next
                Convoy milestone together. Tell us what you want to own and
                bring your best routes, telemetry tricks, or community ideas.
              </p>
              <p className="team-section__note">{applicationBlurb}</p>
              <ul className="plain-list plain-list--bullet">
                <li>Shape the real-time convoy stack and design systems.</li>
                <li>Host early rides, gather feedback, and build community.</li>
                <li>Ship alongside a small, focused squad of enthusiasts.</li>
              </ul>
            </div>
            <form className="application-form" onSubmit={handleApplicationSubmit}>
              <div className="application-form__grid">
                <div className="form-field">
                  <label htmlFor="application-name">Full name</label>
                  <input
                    id="application-name"
                    name="name"
                    type="text"
                    placeholder="Jordan Rivera"
                    value={applicationForm.name}
                    onChange={handleApplicationChange}
                    required
                    disabled={applicationStatus === 'loading'}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="application-email">Email</label>
                  <input
                    id="application-email"
                    name="email"
                    type="email"
                    placeholder="you@convoy.app"
                    value={applicationForm.email}
                    onChange={handleApplicationChange}
                    required
                    disabled={applicationStatus === 'loading'}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="application-role">What do you want to lead?</label>
                  <input
                    id="application-role"
                    name="roleInterest"
                    type="text"
                    placeholder="Example: Mobile, Backend, Community Ops"
                    value={applicationForm.roleInterest}
                    onChange={handleApplicationChange}
                    required
                    disabled={applicationStatus === 'loading'}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="application-portfolio">
                    Portfolio or relevant links <span>(optional)</span>
                  </label>
                  <input
                    id="application-portfolio"
                    name="portfolioUrl"
                    type="url"
                    placeholder="https://"
                    value={applicationForm.portfolioUrl}
                    onChange={handleApplicationChange}
                    disabled={applicationStatus === 'loading'}
                  />
                </div>
                <div className="form-field form-field--full">
                  <label htmlFor="application-experience">
                    Relevant experience <span>(optional)</span>
                  </label>
                  <textarea
                    id="application-experience"
                    name="experience"
                    rows="3"
                    placeholder="Crew leader, telemetry engineer, or live ops wizard? Let us know."
                    value={applicationForm.experience}
                    onChange={handleApplicationChange}
                    disabled={applicationStatus === 'loading'}
                  />
                </div>
                <div className="form-field form-field--full">
                  <label htmlFor="application-message">Why Convoy?</label>
                  <textarea
                    id="application-message"
                    name="message"
                    rows="4"
                    placeholder="Share how you want to push Convoy forward."
                    value={applicationForm.message}
                    onChange={handleApplicationChange}
                    required
                    disabled={applicationStatus === 'loading'}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="button button--primary application-form__submit"
                disabled={
                  applicationStatus === 'loading' ||
                  !applicationForm.name ||
                  !applicationForm.email ||
                  !applicationForm.roleInterest ||
                  !applicationForm.message
                }
              >
                {applicationStatus === 'loading'
                  ? 'Sending...'
                  : 'Submit application'}
              </button>
              <p className="application-form__caption">
                Expect a personal reply within a week. We respect your inbox.
              </p>
              {applicationStatus === 'success' && (
                <p className="form-feedback form-feedback--success" role="status">
                  {applicationMessage}
                </p>
              )}
              {applicationStatus === 'error' && (
                <p className="form-feedback form-feedback--error" role="alert">
                  {applicationMessage}
                </p>
              )}
            </form>
          </div>
        </section>

        <section id="roadmap" className="section">
          <h2 className="section__title">Product roadmap</h2>
          <div className="roadmap">
            {roadmap.map((stage) => (
              <article key={stage.phase} className="roadmap-card">
                <h3>{stage.phase}</h3>
                <ul className="plain-list plain-list--bullet">
                  {stage.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="palette" className="section section--palette">
          <h2 className="section__title">Convoy design palette</h2>
          <div className="palette">
            {palette.map((swatch) => (
              <article key={swatch.role} className="palette-card">
                <div
                  className="palette-card__swatch"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div className="palette-card__meta">
                  <span className="palette-card__role">{swatch.role}</span>
                  <h3>{swatch.name}</h3>
                  <p>{swatch.description}</p>
                  <code>{swatch.hex}</code>
                </div>
              </article>
            ))}
          </div>
          <div className="gradients">
            {gradients.map((gradient) => (
              <div key={gradient.name} className="gradient-card">
                <div
                  className="gradient-card__preview"
                  style={{ backgroundImage: gradient.css }}
                />
                <div>
                  <h3>{gradient.name}</h3>
                  <code>{gradient.css}</code>
                </div>
              </div>
            ))}
          </div>
          <ul className="plain-list plain-list--bullet palette-tips">
            {usageTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">
        <h2>Ready to build Convoy?</h2>
        <p>
          We are drafting architecture, onboarding content, and design systems
          across backend, frontend, and mobile. Tap in if you want to shape the
          next milestone.
        </p>
        <a className="button button--primary" href="#team">
          Submit your application
        </a>
      </footer>
    </div>
  )
}

export default App
