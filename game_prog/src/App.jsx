import React, { useState } from "react";


// NAVBAR

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <header className="header">

      <nav className="navbar">

        <a href="#home" className="logo">
          GameProg
        </a>

        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>

          <li>
            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
          </li>

          <li>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How It Works
            </a>
          </li>

          <li>
            <a href="/login.html">
              Login
            </a>
          </li>

          <li>
            <a href="/login.html?mode=signup" className="nav-button">
              Get Started
            </a>
          </li>

        </ul>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </nav>

    </header>

  );

}


// HERO

function Hero() {

  return (

    <section className="hero" id="home">

      <div className="hero-text">

        <p className="eyebrow">
          Your personal gaming library
        </p>

        <h1>
          More playing.
          <span> Less losing track.</span>
        </h1>

        <p className="hero-description">

          Organise your gaming backlog, keep track of your progress
          and remember every game you've completed.

        </p>

        <div className="hero-actions">

          <a href="/login.html?mode=signup" className="primary-button">
            Get Started for Free
          </a>

          <a href="#features" className="secondary-button">
            Learn More
          </a>

        </div>

        <p className="hero-note">
          Free to use. Your games, your progress.
        </p>

      </div>

    </section>

  );

}


// EXAMPLE GAME DATA

const exampleGames = [

  {
    id: 1,
    name: "Elden Ring",
    status: "Completed",
    statusClass: "completed",
    rating: "★★★★★",
    icon: "⚔️",
    theme: "elden-ring"
  },

  {
    id: 2,
    name: "Cyberpunk 2077",
    status: "Playing",
    statusClass: "playing",
    icon: "🌃",
    theme: "cyberpunk"
  },

  {
    id: 3,
    name: "Sekiro",
    status: "Want to Play",
    statusClass: "want-to-play",
    icon: "🗡️",
    theme: "sekiro"
  }

];


// PREVIEW GAME CARD

function GameCard({ game }) {

  return (

    <article className="preview-card">

      <div className={`game-image ${game.theme}`}>

        <span>{game.icon}</span>

      </div>

      <div className="game-content">

        <span className={`game-status ${game.statusClass}`}>

          {game.status}

        </span>

        <h3>{game.name}</h3>

        {game.rating && (

          <p className="rating">
            {game.rating}
          </p>

        )}

      </div>

    </article>

  );

}


// DASHBOARD PREVIEW

function GamePreview() {

  return (

    <section className="preview-section">

      <div className="dashboard-preview">

        <div className="preview-header">

          <div>

            <p className="preview-label">
              DASHBOARD PREVIEW
            </p>

            <h2>My Games</h2>

          </div>

          <span className="preview-count">
            3 Games
          </span>

        </div>

        <div className="game-grid">

          {exampleGames.map((game) => (

            <GameCard
              key={game.id}
              game={game}
            />

          ))}

        </div>

      </div>

    </section>

  );

}


// FEATURES

const features = [

  {
    icon: "🎮",
    title: "Organise Your Games",
    description:
      "Keep all the games you want to play, are currently playing and have completed in one place."
  },

  {
    icon: "📊",
    title: "Track Your Progress",
    description:
      "Update your game status as you play and easily filter your personal gaming library."
  },

  {
    icon: "⭐",
    title: "Rate Your Favourites",
    description:
      "Give completed games a rating and leave personal notes about your experience."
  },

  {
    icon: "🔍",
    title: "Find Games Easily",
    description:
      "Filter your collection by status without having to search through your entire backlog."
  },

  {
    icon: "☁️",
    title: "Cloud Storage",
    description:
      "Your game library is saved online so you can access it whenever you sign in."
  },

  {
    icon: "🔒",
    title: "Your Personal Library",
    description:
      "Create your own account and keep your game collection separate from other users."
  }

];


function FeatureCard({ feature }) {

  return (

    <article className="feature-card">

      <div className="feature-icon">
        {feature.icon}
      </div>

      <h3>{feature.title}</h3>

      <p>{feature.description}</p>

    </article>

  );

}


function Features() {

  return (

    <section className="features" id="features">

      <div className="section-heading">

        <p className="eyebrow">
          Features
        </p>

        <h2>
          Your entire backlog. One place.
        </h2>

        <p>

          Everything you need to keep your gaming library organised,
          without unnecessary complexity.

        </p>

      </div>

      <div className="feature-grid">

        {features.map((feature) => (

          <FeatureCard
            key={feature.title}
            feature={feature}
          />

        ))}

      </div>

    </section>

  );

}


// HOW IT WORKS

function HowItWorks() {

  return (

    <section className="how-it-works" id="how-it-works">

      <div className="section-heading">

        <p className="eyebrow">
          Getting Started
        </p>

        <h2>
          Simple from the start.
        </h2>

      </div>

      <div className="steps-grid">

        <div className="step">

          <span className="step-number">1</span>

          <h3>Create an Account</h3>

          <p>
            Sign up for free and get access to your own game library.
          </p>

        </div>

        <div className="step">

          <span className="step-number">2</span>

          <h3>Add Your Games</h3>

          <p>
            Add games to your collection and choose their current status.
          </p>

        </div>

        <div className="step">

          <span className="step-number">3</span>

          <h3>Track Your Progress</h3>

          <p>
            Update, complete and rate games as you work through your backlog.
          </p>

        </div>

      </div>

    </section>

  );

}


// CALL TO ACTION

function CallToAction() {

  return (

    <section className="call-to-action">

      <h2>
        Ready to organise your backlog?
      </h2>

      <p>
        Start building your personal gaming library today.
      </p>

      <a href="/login.html?mode=signup" className="primary-button">
        Create Your Free Account
      </a>

    </section>

  );

}


// FOOTER

function Footer() {

  return (

    <footer className="footer">

      <div>

        <a href="#home" className="logo">
          GameProg
        </a>

        <p>
          Your games. Your progress.
        </p>

      </div>

      <div className="footer-links">

        <a href="#features">Features</a>

        <a href="#how-it-works">How It Works</a>

        <a href="/login.html">Login</a>

      </div>

      <p>
        &copy; {new Date().getFullYear()} GameProg.
      </p>

    </footer>

  );

}


// MAIN APPLICATION

export default function App() {

  return (

    <>

      <Navbar />

      <main>

        <Hero />

        <GamePreview />

        <Features />

        <HowItWorks />

        <CallToAction />

      </main>

      <Footer />

    </>

  );

}