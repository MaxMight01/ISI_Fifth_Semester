// Weekly timetable — B.Math (Hons.) III, Semester I, 2026–2027.

export const timeSlots = [
  '08:55–09:55',
  '09:55–10:55',
  '11:10–12:10',
  '12:10–01:10',
  '02:00–03:00',
  '03:10–04:10',
  '04:10–05:10',
  '05:10–06:10',
]

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

// One row per time slot, one entry per weekday. Each cell is either a subject
// code (see subjects.ts), two codes joined by '/' for concurrent electives, a
// plain label (colloquia), or null for a free slot.
export const timetable: (string | null)[][] = [
  ['CA', 'FGT', 'CA', 'FGT', 'DAA'],
  ['ANT', 'FGT', 'CA', 'FGT', 'DAA'],
  ['ANT', 'PIII/GR', 'ANT', 'FS/GR', 'DAA'],
  ['DG', 'PIII/GR', 'DG', 'FS/GR', 'DAA'],
  ['DG', 'CA', 'SP', 'ANT', 'DG'],
  ['FS', 'Student Colloquium', 'SP', 'Department Colloquium', 'PIII'],
  ['FS', 'RT', 'SP', 'RT', 'PIII'],
  [null, 'RT', 'SP', 'RT', null],
]

export const CLASS_TEACHER = 'Maneesh Thakur'
export const ROOM_NOTE =
  'General Relativity meets in G23; all other classes in G26.'
