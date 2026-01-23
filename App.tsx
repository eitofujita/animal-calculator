import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimalType, AgeInput as AgeInputType, CalculationResult } from './src/domain/types';
import { convertToHumanAge, validateAge, getAnimalDisplayName } from './src/domain/calculations';
import { AnimalSelector } from './src/components/AnimalSelector';
import { AgeInput } from './src/components/AgeInput';
import { ResultCard } from './src/components/ResultCard';
import { MenuBar, MenuButton, MenuBarRef } from './src/components/MenuBar';
import {
  saveLastAnimalType,
  loadLastAnimalType,
  saveLastAge,
  loadLastAge,
  clearSavedData,
} from './src/utils/storage';

const { width } = Dimensions.get('window');

/**
 * Main App Component
 * Animal Age Calculator - Converts animal age to human age equivalent
 */
export default function App() {
  // State management
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>(AnimalType.CAT);
  const [age, setAge] = useState<AgeInputType>({ years: 0, months: 0 });
  const [showMonths, setShowMonths] = useState(true);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | undefined>();
  const menuBarRef = React.useRef<MenuBarRef>(null);

  // Load saved data on app start
  useEffect(() => {
    try {
      loadSavedData();
    } catch (err) {
      console.error('Error loading saved data:', err);
    }
  }, []);

  /**
   * Loads the last used animal type and age from local storage
   */
  const loadSavedData = async () => {
    try {
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
    } catch (err) {
      console.error('Error in loadSavedData:', err);
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
  const handleAgeChange = async (newAge: AgeInputType) => {
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

  /**
   * Menu handlers
   */
  const handleAbout = () => {
    // TODO: Show about modal or navigate to about screen
    console.log('About clicked');
  };

  const handleSettings = () => {
    // TODO: Show settings modal or navigate to settings screen
    console.log('Settings clicked');
  };

  const handleHelp = () => {
    // TODO: Show help modal or navigate to help screen
    console.log('Help clicked');
  };

  return (
    <LinearGradient
      colors={['#f0f4f8', '#e2e8f0', '#cbd5e0']}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <MenuBar
        ref={menuBarRef}
        onAbout={handleAbout}
        onSettings={handleSettings}
        onHelp={handleHelp}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollViewWrapper}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.scrollView}
            nestedScrollEnabled={true}
            scrollEnabled={true}
          >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Pet Age Calculator</Text>
            <Text style={styles.subtitle}>
              Discover your pet's age in human years
            </Text>
          </View>

          {/* Menu Button */}
          <MenuButton onPress={() => {
            if (menuBarRef.current) {
              menuBarRef.current.openMenu();
            }
          }} />

          {/* Input Section */}
          <View style={styles.inputSection}>
            <AnimalSelector
              selectedAnimal={selectedAnimal}
              onSelect={handleAnimalSelect}
            />

            {/* Selected Animal Preview */}
            <View style={styles.selectedPreview}>
              <Text style={styles.selectedLabel}>Current Selection</Text>
              <Text style={styles.selectedName}>
                {selectedAnimal === AnimalType.DOG ? '🐕' :
                 selectedAnimal === AnimalType.CAT ? '🐱' :
                 selectedAnimal === AnimalType.RABBIT ? '🐰' :
                 selectedAnimal === AnimalType.BIRD ? '🐦' :
                 '🐹'} {getAnimalDisplayName(selectedAnimal)}
              </Text>
            </View>

            <AgeInput
              age={age}
              onChange={handleAgeChange}
              showMonths={showMonths}
              onToggleMonths={() => setShowMonths(!showMonths)}
            />

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.calculateButtonWrapper}
                onPress={handleCalculate}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.calculateButton}
                >
                  <Text style={styles.calculateButtonText}>Calculate</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.resetButton, styles.buttonMargin]}
                onPress={handleReset}
                activeOpacity={0.7}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Result Section */}
          <ResultCard result={result} error={error} />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
               This calculation provides an estimate based on common formulas
            </Text>
          </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollViewWrapper: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#636e72',
    textAlign: 'center',
    fontWeight: '400',
  },
  inputSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    zIndex: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  calculateButtonWrapper: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  calculateButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    minHeight: 56,
  },
  buttonMargin: {
    marginLeft: 12,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#718096',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
  selectedPreview: {
    marginTop: 20,
    marginBottom: 8,
    padding: 24,
    backgroundColor: '#F7FAFC',
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  selectedLabel: {
    color: '#636e72',
    marginBottom: 8,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  selectedName: {
    margin: 0,
    fontSize: 28,
    color: '#2d3436',
    fontWeight: '700',
  },
});
