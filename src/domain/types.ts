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

export interface Pet {
  id: string;
  name: string;
  species: AnimalType;
  birthday?: string;
  ageYears?: number;
  ageMonths?: number;
  weightKg?: number;
  createdAt: string;
}

/**
 * Health log categories (weight, diet, excretion, exercise, sleep, symptoms)
 */
export enum HealthLogCategory {
  WEIGHT = 'weight',
  DIET = 'diet',
  EXCRETION = 'excretion',
  EXERCISE = 'exercise',
  SLEEP = 'sleep',
  SYMPTOMS = 'symptoms',
}

/**
 * Single health log entry for a date
 * value: string (e.g. "12.5" for weight kg, "normal" for excretion, "30" for exercise minutes)
 * note: optional free text
 */
export interface HealthLogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  category: HealthLogCategory;
  petId?: string;
  value: string;
  note?: string;
  createdAt: string; // ISO
}
