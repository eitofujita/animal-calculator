import { AnimalType, AgeInput, CalculationResult } from './types';
import { TranslationKey } from '../i18n';

/**
 * Converts animal age to human age based on the animal type
 * 
 * Conversion formulas:
 * - Dog: 1st year = 15, 2nd year = +9 (total 24), 3rd+ = +5/year
 * - Cat: 1st year = 15, 2nd year = +9 (total 24), 3rd+ = +4/year
 * - Rabbit: 1st year = 12, 2nd year = +6 (total 18), 3rd+ = +4/year
 * 
 * Months are converted to fractional years (e.g., 6 months = 0.5 years)
 * and linearly interpolated within the year range.
 * 
 * @param animalType - The type of animal
 * @param age - Age input with years and months
 * @returns Calculation result with human age and formula description
 */
export function convertToHumanAge(
  animalType: AnimalType,
  age: AgeInput
): CalculationResult {
  const totalYears = age.years + age.months / 12;
  const totalMonths = age.years * 12 + age.months;
  
  let humanAge: number;
  let formula: string;

  // Linear interpolation helper function
  const lerp = (x: number, x0: number, y0: number, x1: number, y1: number) =>
    y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);

  // Hamster: piecewise-linear by month anchors (non-proportional)
  const hamsterHuman = (m: number) => {
    // Omni's reference points: 1m=14, 2m=20, 4m=26, 6m=34, 12m=58, 24m=70
    if (m <= 1)  return lerp(m, 0, 0, 1, 14);
    if (m <= 2)  return lerp(m, 1, 14, 2, 20);
    if (m <= 4)  return lerp(m, 2, 20, 4, 26);
    if (m <= 6)  return lerp(m, 4, 26, 6, 34);
    if (m <= 12) return lerp(m, 6, 34, 12, 58);
    if (m <= 24) return lerp(m, 12, 58, 24, 70);
    // Beyond 2 years: extend with last slope
    return lerp(m, 12, 58, 24, 70);
  };

  switch (animalType) {
    case AnimalType.DOG:
      // AVMA (medium-sized dog general guide)
      if (totalYears <= 1) {
        humanAge = totalYears * 15;
        formula = "Dog: 0–1y => 15*y";
      } else if (totalYears <= 2) {
        humanAge = 15 + (totalYears - 1) * 9;
        formula = "Dog: 1–2y => 15 + 9*(y-1)";
      } else {
        humanAge = 24 + (totalYears - 2) * 5;
        formula = "Dog: 2y+ => 24 + 5*(y-2)";
      }
      break;

    case AnimalType.CAT:
      // Standard cat age conversion (1 year=15, 2nd year=+9, then +4)
      if (totalYears <= 1) {
        humanAge = totalYears * 15;
        formula = "Cat: 0–1y => 15*y";
      } else if (totalYears <= 2) {
        humanAge = 15 + (totalYears - 1) * 9;
        formula = "Cat: 1–2y => 15 + 9*(y-1)";
      } else {
        humanAge = 24 + (totalYears - 2) * 4;
        formula = "Cat: 2y+ => 24 + 4*(y-2)";
      }
      break;

    case AnimalType.RABBIT:
      // BunnyLady: 4 months≈12, 1 year≈20, then +6/year
      // Piecewise linear approximation by months
      // 0–4 months: 0→0, 4→12 so 3*(months)
      // 4–12 months: 12→20 (+8 in 8 months) so 12 + 1*(months-4)
      // 12 months+: 20 + 0.5*(months-12) (= +6/year)
      if (totalMonths <= 4) {
        humanAge = totalMonths * 3;
        formula = "Rabbit: 0–4m => 3*m";
      } else if (totalMonths <= 12) {
        humanAge = 12 + (totalMonths - 4) * 1;
        formula = "Rabbit: 4–12m => 12 + 1*(m-4)";
      } else {
        humanAge = 20 + (totalMonths - 12) * 0.5;
        formula = "Rabbit: 12m+ => 20 + 0.5*(m-12)";
      }
      break;

    case AnimalType.HAMSTER:
      // Omni: non-proportional (e.g., 1 year=58, 2 years=70, 6 months=34)
      // Use piecewise-linear by month anchors
      humanAge = hamsterHuman(totalMonths);
      formula = "Hamster: piecewise-linear by month anchors (non-proportional)";
      break;

    case AnimalType.BIRD:
      // Omni: proportional by average lifespan ratio
      // human = birdAge * (humanAvgLifespan / birdAvgLifespan)
      // Note: birdAvgLifespanYears should be set per species (currently using 10 as placeholder)
      {
        const humanAvg = 80;
        const birdAvg = 10; // Placeholder - can be replaced with species-specific selection later
        humanAge = totalYears * (humanAvg / birdAvg);
        formula = "Bird: y * (humanAvg / birdAvgLifespan)";
      }
      break;

    default:
      humanAge = totalYears * 7;
      formula = "Default: 7*y";
  }

  // Round to 1 decimal place for readability
  humanAge = Math.round(humanAge * 10) / 10;

  return {
    humanAge,
    formula,
    animalType,
    inputAge: age,
  };
}

/**
 * Validates age input
 * 
 * @param age - Age input to validate
 * @param t - Translation function (optional, defaults to English)
 * @returns Object with isValid flag and error message (if invalid)
 */
export function validateAge(
  age: AgeInput,
  t?: (key: TranslationKey) => string
): { isValid: boolean; error?: string } {
  // Check if at least one field is provided
  if (age.years === 0 && age.months === 0) {
    return { isValid: false, error: t ? t('pleaseEnterAge') : 'Please enter at least years or months' };
  }

  // Check for negative values
  if (age.years < 0 || age.months < 0) {
    return { isValid: false, error: t ? t('ageCannotBeNegative') : 'Age cannot be negative' };
  }

  // Check for invalid month values (should be 0-11)
  if (age.months >= 12) {
    return { isValid: false, error: t ? t('monthsMustBeValid') : 'Months must be between 0 and 11' };
  }

  // Check for unreasonably high values (warning threshold: 30 years)
  const totalYears = age.years + age.months / 12;
  if (totalYears > 30) {
    return { 
      isValid: true, 
      error: t ? t('warningAgeExceeds') : 'Warning: Age exceeds 30 years. Result may be inaccurate.' 
    };
  }

  return { isValid: true };
}

/**
 * Gets display name for animal type
 * @param animalType - The type of animal
 * @param t - Translation function (optional, defaults to English)
 */
export function getAnimalDisplayName(
  animalType: AnimalType,
  t?: (key: TranslationKey) => string
): string {
  if (t) {
    switch (animalType) {
      case AnimalType.DOG:
        return t('dog');
      case AnimalType.CAT:
        return t('cat');
      case AnimalType.RABBIT:
        return t('rabbit');
      case AnimalType.BIRD:
        return t('bird');
      case AnimalType.HAMSTER:
        return t('hamster');
      default:
        return 'Unknown';
    }
  }
  
  // Fallback to English if no translation function provided
  switch (animalType) {
    case AnimalType.DOG:
      return 'Dog';
    case AnimalType.CAT:
      return 'Cat';
    case AnimalType.RABBIT:
      return 'Rabbit';
    case AnimalType.BIRD:
      return 'Bird';
    case AnimalType.HAMSTER:
      return 'Hamster';
    default:
      return 'Unknown';
  }
}
