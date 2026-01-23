import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { AnimalType, AgeInput, CalculationResult } from './src/domain/types';
import { convertToHumanAge, validateAge } from './src/domain/calculations';
import { AnimalSelector } from './src/components/AnimalSelector';
import { AgeInput } from './src/components/AgeInput';
import { ResultCard } from './src/components/ResultCard';
import {
  saveLastAnimalType,
  loadLastAnimalType,
  saveLastAge,
  loadLastAge,
  clearSavedData,
} from './src/utils/storage';

/**
 * Main App Component
 * Animal Age Calculator - Converts animal age to human age equivalent
 */
export default function App() {
  // State management
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>(AnimalType.DOG);
  const [age, setAge] = useState<AgeInput>({ years: 0, months: 0 });
  const [showMonths, setShowMonths] = useState(true);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | undefined>();

  // Load saved data on app start
  useEffect(() => {
    loadSavedData();
  }, []);

  /**
   * Loads the last used animal type and age from local storage
   */
  const loadSavedData = async () => {
    const savedAnimal = await loadLastAnimalType();
    if (savedAnimal) {
      setSelectedAnimal(savedAnimal);
    }

    const savedAge = await loadLastAge();
    if (savedAge) {
      setAge(savedAge);
      // If months are present, show months input
      if (savedAge.months > 0) {
        setShowMonths(true);
      }
    }
  };

  /**
   * Handles animal type selection
   */
  const handleAnimalSelect = async (animal: AnimalType) => {
    setSelectedAnimal(animal);
    await saveLastAnimalType(animal);
  };

  /**
   * Handles age input changes
   */
  const handleAgeChange = async (newAge: AgeInput) => {
    setAge(newAge);
    await saveLastAge(newAge);
    // Clear previous result when input changes
    setResult(null);
    setError(undefined);
  };

  /**
   * Performs the age calculation
   */
  const handleCalculate = () => {
    // Validate input
    const validation = validateAge(age);
    
    if (!validation.isValid) {
      setError(validation.error);
      setResult(null);
      return;
    }

    // Show warning if present, but still calculate
    if (validation.error) {
      setError(validation.error);
    } else {
      setError(undefined);
    }

    // Perform calculation
    const calculationResult = convertToHumanAge(selectedAnimal, age);
    setResult(calculationResult);
  };

  /**
   * Resets all inputs and results
   */
  const handleReset = async () => {
    setAge({ years: 0, months: 0 });
    setResult(null);
    setError(undefined);
    await clearSavedData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Animal Age Calculator</Text>
          <Text style={styles.subtitle}>
            Convert your pet's age to human years
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <AnimalSelector
            selectedAnimal={selectedAnimal}
            onSelect={handleAnimalSelect}
          />

          <AgeInput
            age={age}
            onChange={handleAgeChange}
            showMonths={showMonths}
            onToggleMonths={() => setShowMonths(!showMonths)}
          />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.calculateButton]}
              onPress={handleCalculate}
            >
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={[styles.buttonText, styles.resetButtonText]}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Result Section */}
        <ResultCard result={result} error={error} />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This app provides an estimate.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  inputSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculateButton: {
    backgroundColor: '#4A90E2',
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resetButtonText: {
    color: '#666',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
