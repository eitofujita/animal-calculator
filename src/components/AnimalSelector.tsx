import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AnimalType } from '../domain/types';
import { getAnimalDisplayName } from '../domain/calculations';

interface AnimalSelectorProps {
  selectedAnimal: AnimalType;
  onSelect: (animal: AnimalType) => void;
}

/**
 * Animal type selector component
 * Displays buttons for each available animal type
 */
export const AnimalSelector: React.FC<AnimalSelectorProps> = ({
  selectedAnimal,
  onSelect,
}) => {
  const animals = [AnimalType.DOG, AnimalType.CAT, AnimalType.RABBIT];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Animal Type</Text>
      <View style={styles.buttonContainer}>
        {animals.map((animal) => {
          const isSelected = animal === selectedAnimal;
          return (
            <TouchableOpacity
              key={animal}
              style={[
                styles.button,
                isSelected && styles.buttonSelected,
              ]}
              onPress={() => onSelect(animal)}
            >
              <Text
                style={[
                  styles.buttonText,
                  isSelected && styles.buttonTextSelected,
                ]}
              >
                {getAnimalDisplayName(animal)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  buttonTextSelected: {
    color: '#FFFFFF',
  },
});
