import { AnimalType, AgeInput, CalculationResult } from './types';

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
  // Convert months to fractional years (e.g., 6 months = 0.5 years)
  const totalYears = age.years + age.months / 12;
  
  let humanAge: number;
  let formula: string;

  switch (animalType) {
    case AnimalType.DOG:
      if (totalYears <= 1) {
        // First year: 15 human years
        humanAge = totalYears * 15;
        formula = '1st year = 15 human years';
      } else if (totalYears <= 2) {
        // Second year: 15 (first) + 9 (second) = 24 total
        // Linear interpolation for months in second year
        const firstYear = 15;
        const secondYearProgress = totalYears - 1;
        humanAge = firstYear + secondYearProgress * 9;
        formula = '1st year = 15, 2nd year = +9 (total 24)';
      } else {
        // Third year and beyond: 24 (first 2 years) + 5 per additional year
        const firstTwoYears = 24;
        const additionalYears = totalYears - 2;
        humanAge = firstTwoYears + additionalYears * 5;
        formula = '1st year = 15, 2nd year = +9, 3rd+ = +5/year';
      }
      break;

    case AnimalType.CAT:
      if (totalYears <= 1) {
        humanAge = totalYears * 15;
        formula = '1st year = 15 human years';
      } else if (totalYears <= 2) {
        const firstYear = 15;
        const secondYearProgress = totalYears - 1;
        humanAge = firstYear + secondYearProgress * 9;
        formula = '1st year = 15, 2nd year = +9 (total 24)';
      } else {
        const firstTwoYears = 24;
        const additionalYears = totalYears - 2;
        humanAge = firstTwoYears + additionalYears * 4;
        formula = '1st year = 15, 2nd year = +9, 3rd+ = +4/year';
      }
      break;

    case AnimalType.RABBIT:
      if (totalYears <= 1) {
        humanAge = totalYears * 12;
        formula = '1st year = 12 human years';
      } else if (totalYears <= 2) {
        const firstYear = 12;
        const secondYearProgress = totalYears - 1;
        humanAge = firstYear + secondYearProgress * 6;
        formula = '1st year = 12, 2nd year = +6 (total 18)';
      } else {
        const firstTwoYears = 18;
        const additionalYears = totalYears - 2;
        humanAge = firstTwoYears + additionalYears * 4;
        formula = '1st year = 12, 2nd year = +6, 3rd+ = +4/year';
      }
      break;

    default:
      // Fallback (should not happen with proper types)
      humanAge = totalYears * 7;
      formula = 'Default formula';
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
 * @returns Object with isValid flag and error message (if invalid)
 */
export function validateAge(age: AgeInput): { isValid: boolean; error?: string } {
  // Check if at least one field is provided
  if (age.years === 0 && age.months === 0) {
    return { isValid: false, error: 'Please enter at least years or months' };
  }

  // Check for negative values
  if (age.years < 0 || age.months < 0) {
    return { isValid: false, error: 'Age cannot be negative' };
  }

  // Check for invalid month values (should be 0-11)
  if (age.months >= 12) {
    return { isValid: false, error: 'Months must be between 0 and 11' };
  }

  // Check for unreasonably high values (warning threshold: 30 years)
  const totalYears = age.years + age.months / 12;
  if (totalYears > 30) {
    return { 
      isValid: true, 
      error: 'Warning: Age exceeds 30 years. Result may be inaccurate.' 
    };
  }

  return { isValid: true };
}

/**
 * Gets display name for animal type
 */
export function getAnimalDisplayName(animalType: AnimalType): string {
  switch (animalType) {
    case AnimalType.DOG:
      return 'Dog';
    case AnimalType.CAT:
      return 'Cat';
    case AnimalType.RABBIT:
      return 'Rabbit';
    default:
      return 'Unknown';
  }
}
