import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CalculationResult } from '../domain/types';
import { getAnimalDisplayName } from '../domain/calculations';
import { useI18n } from '../i18n/I18nContext';
import { useThemeColors } from '../theme/useThemeColors';
import { colors, typography, spacing, radius, shadows } from '../theme/designTokens';
import { PrimaryButton } from './ui/PrimaryButton';

interface ResultCardProps {
  result: CalculationResult | null;
  error?: string;
  onAddReminder?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, error, onAddReminder }) => {
  const { t } = useI18n();
  const theme = useThemeColors();

  if (error && !result) {
    return (
      <View style={[styles.errorCard, { borderLeftColor: theme.error, backgroundColor: 'rgba(197, 48, 48, 0.08)' }]}>
        <Text style={[styles.errorTitle, { color: theme.error }]}>{t('error')}</Text>
        <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
      </View>
    );
  }

  if (!result) return null;

  const { humanAge, animalType, inputAge } = result;
  const yearsText = t('years');
  const monthsText = t('months');
  const ageDisplay =
    inputAge.months > 0
      ? `${inputAge.years} ${yearsText}, ${inputAge.months} ${monthsText}`
      : `${inputAge.years} ${yearsText}`;

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.surface, borderColor: theme.border }, shadows.card]}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>{t('humanAgeEquivalent')}</Text>
      <View style={styles.humanAgeContainer}>
        <Text style={[styles.humanAge, { color: theme.primary }]}>{humanAge}</Text>
        <Text style={[styles.humanAgeLabel, { color: theme.textSecondary }]}>{t('years')}</Text>
      </View>
      <Text style={[styles.caption, { color: theme.textTertiary }]}>
        {getAnimalDisplayName(animalType, t)} · {ageDisplay}
      </Text>
      <View style={[styles.divider, { backgroundColor: theme.divider }]} />
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>{t('animal')}:</Text>
          <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{getAnimalDisplayName(animalType, t)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>{t('age')}:</Text>
          <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{ageDisplay}</Text>
        </View>
      </View>
      {error && (
        <View style={[styles.warningContainer, { borderLeftColor: colors.warning }]}>
          <Text style={[styles.warningText, { color: colors.warning }]}>{error}</Text>
        </View>
      )}
      {onAddReminder && (
        <View style={styles.ctaWrap}>
          <PrimaryButton title={t('addReminderFromAge')} onPress={onAddReminder} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: spacing.lg,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    width: '100%',
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.md,
    flexShrink: 1,
  },
  humanAgeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  humanAge: {
    ...typography.display,
    marginRight: spacing.xs,
  },
  humanAgeLabel: {
    ...typography.displaySmall,
    opacity: 0.9,
  },
  caption: {
    ...typography.caption,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
    borderRadius: 1,
  },
  detailsContainer: { marginBottom: spacing.sm },
  detailRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
    alignItems: 'center',
  },
  detailLabel: { ...typography.bodySmall, width: 80 },
  detailValue: { ...typography.body, flex: 1, flexShrink: 1 },
  warningContainer: {
    marginTop: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderLeftWidth: 4,
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
  },
  warningText: { ...typography.bodySmall },
  ctaWrap: { marginTop: spacing.lg },
  errorCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    backgroundColor: 'rgba(197, 48, 48, 0.08)',
  },
  errorTitle: { ...typography.h3, marginBottom: spacing.xs },
  errorText: { ...typography.bodySmall },
});
