import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AgeInput as AgeInputType } from '../domain/types';

interface AgeInputProps {
  age: AgeInputType;
  onChange: (age: AgeInputType) => void;
  showMonths: boolean;
  onToggleMonths: () => void;
}

/**
 * Age input component with years and optional months
 * Beautiful modern design with gradient accents
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
        <Text style={styles.label}>📅 Age</Text>
        <TouchableOpacity onPress={onToggleMonths} activeOpacity={0.7}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {showMonths ? 'Years only' : 'Years + Months'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={age.years === 0 ? '' : age.years.toString()}
            onChangeText={handleYearsChange}
            placeholder="0"
            placeholderTextColor="#A0AEC0"
            keyboardType="number-pad"
            maxLength={3}
          />
          <Text style={styles.unit}>years</Text>
        </View>

        {showMonths && (
          <View style={[styles.inputWrapper, styles.inputWrapperSpacing]}>
            <TextInput
              style={styles.input}
              value={age.months === 0 ? '' : age.months.toString()}
              onChangeText={handleMonthsChange}
              placeholder="0"
              placeholderTextColor="#A0AEC0"
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
    marginBottom: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    letterSpacing: 0.5,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  toggleText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F7FAFC',
    minHeight: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputWrapperSpacing: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 12,
    color: '#2D3748',
    fontWeight: '600',
  },
  unit: {
    fontSize: 15,
    color: '#718096',
    marginLeft: 8,
    fontWeight: '500',
  },
});
