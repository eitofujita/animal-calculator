import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AgeInput as AgeInputType } from '../domain/types';
import { useI18n } from '../i18n/I18nContext';
import { useThemeColors } from '../theme/useThemeColors';
import { colors, spacing, radius, typography } from '../theme/designTokens';

interface AgeInputProps {
  age: AgeInputType;
  onChange: (age: AgeInputType) => void;
  showMonths: boolean;
  onToggleMonths: () => void;
}

/**
 * Age input component with years and optional months.
 * Spec: 選択中は Primary 枠。
 */
export const AgeInput: React.FC<AgeInputProps> = ({
  age,
  onChange,
  showMonths,
  onToggleMonths,
}) => {
  const { t } = useI18n();
  const theme = useThemeColors();
  const inputBackground = theme.surface === colors.surface ? colors.borderLight : theme.surface;
  const inputBorderColor = theme.border;

  const handleYearsChange = (text: string) => {
    const years = text === '' ? 0 : parseInt(text, 10) || 0;
    onChange({ ...age, years });
  };

  const handleMonthsChange = (text: string) => {
    const months = text === '' ? 0 : parseInt(text, 10) || 0;
    const clampedMonths = Math.min(Math.max(0, months), 11);
    onChange({ ...age, months: clampedMonths });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: theme.textPrimary }]}>{t('age')}</Text>
        <TouchableOpacity
          onPress={onToggleMonths}
          activeOpacity={0.8}
          style={[
            styles.toggleButton,
            { borderColor: theme.border, backgroundColor: theme.surface },
            showMonths && { borderColor: theme.primary, borderWidth: 2 },
          ]}
        >
          <Text style={[styles.toggleText, { color: showMonths ? theme.primary : theme.textSecondary }]}>
            {showMonths ? t('yearsAndMonths') : t('yearsOnly')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={[styles.inputWrapper, { backgroundColor: inputBackground, borderColor: inputBorderColor }]}>
          <TextInput
            style={[styles.input, { color: theme.textPrimary }]}
            value={age.years === 0 ? '' : age.years.toString()}
            onChangeText={handleYearsChange}
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
            keyboardType="number-pad"
            maxLength={3}
          />
          <Text style={[styles.unit, { color: theme.textSecondary }]}>{t('years')}</Text>
        </View>

        {showMonths && (
          <View style={[styles.inputWrapper, styles.inputWrapperSpacing, { backgroundColor: inputBackground, borderColor: inputBorderColor }]}>
            <TextInput
              style={[styles.input, { color: theme.textPrimary }]}
              value={age.months === 0 ? '' : age.months.toString()}
              onChangeText={handleMonthsChange}
              placeholder="0"
              placeholderTextColor={theme.textTertiary}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={[styles.unit, { color: theme.textSecondary }]}>{t('months')}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.h3,
  },
  toggleButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  toggleText: {
    ...typography.label,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 56,
  },
  inputWrapperSpacing: {
    marginLeft: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.h3,
    paddingVertical: spacing.sm,
  },
  unit: {
    ...typography.body,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
});
