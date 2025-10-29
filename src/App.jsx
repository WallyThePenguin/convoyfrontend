import './App.css'

const withBase = (path) => new URL(path, import.meta.env.BASE_URL).href

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

const metrics = [
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
  const heroGallerySources = heroGalleryImages.map((item) => ({
    ...item,
    src: withBase(item.path),
  }))
  const heroBackgroundImage = heroGallerySources[0].src

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
          <a className="button button--ghost" href="#palette">
            View design palette
          </a>
        </div>
        <div className="metrics">
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
        <a className="button button--primary" href="mailto:team@convoy.app">
          Join the build crew
        </a>
      </footer>
    </div>
  )
}

export default App
