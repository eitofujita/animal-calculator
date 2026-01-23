import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CalculationResult } from '../domain/types';
import { getAnimalDisplayName } from '../domain/calculations';

interface ResultCardProps {
  result: CalculationResult | null;
  error?: string;
}

/**
 * Result card component displaying calculation results or errors
 * Beautiful gradient design with modern styling
 */
export const ResultCard: React.FC<ResultCardProps> = ({ result, error }) => {
  if (error && !result) {
    return (
      <View style={styles.errorCard}>
        <View style={styles.errorHeader}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Error</Text>
        </View>
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
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.content}>
          <Text style={styles.title}>🎉 Human Age Equivalent</Text>
          
          <View style={styles.humanAgeContainer}>
            <Text style={styles.humanAge}>{humanAge}</Text>
            <Text style={styles.humanAgeLabel}>years</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>🐾 Animal:</Text>
              <Text style={styles.detailValue}>{getAnimalDisplayName(animalType)}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>📅 Age:</Text>
              <Text style={styles.detailValue}>{ageDisplay}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>📊 Formula:</Text>
              <Text style={styles.detailValue}>{formula}</Text>
            </View>
          </View>

          {error && (
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>⚠️ {error}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  card: {
    borderRadius: 20,
    padding: 24,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  humanAgeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 20,
  },
  humanAge: {
    fontSize: 56,
    fontWeight: '800',
    color: '#667eea',
    marginRight: 8,
  },
  humanAgeLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#718096',
  },
  divider: {
    height: 2,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
    borderRadius: 1,
  },
  detailsContainer: {
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 15,
    color: '#4A5568',
    width: 100,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 15,
    color: '#2D3748',
    flex: 1,
    fontWeight: '500',
  },
  warningContainer: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    fontWeight: '500',
    lineHeight: 20,
  },
  errorCard: {
    backgroundColor: '#FED7D7',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#E53E3E',
    shadowColor: '#E53E3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  errorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  errorIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#C53030',
  },
  errorText: {
    fontSize: 15,
    color: '#742A2A',
    fontWeight: '500',
    lineHeight: 22,
  },
});
