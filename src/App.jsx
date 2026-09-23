import { useEffect, useState } from 'react'
import './App.css'
import lauraPhoto from './assets/laura.jpg'

const WHATSAPP_LINK = 'https://wa.me/5579998813429?text=Ol%C3%A1%20Laura!!%20Vim%20pelo%20Site%20e%20quero%20agendar'
const INSTAGRAM_LINK = 'https://instagram.com/laurafabiananail__'
const ADDRESS_STREET = 'Rua Rio Grande do Sul, 1051'
const ADDRESS_CITY = 'Novo Paraíso, Aracaju - SE'
const ADDRESS_QUERY = encodeURIComponent('Rua Rio Grande do Sul, 1051 - Novo Paraíso, Aracaju - SE, 49082-000')
const MAP_EMBED_URL = `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
]

const SERVICE_CATEGORIES = [
  {
    title: 'Alongamentos',
    items: [
      { name: 'Fibra de Vidro', price: 150 },
      { name: 'Manutenção de Fibra de Vidro', price: 130 },
      { name: 'Molde F1', price: 140 },
      { name: 'Molde Russo', price: 140 },
      { name: 'Manutenção de Molde F1 / Russo', price: 120 },
    ],
  },
  {
    title: 'Banho de Gel',
    items: [
      { name: 'Aplicação do Banho de Gel', price: 110 },
      { name: 'Manutenção do Banho de Gel', price: 90 },
    ],
  },
  {
    title: 'Esmaltação em Gel',
    items: [
      { name: 'Mãos', price: 75, note: 'serviço individual, sem manutenção' },
      { name: 'Pés', price: 50 },
    ],
  },
  {
    title: 'Remoção',
    items: [
      {
        name: 'Remoção de Gel',
        price: 50,
        note: 'retirada do material, cutilagem e cuidados pós-remoção',
      },
    ],
  },
]

const DECOR_INFO = [
  {
    title: 'Decoração Simples',
    text: 'Já inclusa em todos os serviços de alongamento e esmaltação.',
  },
  {
    title: 'Decoração Especial',
    text: 'Encapsulada, Nail Art 3D e outras artes exclusivas — valor adicional sob consulta, de acordo com a arte escolhida.',
  },
]

const ABOUT_TEXT = [
  'Natural do interior da Paraíba e com o coração acolhido por Aracaju, transformo o cuidado com as unhas em uma experiência única de autoestima e sofisticação.',
  'Em 2021, dei início à minha jornada como Nail Designer, movida pela paixão e pelo compromisso com a excelência. Sou especialista em fibra de vidro realista, além de dominar as técnicas de alongamento nos moldes F1 e Russo, e a criação de nail arts exclusivas.',
  'Acredito que cada cliente é única. Por isso, meu atendimento é totalmente personalizado, aliando técnica avançada, saúde para as unhas e uma estética natural e elegante para destacar o melhor de cada pessoa.',
]

const PAYMENT_METHODS = [
  {
    label: 'Dinheiro',
    icon: (
      <path d="M3 7h18v10H3V7Zm9 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2ZM5 9v.01M19 15v.01" />
    ),
  },
  {
    label: 'Pix',
    icon: (
      <path d="m12 3 4.5 4.5L12 12l-4.5-4.5L12 3Zm0 9 4.5 4.5L12 21l-4.5-4.5L12 12Zm-9 0 4.5-4.5L12 12l-4.5 4.5L3 12Zm18 0-4.5-4.5L12 12l4.5 4.5L21 12Z" />
    ),
  },
  {
    label: 'Cartão',
    icon: (
      <path d="M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm-1 4h20M6 15h4" />
    ),
  },
]

const galleryModules = import.meta.glob('./assets/servicos/*.jpg', {
  eager: true,
  import: 'default',
})
const GALLERY_IMAGES = Object.keys(galleryModules)
  .sort()
  .map((key) => galleryModules[key])

const GALLERY_PREVIEW_COUNT = 8

function formatPrice(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function Squiggle({ className }) {
  return (
    <svg
      className={`squiggle ${className ?? ''}`}
      viewBox="0 0 200 200"
      role="presentation"
      aria-hidden="true"
    >
      <path
        d="M2 140C30 100 20 40 55 25 90 10 95 70 130 75 165 80 150 20 198 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 175C45 155 50 115 80 120 110 125 95 175 140 165 175 157 165 110 196 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}

function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  const visibleImages = showAllPhotos
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.slice(0, GALLERY_PREVIEW_COUNT)
  const hiddenCount = GALLERY_IMAGES.length - GALLERY_PREVIEW_COUNT

  const isLightboxOpen = lightboxIndex !== null
  const showPrev = () =>
    setLightboxIndex((index) => (index - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  const showNext = () =>
    setLightboxIndex((index) => (index + 1) % GALLERY_IMAGES.length)

  useEffect(() => {
    if (!isLightboxOpen) return
    function handleKeyDown(event) {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-name">Laura Nails</span>
          <span className="brand-tagline">Nail Designer</span>
        </a>

        <nav className="main-nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="nav-cta" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
            Agendar
          </a>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          className="nav-cta"
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Agendar
        </a>
      </div>

      <main id="top">
        <section className="hero">
          <Squiggle className="hero-squiggle hero-squiggle--top" />
          <Squiggle className="hero-squiggle hero-squiggle--bottom" />
          <p className="eyebrow">Laura Nails &middot; Aracaju</p>
          <h1>
            Unhas em gel com <em>técnica e sofisticação</em>
          </h1>
          <p className="hero-lead">
            Alongamento, banho de gel, esmaltação e nail art. Cada
            atendimento é pensado para valorizar suas mãos com elegância e
            cuidado de verdade.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              Agendar no WhatsApp
            </a>
            <a className="btn btn-ghost" href="#servicos">
              Ver valores
            </a>
          </div>
        </section>

        <section id="sobre" className="about">
          <div className="about-portrait">
            <img src={lauraPhoto} alt="Laura Fabiana, nail designer" />
          </div>
          <div className="about-content">
            <p className="eyebrow">Quem sou eu?</p>
            <h2>Laura Fabiana</h2>
            {ABOUT_TEXT.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="about-signoff">
              Seja bem-vinda ao meu studio. Vai ser um prazer cuidar de você!
            </p>
          </div>
        </section>

        <section id="servicos" className="services">
          <p className="eyebrow eyebrow-center">Técnicas &amp; valores</p>
          <h2 className="section-title">Serviços</h2>
          <div className="service-grid">
            {SERVICE_CATEGORIES.map((category) => (
              <div className="service-card" key={category.title}>
                <h3>{category.title}</h3>
                <ul>
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <div className="service-name">
                        {item.name}
                        {item.note ? <span className="service-note">{item.note}</span> : null}
                      </div>
                      <div className="service-prices">
                        <span className="service-price">{formatPrice(item.price)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="decor-grid">
            {DECOR_INFO.map((item) => (
              <div className="decor-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <p className="services-footnote">
            <Icon>
              <path d="M20 6 9 17l-5-5" />
            </Icon>
            Todos os serviços incluem cutilagem e cuidados pós-atendimento.
          </p>
        </section>

        <section id="galeria" className="gallery">
          <p className="eyebrow eyebrow-center">Meu trabalho</p>
          <h2 className="section-title">Galeria</h2>
          <p className="gallery-lead">Clique em uma foto para ver em destaque</p>
          <div className="gallery-grid">
            {visibleImages.map((src, index) => (
              <button
                type="button"
                className="gallery-item"
                key={src}
                onClick={() => setLightboxIndex(index)}
              >
                <img src={src} alt={`Trabalho de unhas ${index + 1}`} loading="lazy" />
                <span className="gallery-overlay">
                  <Icon>
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
                  </Icon>
                </span>
              </button>
            ))}
          </div>

          {hiddenCount > 0 ? (
            <button
              type="button"
              className="gallery-toggle"
              onClick={() => setShowAllPhotos((show) => !show)}
            >
              {showAllPhotos ? (
                'Ver menos'
              ) : (
                <>Ver mais fotos ({hiddenCount})</>
              )}
              <Icon>
                <path d={showAllPhotos ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'} />
              </Icon>
            </button>
          ) : null}
        </section>

        <section id="endereco" className="address">
          <div className="address-inner">
            <p className="eyebrow">Endereço</p>
            <h2 className="address-title">Venha me visitar</h2>
            <div className="address-content">
              <div className="address-map">
                <iframe
                  title="Mapa com a localização do Laura Nails"
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="address-info">
                <div className="address-item">
                  <span className="address-icon">
                    <Icon>
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </Icon>
                  </span>
                  <div>
                    <h3>Endereço</h3>
                    <p>{ADDRESS_STREET}</p>
                    <p>{ADDRESS_CITY}</p>
                  </div>
                </div>
                <div className="address-item">
                  <span className="address-icon">
                    <Icon>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                    </Icon>
                  </span>
                  <div>
                    <h3>WhatsApp</h3>
                    <p>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                        (79) 99881-3429
                      </a>
                    </p>
                  </div>
                </div>
                <div className="address-item">
                  <span className="address-icon">
                    <Icon>
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <path d="M17.5 6.5h.01" />
                    </Icon>
                  </span>
                  <div>
                    <h3>Instagram</h3>
                    <p>
                      <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
                        @laurafabiananail__
                      </a>
                    </p>
                  </div>
                </div>
                <a className="btn btn-primary address-cta" href={MAP_LINK} target="_blank" rel="noreferrer">
                  Como chegar
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="payment">
                  <p className="eyebrow eyebrow-center">Formas de pagamento</p>
                  <div className="payment-list">
                    {PAYMENT_METHODS.map((method) => (
                      <div className="payment-item" key={method.label}>
                        <Icon>{method.icon}</Icon>
                        <span>{method.label}</span>
                      </div>
                    ))}
                  </div>
          </section>

        <section id="contato" className="contact">
          <Squiggle className="contact-squiggle" />
          <h2>Vamos agendar o seu horário?</h2>
          <p>
            Fale comigo pelo WhatsApp ou acompanhe meu trabalho no Instagram.
          </p>
          <div className="contact-actions">
            <a className="btn btn-light" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              Chamar no WhatsApp
            </a>
            <a className="btn btn-outline-light" href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
              @laurafabiananail__
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Laura Nails &middot; Unhas em Gel</p>
        <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
      </footer>

      {isLightboxOpen ? (
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <button
            type="button"
            className="lightbox-close"
            aria-label="Fechar imagem"
            onClick={() => setLightboxIndex(null)}
          >
            ×
          </button>

          <button
            type="button"
            className="lightbox-arrow lightbox-arrow--prev"
            aria-label="Foto anterior"
            onClick={(event) => {
              event.stopPropagation()
              showPrev()
            }}
          >
            <Icon>
              <path d="m15 18-6-6 6-6" />
            </Icon>
          </button>

          <img
            src={GALLERY_IMAGES[lightboxIndex]}
            alt="Trabalho de unhas em destaque"
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            className="lightbox-arrow lightbox-arrow--next"
            aria-label="Próxima foto"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
          >
            <Icon>
              <path d="m9 6 6 6-6 6" />
            </Icon>
          </button>

          <span className="lightbox-counter">
            {lightboxIndex + 1} / {GALLERY_IMAGES.length}
          </span>
        </div>
      ) : null}
    </>
  )
}

export default App
