import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CalculationResult } from '../domain/types';
import { getAnimalDisplayName } from '../domain/calculations';

interface ResultCardProps {
  result: CalculationResult | null;
  error?: string;
}

/**
 * Result card component displaying calculation results or errors
 */
export const ResultCard: React.FC<ResultCardProps> = ({ result, error }) => {
  if (error && !result) {
    return (
      <View style={[styles.card, styles.errorCard]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!result) {
    return null;
  }

  const { humanAge, formula, animalType, inputAge } = result;
  const ageDisplay =
    inputAge.months > 0
      ? `${inputAge.years} year${inputAge.years !== 1 ? 's' : ''}, ${inputAge.months} month${inputAge.months !== 1 ? 's' : ''}`
      : `${inputAge.years} year${inputAge.years !== 1 ? 's' : ''}`;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Human Age Equivalent</Text>
      <Text style={styles.humanAge}>{humanAge} years</Text>
      
      <View style={styles.divider} />
      
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Animal:</Text>
        <Text style={styles.detailValue}>{getAnimalDisplayName(animalType)}</Text>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Age:</Text>
        <Text style={styles.detailValue}>{ageDisplay}</Text>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Formula:</Text>
        <Text style={styles.detailValue}>{formula}</Text>
      </View>

      {error && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>⚠ {error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  humanAge: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  warningContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
  },
  errorText: {
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: '500',
  },
});
