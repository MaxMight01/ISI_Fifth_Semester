export type Subject = {
  code: string
  name: string
  /** Path to the compiled PDF, relative to the site base (see vite.config.ts). */
  pdf: string
  /** The subject's pastel from public/pastel.sty, matching its LaTeX title page. */
  color: string
  /** Attended in week one, then dropped. Moves the subject to the Defunct section. */
  defunct?: boolean
}

// Colors mirror the per-subject pastels in public/pastel.sty.
export const subjects: Subject[] = [
  {
    code: 'ANT',
    name: 'Algebraic Number Theory',
    pdf: 'subjects/Algebraic_Number_Theory/ant.pdf',
    color: '#D8C3E8',
  },
  {
    code: 'CA',
    name: 'Commutative Algebra',
    pdf: 'subjects/Commutative_Algebra/comm_alg.pdf',
    color: '#F2D2B6',
  },
  {
    code: 'DAA',
    name: 'Design and Analysis of Algorithms',
    pdf: 'subjects/Design_and_Analysis_of_Algorithms/daa.pdf',
    color: '#F7D6A3',
  },
  {
    code: 'DG',
    name: 'Differential Geometry and Lie Groups',
    pdf: 'subjects/Differential_Geometry_and_Lie_Groups/diff_geo.pdf',
    color: '#F6C8D8',
  },
  {
    code: 'FGT',
    name: 'Field and Galois Theory',
    pdf: 'subjects/Field_and_Galois_Theory/fgt.pdf',
    color: '#BFD8B8',
  },
  {
    code: 'FS',
    name: 'Function Spaces',
    pdf: 'subjects/Function_Spaces/fs.pdf',
    color: '#E6D4F5',
  },
  {
    code: 'GR',
    name: 'General Relativity',
    pdf: 'subjects/General_Relativity/gr.pdf',
    color: '#C9C6F2',
  },
  {
    code: 'SP',
    name: 'Introduction to Stochastic Processes',
    pdf: 'subjects/Introduction_to_Stochastic_Processes/stoch_pro.pdf',
    color: '#BCE7E3',
  },
  {
    code: 'PIII',
    name: 'Probability III',
    pdf: 'subjects/Probability_III/prob_III.pdf',
    color: '#AFCFEA',
  },
  {
    code: 'RT',
    name: 'Representation Theory of Finite Groups',
    pdf: 'subjects/Representation_Theory_of_Finite_Groups/rep.pdf',
    color: '#D7E8B2',
  },
]
