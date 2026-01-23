/**
 * Animal types supported by the calculator
 * This enum can be extended in the future to support more animals
 */
export enum AnimalType {
  DOG = 'dog',
  CAT = 'cat',
  RABBIT = 'rabbit',
  BIRD = 'bird',
  HAMSTER = 'hamster',
}

/**
 * Age input structure
 * Both years and months are optional, but at least one should be provided
 */
export interface AgeInput {
  years: number;
  months: number;
}

/**
 * Calculation result containing human age and formula description
 */
export interface CalculationResult {
  humanAge: number;
  formula: string;
  animalType: AnimalType;
  inputAge: AgeInput;
}
