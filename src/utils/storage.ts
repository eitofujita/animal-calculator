import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimalType, AgeInput, Pet, HealthLogEntry } from '../domain/types';
import { Language } from '../i18n';
import { Theme } from '../contexts/ThemeContext';

const STORAGE_KEYS = {
  LAST_ANIMAL_TYPE: '@animal_calculator:last_animal_type',
  LAST_AGE: '@animal_calculator:last_age',
  LANGUAGE: '@animal_calculator:language',
  THEME: '@animal_calculator:theme',
  AUTH_COMPLETE: '@animal_calculator:auth_complete',
  PETS: '@animal_calculator:pets',
  HEALTH_LOGS: '@animal_calculator:health_logs',
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

/**
 * Saves the selected language to local storage
 */
export async function saveLanguage(language: Language): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  } catch (error) {
    console.error('Failed to save language:', error);
  }
}

/**
 * Loads the selected language from local storage
 */
export async function loadLanguage(): Promise<Language | null> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (value === 'en' || value === 'ja') {
      return value as Language;
    }
    return null;
  } catch (error) {
    console.error('Failed to load language:', error);
    return null;
  }
}

/**
 * Saves the selected theme to local storage
 */
export async function saveTheme(theme: Theme): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Failed to save theme:', error);
  }
}

/**
 * Loads the selected theme from local storage
 */
export async function loadTheme(): Promise<Theme | null> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
    if (value === 'light' || value === 'dark') {
      return value as Theme;
    }
    return null;
  } catch (error) {
    console.error('Failed to load theme:', error);
    return null;
  }
}

export async function saveAuthComplete(isComplete: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_COMPLETE, isComplete ? 'true' : 'false');
  } catch (error) {
    console.error('Failed to save auth status:', error);
  }
}

export async function loadAuthComplete(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_COMPLETE);
    return value === 'true';
  } catch (error) {
    console.error('Failed to load auth status:', error);
    return false;
  }
}

export async function savePets(pets: Pet[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(pets));
  } catch (error) {
    console.error('Failed to save pets:', error);
  }
}

export async function loadPets(): Promise<Pet[]> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.PETS);
    if (!value) {
      return [];
    }
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as Pet[]) : [];
  } catch (error) {
    console.error('Failed to load pets:', error);
    return [];
  }
}

export async function addPet(pet: Pet): Promise<Pet[]> {
  const pets = await loadPets();
  const updated = [...pets, pet];
  await savePets(updated);
  return updated;
}

// ---------- Health Log ----------

export async function loadHealthLogs(): Promise<HealthLogEntry[]> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.HEALTH_LOGS);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as HealthLogEntry[]) : [];
  } catch (error) {
    console.error('Failed to load health logs:', error);
    return [];
  }
}

export async function saveHealthLogs(entries: HealthLogEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.HEALTH_LOGS, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save health logs:', error);
  }
}

export async function addHealthLogEntry(entry: Omit<HealthLogEntry, 'id' | 'createdAt'>): Promise<HealthLogEntry[]> {
  const entries = await loadHealthLogs();
  const newEntry: HealthLogEntry = {
    ...entry,
    id: `health_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newEntry, ...entries];
  await saveHealthLogs(updated);
  return updated;
}

export async function getHealthLogsByDate(date: string): Promise<HealthLogEntry[]> {
  const entries = await loadHealthLogs();
  return entries.filter((e) => e.date === date);
}

export async function getHealthLogsByDateRange(from: string, to: string): Promise<HealthLogEntry[]> {
  const entries = await loadHealthLogs();
  return entries.filter((e) => e.date >= from && e.date <= to);
}

export async function deleteHealthLogEntry(id: string): Promise<HealthLogEntry[]> {
  const entries = await loadHealthLogs();
  const updated = entries.filter((e) => e.id !== id);
  await saveHealthLogs(updated);
  return updated;
}
