export type Subject = {
  code: string
  name: string
  /** Path to the compiled PDF, relative to the site base (see vite.config.ts). */
  pdf: string
  /** The subject's pastel from public/pastel.sty, matching its LaTeX title page. */
  color: string
  /** Course instructor (from the examination schedule). */
  instructor: string
  /** Examination dates, ISO YYYY-MM-DD. back = backpaper. */
  exams: { mid: string; end: string; back: string }
  /** Attended in week one, then dropped. Moves the subject to the Defunct section. */
  defunct?: boolean
}

// Colors mirror the per-subject pastels in public/pastel.sty.
// Instructors and exam dates are from the Semester I 2026–2027 schedule.
export const subjects: Subject[] = [
  {
    code: 'ANT',
    name: 'Algebraic Number Theory',
    pdf: 'subjects/Algebraic_Number_Theory/ant.pdf',
    color: '#D8C3E8',
    instructor: 'Maneesh Thakur',
    exams: { mid: '2026-09-11', end: '2026-11-17', back: '2026-12-28' },
  },
  {
    code: 'CA',
    name: 'Commutative Algebra',
    pdf: 'subjects/Commutative_Algebra/comm_alg.pdf',
    color: '#F2D2B6',
    instructor: 'Manish Kumar',
    exams: { mid: '2026-09-10', end: '2026-11-13', back: '2026-12-24' },
  },
  {
    code: 'DAA',
    name: 'Design and Analysis of Algorithms',
    pdf: 'subjects/Design_and_Analysis_of_Algorithms/daa.pdf',
    color: '#F7D6A3',
    instructor: 'Pradeesha Ashok',
    exams: { mid: '2026-09-07', end: '2026-11-04', back: '2026-12-21' },
  },
  {
    code: 'DG',
    name: 'Differential Geometry and Lie Groups',
    pdf: 'subjects/Differential_Geometry_and_Lie_Groups/diff_geo.pdf',
    color: '#F6C8D8',
    instructor: 'Jishnu Biswas',
    exams: { mid: '2026-09-09', end: '2026-11-10', back: '2026-12-23' },
  },
  {
    code: 'FGT',
    name: 'Field and Galois Theory',
    pdf: 'subjects/Field_and_Galois_Theory/fgt.pdf',
    color: '#BFD8B8',
    instructor: 'Anita Naolekar',
    exams: { mid: '2026-09-08', end: '2026-11-05', back: '2026-12-22' },
  },
  {
    code: 'FS',
    name: 'Function Spaces',
    pdf: 'subjects/Function_Spaces/fs.pdf',
    color: '#E6D4F5',
    instructor: 'Soumyshant Nayak',
    exams: { mid: '2026-09-08', end: '2026-11-06', back: '2026-12-22' },
  },
  {
    code: 'GR',
    name: 'General Relativity',
    pdf: 'subjects/General_Relativity/gr.pdf',
    color: '#C9C6F2',
    instructor: 'Prabuddha Chakraborty',
    exams: { mid: '2026-09-10', end: '2026-11-12', back: '2026-12-24' },
  },
  {
    code: 'SP',
    name: 'Introduction to Stochastic Processes',
    pdf: 'subjects/Introduction_to_Stochastic_Processes/stoch_pro.pdf',
    color: '#BCE7E3',
    instructor: 'Siva Athreya',
    exams: { mid: '2026-09-09', end: '2026-11-11', back: '2026-12-23' },
  },
  {
    code: 'PIII',
    name: 'Probability III',
    pdf: 'subjects/Probability_III/prob_III.pdf',
    color: '#AFCFEA',
    instructor: 'Lakshmi Priya M E',
    exams: { mid: '2026-09-08', end: '2026-11-09', back: '2026-12-22' },
  },
  {
    code: 'RT',
    name: 'Representation Theory of Finite Groups',
    pdf: 'subjects/Representation_Theory_of_Finite_Groups/rep.pdf',
    color: '#D7E8B2',
    instructor: 'Subhajit Jana',
    exams: { mid: '2026-09-10', end: '2026-11-16', back: '2026-12-24' },
  },
]
