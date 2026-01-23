import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimalType, AgeInput } from '../domain/types';

const STORAGE_KEYS = {
  LAST_ANIMAL_TYPE: '@animal_calculator:last_animal_type',
  LAST_AGE: '@animal_calculator:last_age',
} as const;

/**
 * Saves the last used animal type to local storage
 */
export async function saveLastAnimalType(animalType: AnimalType): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_ANIMAL_TYPE, animalType);
  } catch (error) {
    console.error('Failed to save animal type:', error);
  }
}

/**
 * Loads the last used animal type from local storage
 */
export async function loadLastAnimalType(): Promise<AnimalType | null> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.LAST_ANIMAL_TYPE);
    if (value && Object.values(AnimalType).includes(value as AnimalType)) {
      return value as AnimalType;
    }
    return null;
  } catch (error) {
    console.error('Failed to load animal type:', error);
    return null;
  }
}

/**
 * Saves the last entered age to local storage
 */
export async function saveLastAge(age: AgeInput): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_AGE, JSON.stringify(age));
  } catch (error) {
    console.error('Failed to save age:', error);
  }
}

/**
 * Loads the last entered age from local storage
 */
export async function loadLastAge(): Promise<AgeInput | null> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.LAST_AGE);
    if (value) {
      const age = JSON.parse(value) as AgeInput;
      // Validate the loaded data
      if (
        typeof age.years === 'number' &&
        typeof age.months === 'number' &&
        age.years >= 0 &&
        age.months >= 0 &&
        age.months < 12
      ) {
        return age;
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to load age:', error);
    return null;
  }
}

/**
 * Clears all saved data
 */
export async function clearSavedData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.LAST_ANIMAL_TYPE,
      STORAGE_KEYS.LAST_AGE,
    ]);
  } catch (error) {
    console.error('Failed to clear saved data:', error);
  }
}
