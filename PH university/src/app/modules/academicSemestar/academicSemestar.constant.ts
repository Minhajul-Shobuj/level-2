import {
  TMonth,
  TAcademicSemestarCode,
  TAcademicSemestarName,
  TAcademicSemestarNameMapper,
} from './academicSemestar.interface'

export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const SemesterCode: TAcademicSemestarCode[] = ['01', '02', '03']
export const SemesterName: TAcademicSemestarName[] = [
  'Autumn',
  'Summer',
  'Fall',
]

export const AcademicSemestarNameMapper: TAcademicSemestarNameMapper = {
  Summer: '01',
  Autmn: '02',
  Fall: '03',
}
