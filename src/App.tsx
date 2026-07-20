import { useEffect, useState } from 'react'
import './App.css'
import { subjects, type Subject } from './subjects'
import {
  CLASS_TEACHER,
  ROOM_NOTE,
  days,
  timeSlots,
  timetable,
} from './schedule'

const PRIMARIES = ['var(--red)', 'var(--blue)', 'var(--yellow)'] as const
const SHAPES = ['circle', 'square', 'triangle'] as const

const byCode = new Map(subjects.map((s) => [s.code, s]))

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const fmtDate = (iso: string) => {
  const [, m, d] = iso.split('-')
  return `${Number(d)} ${MONTHS[Number(m) - 1]}`
}

/** Resolves a PDF path against the site base, so links work under /<repo>/ on Pages. */
const pdfUrl = (subject: Subject) => import.meta.env.BASE_URL + subject.pdf

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

const DROPPED_KEY = 'fifth-sem:not-taking'

/** Set of subject codes the visitor marked "not taking", persisted per device. */
function useNotTaking() {
  const [dropped, setDropped] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(DROPPED_KEY)
      return new Set<string>(raw ? JSON.parse(raw) : [])
    } catch {
      return new Set<string>()
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(DROPPED_KEY, JSON.stringify([...dropped]))
    } catch {
      // Storage unavailable (private mode); the choice simply won't persist.
    }
  }, [dropped])
  const toggle = (code: string) =>
    setDropped((prev) => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  return { dropped, toggle }
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

function SubjectCard({
  subject,
  index,
  dropped,
  onToggle,
}: {
  subject: Subject
  index: number
  dropped: boolean
  onToggle: () => void
}) {
  const shape = SHAPES[index % 3]
  const accent = PRIMARIES[index % 3]
  return (
    <div className={`card${dropped ? ' is-dropped' : ''}`}>
      <a className="card-face" href={`#${subject.code}`}>
        {/* Color block carries the subject's own pastel, as on its LaTeX title page. */}
        <span className="card-band" style={{ background: subject.color }}>
          <span className="card-code">{subject.code}</span>
          <span className={`card-mark ${shape}`} style={{ background: accent }} />
        </span>
        <span className="card-body">
          <span className="card-name">{subject.name}</span>
          <span className="card-inst">{subject.instructor}</span>
          <span className="card-link">View Notes →</span>
        </span>
      </a>
      <button
        type="button"
        className="card-toggle"
        aria-pressed={!dropped}
        title={dropped ? 'Mark as taking' : 'Mark as not taking'}
        onClick={onToggle}
      >
        {dropped ? 'Not taking' : 'Taking'}
      </button>
    </div>
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
          href={pdfUrl(subject)}
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
      <iframe
        className="reader-frame"
        src={pdfUrl(subject)}
        title={subject.name}
      />
    </div>
  )
}

function TimetableCell({
  value,
  dropped,
}: {
  value: string | null
  dropped: Set<string>
}) {
  if (!value) return <td className="tt-empty" aria-label="Free" />
  const parts = value.split('/')
  const known = parts.filter((p) => byCode.has(p))
  if (known.length !== parts.length) {
    // A colloquium or other non-course entry.
    return (
      <td>
        <span className="tt-label">{value}</span>
      </td>
    )
  }
  return (
    <td>
      <span className="tt-classes">
        {known.map((code) => {
          const s = byCode.get(code)!
          return (
            <span
              key={code}
              className={`tt-class${dropped.has(code) ? ' is-dropped' : ''}`}
              style={{ background: s.color }}
              title={s.name}
            >
              {code}
            </span>
          )
        })}
      </span>
    </td>
  )
}

function Home() {
  const { dropped, toggle } = useNotTaking()
  const primary = subjects.filter((s) => !s.defunct)
  const defunct = subjects.filter((s) => s.defunct)
  const examRows = [...subjects].sort(
    (a, b) => a.exams.mid.localeCompare(b.exams.mid) || a.exams.end.localeCompare(b.exams.end),
  )

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
          <span
            key={s.code}
            className={dropped.has(s.code) ? 'is-dropped' : undefined}
            style={{ background: s.color }}
          />
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
            Select a subject to read the complete lecture notes. Use{' '}
            <strong>Taking</strong> to grey out ones you are not enrolled in —
            remembered on this device.
          </p>
          <div className="grid">
            {primary.map((s, i) => (
              <SubjectCard
                key={s.code}
                subject={s}
                index={i}
                dropped={dropped.has(s.code)}
                onToggle={() => toggle(s.code)}
              />
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
                <SubjectCard
                  key={s.code}
                  subject={s}
                  index={i}
                  dropped={dropped.has(s.code)}
                  onToggle={() => toggle(s.code)}
                />
              ))}
            </div>
          ) : (
            <p className="empty">Currently empty.</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <h2>Timetable</h2>
          <p className="section-note">
            Semester I, 2026–2027. Hover a code for the full subject name.
          </p>
          <div className="table-scroll">
            <table className="timetable">
              <thead>
                <tr>
                  <th>Time</th>
                  {days.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.map((row, i) => (
                  <tr key={timeSlots[i]}>
                    <th scope="row" className="tt-time">
                      {timeSlots[i]}
                    </th>
                    {row.map((cell, j) => (
                      <TimetableCell key={j} value={cell} dropped={dropped} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tt-note">
            <strong>Class Teacher:</strong> {CLASS_TEACHER} · {ROOM_NOTE}
          </p>
        </div>
      </section>

      <section className="section exams-section">
        <div className="section-inner">
          <h2>Examinations</h2>
          <p className="section-note">
            Mid- and end-semester dates, with backpapers. All examinations
            in 2026.
          </p>
          <div className="table-scroll">
            <table className="exams">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Mid-Sem</th>
                  <th>End-Sem</th>
                  <th>Backpaper</th>
                  <th>Instructor</th>
                </tr>
              </thead>
              <tbody>
                {examRows.map((s) => (
                  <tr
                    key={s.code}
                    className={dropped.has(s.code) ? 'is-dropped' : undefined}
                  >
                    <td className="exam-subject">
                      <span className="exam-chip" style={{ background: s.color }}>
                        {s.code}
                      </span>
                      <span>{s.name}</span>
                    </td>
                    <td className="exam-date">{fmtDate(s.exams.mid)}</td>
                    <td className="exam-date">{fmtDate(s.exams.end)}</td>
                    <td className="exam-date">{fmtDate(s.exams.back)}</td>
                    <td>{s.instructor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
