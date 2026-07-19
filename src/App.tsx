import { useEffect, useState } from 'react'
import './App.css'
import { subjects, type Subject } from './subjects'

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

function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <a className="card" href={`#${subject.code}`}>
      <span className="badge" style={{ backgroundColor: subject.color }}>
        {subject.code}
      </span>
      <span className="card-name">{subject.name}</span>
      <span className="card-link">View Notes →</span>
    </a>
  )
}

function Reader({ subject }: { subject: Subject }) {
  return (
    <div className="reader">
      <div className="reader-bar">
        <a className="home" href="#">
          ← Home
        </a>
        <span className="reader-title">
          <span className="badge" style={{ backgroundColor: subject.color }}>
            {subject.code}
          </span>
          {subject.name}
        </span>
        <a className="reader-open" href={subject.pdf} target="_blank" rel="noreferrer">
          Open PDF ↗
        </a>
      </div>
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
      <header className="hero">
        <p className="eyebrow">ISI Bangalore — B.Math (Hons.)</p>
        <h1>Fifth Semester</h1>
        <p className="tagline">
          Lecture notes from the fifth semester, academic year 2026–2027.
        </p>
        <ul className="stats">
          <li>
            <strong>{primary.length}</strong>
            <span>Subjects</span>
          </li>
          <li>
            <strong>∞</strong>
            <span>Theorems</span>
          </li>
          <li>
            <strong>1</strong>
            <span>Semester</span>
          </li>
        </ul>
      </header>

      <main>
        <section>
          <h2>Course Notes</h2>
          <p className="section-note">
            Select a subject to read the complete lecture notes.
          </p>
          <div className="grid">
            {primary.map((s) => (
              <SubjectCard key={s.code} subject={s} />
            ))}
          </div>
        </section>

        <section>
          <h2>Defunct</h2>
          <p className="section-note">
            Notes no longer being maintained, kept here for reference.
          </p>
          {defunct.length > 0 ? (
            <div className="grid">
              {defunct.map((s) => (
                <SubjectCard key={s.code} subject={s} />
              ))}
            </div>
          ) : (
            <p className="empty">Currently empty.</p>
          )}
        </section>

        <section>
          <h2>About These Notes</h2>
          <p className="prose">
            Compiled during the fifth semester of B.Math (Hons.) at the Indian
            Statistical Institute, Bangalore. They are meant to serve as a study
            aid and reference, and are typeset in LaTeX from the sources in this
            repository.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
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
        </section>
      </main>

      <footer>Built with &lt;3 using React and LaTeX — MaxMight01</footer>
    </>
  )
}

function App() {
  const code = useHashCode()
  const subject = subjects.find((s) => s.code === code)
  return subject ? <Reader subject={subject} /> : <Home />
}

export default App
