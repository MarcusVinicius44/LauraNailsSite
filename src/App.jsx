import { useState } from 'react'
import './App.css'

const WHATSAPP_LINK = 'https://wa.me/5579998813429'
const INSTAGRAM_LINK = 'https://instagram.com/studiolaurafabiana'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#cuidados', label: 'Cuidados' },
  { href: '#contato', label: 'Contato' },
]

const SERVICE_CATEGORIES = [
  {
    title: 'Alongamento em Gel',
    items: [
      { name: 'Fibra de Vidro', price: 150, maintenance: 100 },
      { name: 'Molde F1', price: 150, maintenance: 100 },
      { name: 'Banho em Gel', price: 100, maintenance: 80 },
    ],
  },
  {
    title: 'Esmaltação em Gel',
    items: [
      { name: 'Mãos', price: 90, maintenance: 90 },
      { name: 'Pés', price: 50, maintenance: 50 },
    ],
  },
  {
    title: 'Manicure & Pedicure',
    items: [
      { name: 'Manicure', price: 35 },
      { name: 'Pedicure', price: 35 },
      { name: 'Combo (mãos + pés)', price: 65 },
      { name: 'Spa dos Pés', price: 70 },
    ],
  },
  {
    title: 'Detalhes & Extras',
    items: [
      { name: 'Remoção de unha', price: 20 },
      { name: 'Reposição de unha', price: 5, unit: 'unidade' },
      { name: 'Baby Boomer', price: 5, unit: 'mão' },
      { name: 'Encapsulado', price: 5, unit: 'mão' },
      { name: 'Decoração 3D', price: 5, unit: 'mão' },
    ],
  },
]

const CARE_INFO = [
  {
    title: 'Alongamento',
    text: 'O procedimento dura em torno de 1h30 a 2h, dependendo da técnica escolhida e do estado atual da sua unha.',
  },
  {
    title: 'Remoção',
    text: 'A remoção leva em torno de 30 minutos a 1h30 para ser realizada com todo o cuidado.',
  },
  {
    title: 'Atendimento personalizado',
    text: 'Cada cliente é única. Eu te ajudo a escolher a técnica ideal para o seu estilo e rotina.',
  },
  {
    title: 'Pontualidade',
    text: 'Se programe para não se atrasar — a tolerância é de 15 minutos, para não prejudicar a próxima cliente.',
  },
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
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M10 175C45 155 50 115 80 120 110 125 95 175 140 165 175 157 165 110 196 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
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

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-name">Laura Fabiana</span>
          <span className="brand-tagline">Nail Designer</span>
        </a>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
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

      <main id="top">
        <section className="hero">
          <Squiggle className="hero-squiggle hero-squiggle--top" />
          <Squiggle className="hero-squiggle hero-squiggle--bottom" />
          <p className="eyebrow">Studio Laura Fabiana</p>
          <h1>
            Unhas lindas, <em>cuidado de verdade</em>
          </h1>
          <p className="hero-lead">
            Especialista em unhas em gel desde 2021. Atendimento personalizado,
            acolhedor e pensado para realçar a sua beleza e autoestima.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              Agendar no WhatsApp
            </a>
            <a className="btn btn-ghost" href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
              @studiolaurafabiana
            </a>
          </div>
        </section>

        <section id="sobre" className="about">
          <div className="about-portrait">
            <span><img src="src/assets/LFimg.png" alt="Laura Fabiana" /></span>
          </div>
          <div className="about-content">
            <p className="eyebrow">Quem sou eu?</p>
            <h2>Laura Fabiana</h2>
            <p>
              Sou especialista em unhas em gel desde 2021. Natural do interior
              da Paraíba, trago comigo o carinho, o cuidado e a dedicação
              típicos de quem ama o que faz.
            </p>
            <p>
              Ao longo dos anos, fui aperfeiçoando minhas técnicas para
              oferecer às minhas clientes não só unhas lindas e duradouras,
              mas também uma experiência acolhedora e personalizada.
            </p>
            <p>
              Cada atendimento é único e pensado com muito carinho, porque
              acredito que beleza também é sobre autoestima e bem-estar.
            </p>
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
                        {item.unit ? <span className="service-unit"> / {item.unit}</span> : null}
                      </div>
                      <div className="service-prices">
                        <span className="service-price">{formatPrice(item.price)}</span>
                        {item.maintenance ? (
                          <span className="service-maintenance">
                            manutenção {formatPrice(item.maintenance)}
                          </span>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="cuidados" className="care">
          <Squiggle className="care-squiggle" />
          <p className="eyebrow eyebrow-center">Sobre os procedimentos</p>
          <h2 className="section-title">Boas práticas para o seu atendimento</h2>
          <div className="care-grid">
            {CARE_INFO.map((item) => (
              <div className="care-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
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
          <h2>Vamos agendar o seu horário?</h2>
          <p>
            Fale comigo pelo WhatsApp ou acompanhe meu trabalho no Instagram.
          </p>
          <div className="contact-actions">
            <a className="btn btn-light" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              (79) 9 9881-3429
            </a>
            <a className="btn btn-outline-light" href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
              @studiolaurafabiana
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Studio Laura Fabiana &middot; Unhas em Gel</p>
        <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
      </footer>
    </>
  )
}

export default App
