export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TAcademicSemestarName = 'Summer' | 'Autumn' | 'Fall'
export type TAcademicSemestarCode = '01' | '02' | '03'

export type TAcademicSemestar = {
  name: TAcademicSemestarName
  year: string
  code: TAcademicSemestarCode
  startMonth: TMonth
  endMonth: TMonth
}

export type TAcademicSemestarNameMapper = {
  [key: string]: string
}
