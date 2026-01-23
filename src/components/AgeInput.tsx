import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { AgeInput as AgeInputType } from '../domain/types';

interface AgeInputProps {
  age: AgeInputType;
  onChange: (age: AgeInputType) => void;
  showMonths: boolean;
  onToggleMonths: () => void;
}

/**
 * Age input component with years and optional months
 */
export const AgeInput: React.FC<AgeInputProps> = ({
  age,
  onChange,
  showMonths,
  onToggleMonths,
}) => {
  const handleYearsChange = (text: string) => {
    const years = text === '' ? 0 : parseInt(text, 10) || 0;
    onChange({ ...age, years });
  };

  const handleMonthsChange = (text: string) => {
    const months = text === '' ? 0 : parseInt(text, 10) || 0;
    // Ensure months stay within 0-11 range
    const clampedMonths = Math.min(Math.max(0, months), 11);
    onChange({ ...age, months: clampedMonths });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Age</Text>
        <Text style={styles.toggle} onPress={onToggleMonths}>
          {showMonths ? 'Years only' : 'Years + Months'}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={age.years === 0 ? '' : age.years.toString()}
            onChangeText={handleYearsChange}
            placeholder="0"
            keyboardType="number-pad"
            maxLength={3}
          />
          <Text style={styles.unit}>years</Text>
        </View>

        {showMonths && (
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={age.months === 0 ? '' : age.months.toString()}
              onChangeText={handleMonthsChange}
              placeholder="0"
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.unit}>months</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  toggle: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 12,
    color: '#333',
  },
  unit: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});
