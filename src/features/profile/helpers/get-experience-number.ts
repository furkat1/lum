export type ExperienceOptions = 'Under a year' | '1-3 years' | '4-7 years' | '8+ years' | '';
export const ExperienceOptions: ExperienceOptions[] = ['Under a year', '1-3 years', '4-7 years', '8+ years'];

export const getExperienceYearByPeriod = (option: ExperienceOptions): number => {
  const currentYear: number = new Date().getFullYear();
  switch (option) {
  case 'Under a year': return currentYear;
  case '1-3 years': return currentYear - 3;
  case '4-7 years': return currentYear - 7;
  case '8+ years': return currentYear - 8;
  }
}

export const getExperiencePeriodByYear = (year: number): ExperienceOptions => {
  const currentYear: number = new Date().getFullYear();
  const experience: number = currentYear - year;
  if (experience === 0) return 'Under a year';
  if (experience >= 1 && experience <= 3) return '1-3 years';
  if (experience >= 4 && experience <= 7) return '4-7 years';
  if (experience >= 8) return '8+ years';
  return '';
}