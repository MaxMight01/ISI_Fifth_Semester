import { useEffect, useState } from 'react'
import './App.css'
import { subjects, type Subject } from './subjects'

const PRIMARIES = ['var(--red)', 'var(--blue)', 'var(--yellow)'] as const
const SHAPES = ['circle', 'square', 'triangle'] as const

/** Reads the subject code out of the URL hash, e.g. #ANT. */
function useHashCode() {
  const [code, setCode] = useState(() => window.location.hash.slice(1))
  useEffect(() => {
    const onChange = () => setCode(window.location.hash.slice(1))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return code
}

function Logo() {
  return (
    <span className="logo" aria-hidden="true">
      <span className="shape circle" style={{ background: 'var(--red)' }} />
      <span className="shape square" style={{ background: 'var(--blue)' }} />
      <span className="shape triangle" style={{ background: 'var(--yellow)' }} />
    </span>
  )
}

function SubjectCard({ subject, index }: { subject: Subject; index: number }) {
  const shape = SHAPES[index % 3]
  const accent = PRIMARIES[index % 3]
  return (
    <a className="card" href={`#${subject.code}`}>
      {/* Color block carries the subject's own pastel, as on its LaTeX title page. */}
      <span className="card-band" style={{ background: subject.color }}>
        <span className="card-code">{subject.code}</span>
        <span className={`card-mark ${shape}`} style={{ background: accent }} />
      </span>
      <span className="card-body">
        <span className="card-name">{subject.name}</span>
        <span className="card-link">View Notes →</span>
      </span>
    </a>
  )
}

function Reader({ subject }: { subject: Subject }) {
  return (
    <div className="reader">
      <div className="reader-bar">
        <a className="btn" href="#">
          ← Home
        </a>
        <span className="reader-title">
          <span
            className="reader-swatch"
            style={{ background: subject.color }}
            aria-hidden="true"
          />
          <span className="reader-code">{subject.code}</span>
          <span className="reader-name">{subject.name}</span>
        </span>
        <a
          className="btn btn-outline"
          href={subject.pdf}
          target="_blank"
          rel="noreferrer"
        >
          Open PDF ↗
        </a>
      </div>
      <span
        className="reader-accent"
        style={{ background: subject.color }}
        aria-hidden="true"
      />
      {/* The browser's own PDF viewer renders inside this frame. */}
      <iframe className="reader-frame" src={subject.pdf} title={subject.name} />
    </div>
  )
}

function Home() {
  const primary = subjects.filter((s) => !s.defunct)
  const defunct = subjects.filter((s) => s.defunct)

  return (
    <>
      <nav className="nav">
        <Logo />
        <span className="nav-title">Fifth Semester</span>
        <span className="nav-inst">ISI Bangalore</span>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <p className="eyebrow">ISI Bangalore — B.Math (Hons.)</p>
          <h1>
            Fifth
            <br />
            Semester
          </h1>
          <div className="rule" />
          <p className="tagline">
            Lecture notes from the fifth semester, academic year 2026–2027.
          </p>
        </div>
        <div className="hero-panel" aria-hidden="true">
          <span className="comp comp-circle" />
          <span className="comp comp-square" />
          <span className="comp comp-triangle" />
        </div>
      </header>

      {/* Every subject's pastel, in order. */}
      <div className="spectrum" aria-hidden="true">
        {subjects.map((s) => (
          <span key={s.code} style={{ background: s.color }} />
        ))}
      </div>

      <section className="section stats-section">
        <div className="section-inner">
          <ul className="stats">
            <li>
              <span className="stat-mark circle">
                <span>{primary.length}</span>
              </span>
              <span className="stat-label">Subjects</span>
            </li>
            <li>
              <span className="stat-mark">
                <span>∞</span>
              </span>
              <span className="stat-label">Theorems</span>
            </li>
            <li>
              <span className="stat-mark diamond">
                <span>1</span>
              </span>
              <span className="stat-label">Semester</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <h2>Course Notes</h2>
          <p className="section-note">
            Select a subject to read the complete lecture notes.
          </p>
          <div className="grid">
            {primary.map((s, i) => (
              <SubjectCard key={s.code} subject={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section defunct-section">
        <div className="section-inner">
          <h2>Defunct</h2>
          <p className="section-note">
            Notes no longer being maintained, kept here for reference.
          </p>
          {defunct.length > 0 ? (
            <div className="grid">
              {defunct.map((s, i) => (
                <SubjectCard key={s.code} subject={s} index={i} />
              ))}
            </div>
          ) : (
            <p className="empty">Currently empty.</p>
          )}
        </div>
      </section>

      <section className="section about-section">
        <div className="section-inner">
          <h2>About These Notes</h2>
          <p className="prose">
            Compiled during the fifth semester of B.Math (Hons.) at the Indian
            Statistical Institute, Bangalore. They are meant to serve as a study
            aid and reference, and are typeset in LaTeX from the sources in this
            repository.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <h2>Contact</h2>
          <p className="section-note">Reach me at any of the following.</p>
          <ul className="contact">
            <li>
              <span>Personal</span>
              <a href="mailto:ramdassingh399@gmail.com">
                ramdassingh399@gmail.com
              </a>
            </li>
            <li>
              <span>Institute</span>
              <a href="mailto:bmat2423@isibang.ac.in">bmat2423@isibang.ac.in</a>
            </li>
            <li>
              <span>GitHub</span>
              <a href="https://github.com/MaxMight01">MaxMight01</a>
            </li>
            <li>
              <span>LinkedIn</span>
              <a href="https://www.linkedin.com/in/ramdas-max-singh/">
                Ramdas 'Max' Singh
              </a>
            </li>
          </ul>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <Logo />
          <span>Built with &lt;3 using React and LaTeX</span>
          <span style={{ marginLeft: 'auto' }}>MaxMight01</span>
        </div>
      </footer>
    </>
  )
}

function App() {
  const code = useHashCode()
  const subject = subjects.find((s) => s.code === code)
  return subject ? <Reader subject={subject} /> : <Home />
}

export default App
