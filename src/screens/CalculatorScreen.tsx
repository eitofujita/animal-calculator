import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimalType, AgeInput as AgeInputType, CalculationResult } from '../domain/types';
import { convertToHumanAge, validateAge, getAnimalDisplayName } from '../domain/calculations';
import { AnimalSelector } from '../components/AnimalSelector';
import { AgeInput } from '../components/AgeInput';
import { ResultCard } from '../components/ResultCard';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../contexts/ThemeContext';
import { useThemeColors } from '../theme/useThemeColors';
import { spacing, radius, typography, shadows } from '../theme/designTokens';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SecondaryButton } from '../components/ui/SecondaryButton';
import { RemindersHeaderButton } from '../components/ui/RemindersHeaderButton';
import { SettingsHeaderButton } from '../components/ui/SettingsHeaderButton';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppTabParamList } from '../navigation/types';
import {
  saveLastAnimalType,
  loadLastAnimalType,
  saveLastAge,
  loadLastAge,
  clearSavedData,
} from '../utils/storage';
/**
 * Calculator Screen
 */
type CalcNav = BottomTabNavigationProp<AppTabParamList, 'Calculator'>;

export const CalculatorScreen: React.FC = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const theme = useThemeColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<CalcNav>();
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>(AnimalType.CAT);
  const [age, setAge] = useState<AgeInputType>({ years: 0, months: 0 });
  const [showMonths, setShowMonths] = useState(true);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | undefined>();

  const backgroundColor = theme.background;
  const textColor = theme.textPrimary;
  const secondaryTextColor = theme.textSecondary;
  const cardBackground = theme.surface;
  const cardBorderColor = theme.border;
  const selectedPreviewBg = isDark ? theme.divider : '#F7FAFC';

  useEffect(() => {
    try {
      loadSavedData();
    } catch (err) {
      console.error('Error loading saved data:', err);
    }
  }, []);

  const loadSavedData = async () => {
    try {
      const savedAnimal = await loadLastAnimalType();
      if (savedAnimal) {
        setSelectedAnimal(savedAnimal);
      }

      const savedAge = await loadLastAge();
      if (savedAge) {
        setAge(savedAge);
        if (savedAge.months > 0) {
          setShowMonths(true);
        }
      }
    } catch (err) {
      console.error('Error in loadSavedData:', err);
    }
  };

  const handleAnimalSelect = async (animal: AnimalType) => {
    setSelectedAnimal(animal);
    await saveLastAnimalType(animal);
  };

  const handleAgeChange = async (newAge: AgeInputType) => {
    setAge(newAge);
    await saveLastAge(newAge);
    setResult(null);
    setError(undefined);
  };

  const handleCalculate = () => {
    const validation = validateAge(age, t);
    
    if (!validation.isValid) {
      setError(validation.error);
      setResult(null);
      return;
    }

    if (validation.error) {
      setError(validation.error);
    } else {
      setError(undefined);
    }

    const calculationResult = convertToHumanAge(selectedAnimal, age);
    setResult(calculationResult);
  };

  const handleReset = async () => {
    setAge({ years: 0, months: 0 });
    setResult(null);
    setError(undefined);
    await clearSavedData();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={backgroundColor} translucent />
      <SettingsHeaderButton />
      <RemindersHeaderButton />

      <View style={[styles.content, { paddingTop: insets.top + spacing.screenTop }]}>
        <View style={[styles.header, { paddingHorizontal: spacing.headerPaddingHorizontal }]}>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
              {t('calculatorTitle')}
            </Text>
          </View>
        </View>

        <View style={[styles.inputSection, { backgroundColor: cardBackground, borderColor: cardBorderColor }]}>
          <AnimalSelector
            selectedAnimal={selectedAnimal}
            onSelect={handleAnimalSelect}
          />

          <View style={[styles.selectedPreview, { backgroundColor: selectedPreviewBg }]}>
            <Text style={[styles.selectedLabel, { color: secondaryTextColor }]}>{t('currentSelection')}</Text>
            <Text style={[styles.selectedName, { color: textColor }]} numberOfLines={1} ellipsizeMode="tail">
              {getAnimalDisplayName(selectedAnimal, t)}
            </Text>
          </View>

          <AgeInput
            age={age}
            onChange={handleAgeChange}
            showMonths={showMonths}
            onToggleMonths={() => setShowMonths(!showMonths)}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.calculateButtonWrapper}>
              <PrimaryButton title={t('calculate')} onPress={handleCalculate} />
            </View>
            <View style={styles.buttonMargin}>
              <SecondaryButton title={t('reset')} onPress={handleReset} />
            </View>
          </View>
        </View>

        <ResultCard
          result={result}
          error={error}
          onAddReminder={() => navigation.getParent()?.navigate('Reminders' as never)}
        />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: secondaryTextColor }]}>
            {t('calculationEstimate')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: spacing.screenBottom,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    marginBottom: spacing.xs,
  },
  headerTextContainer: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  inputSection: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    zIndex: 0,
    ...shadows.card,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  calculateButtonWrapper: {
    flex: 1,
  },
  buttonMargin: {
    marginLeft: spacing.sm,
  },
  footer: {
    marginTop: spacing.lg,
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
  },
  selectedPreview: {
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  selectedLabel: {
    ...typography.label,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  selectedName: {
    ...typography.h2,
    margin: 0,
  },
  footerText: {
    ...typography.bodySmall,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: typography.bodySmall.lineHeight,
  },
});
