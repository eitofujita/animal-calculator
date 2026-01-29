import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../contexts/ThemeContext';
import { useThemeColors } from '../theme/useThemeColors';
import { colors, spacing, radius, typography } from '../theme/designTokens';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { RemindersHeaderButton } from '../components/ui/RemindersHeaderButton';
import { SettingsHeaderButton } from '../components/ui/SettingsHeaderButton';
import { AnimalType, Pet } from '../domain/types';
import { getAnimalDisplayName } from '../domain/calculations';
import { getAnimalAsset } from '../utils/animalAssets';
import { loadPets, savePets } from '../utils/storage';

export const PetProfileScreen: React.FC = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [species, setSpecies] = useState<AnimalType>(AnimalType.DOG);
  const [ageYears, setAgeYears] = useState('');
  const [ageMonths, setAgeMonths] = useState('');
  const [error, setError] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);

  const theme = useThemeColors();
  const backgroundColor = theme.background;
  const textColor = theme.textPrimary;
  const secondaryTextColor = theme.textSecondary;
  const cardBackground = theme.surface;
  const cardBorderColor = theme.border;
  const inputBackground = isDark ? colors.dark.surface : colors.borderLight;

  useEffect(() => {
    const loadPet = async () => {
      const pets = await loadPets();
      if (pets.length > 0) {
        const pet = pets[0];
        setCurrentPet(pet);
        setName(pet.name);
        setSpecies(pet.species);
        setAgeYears(pet.ageYears?.toString() ?? '');
        setAgeMonths(pet.ageMonths?.toString() ?? '');
      }
    };
    loadPet();
  }, []);

  const handleSave = async () => {
    setError('');
    setSavedMessage('');
    if (!name.trim()) {
      setError(t('petProfileValidationName'));
      return;
    }

    const parsedYears = Math.max(0, Number(ageYears) || 0);
    const parsedMonths = Math.max(0, Number(ageMonths) || 0);
    if (parsedMonths > 11) {
      setError(t('monthsMustBeValid'));
      return;
    }

    const newPet: Pet = {
      id: currentPet?.id ?? `pet_${Date.now()}`,
      name: name.trim(),
      species,
      ageYears: parsedYears,
      ageMonths: parsedMonths,
      createdAt: currentPet?.createdAt ?? new Date().toISOString(),
    };

    await savePets([newPet]);
    setCurrentPet(newPet);
    setSavedMessage(t('petProfileSaved'));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <SettingsHeaderButton />
      <RemindersHeaderButton />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.screenHorizontal }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.titleWrap, { paddingHorizontal: spacing.headerPaddingHorizontal }]}>
          <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
            {t('petProfileTitle')}
          </Text>
        </View>

        {currentPet && (
          <View style={[styles.card, { backgroundColor: cardBackground, borderColor: cardBorderColor }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>{t('petProfileCurrent')}</Text>
            <View style={styles.petRow}>
              <Image source={getAnimalAsset(currentPet.species)} style={styles.petImage} />
              <View style={styles.petInfo}>
                <Text style={[styles.petName, { color: textColor }]}>{currentPet.name}</Text>
                <Text style={[styles.petMeta, { color: secondaryTextColor }]}>
                  {getAnimalDisplayName(currentPet.species, t)}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={[styles.card, { backgroundColor: cardBackground, borderColor: cardBorderColor }]}>
          <Text style={[styles.cardTitle, { color: textColor }]}>{t('petProfileFormTitle')}</Text>

          <Text style={[styles.label, { color: secondaryTextColor }]}>{t('petProfileName')}</Text>
          <TextInput
            style={[styles.input, { backgroundColor: inputBackground, color: textColor, borderColor: cardBorderColor }]}
            placeholder={t('petProfileNamePlaceholder')}
            placeholderTextColor={theme.textTertiary}
            value={name}
            onChangeText={setName}
          />

          <Text style={[styles.label, { color: secondaryTextColor }]}>{t('petProfileSpecies')}</Text>
          <View style={styles.speciesRow}>
            {Object.values(AnimalType).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.speciesButton,
                  { borderColor: cardBorderColor },
                  species === type && { borderColor: theme.primary, backgroundColor: theme.primary + '14' },
                ]}
                onPress={() => setSpecies(type)}
              >
                <Text style={[styles.speciesLabel, { color: species === type ? theme.primary : textColor }]}>
                  {getAnimalDisplayName(type, t)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { color: secondaryTextColor }]}>{t('petProfileAge')}</Text>
          <View style={styles.ageRow}>
            <View style={styles.ageInputWrapper}>
              <TextInput
                style={[styles.input, styles.ageInput, { backgroundColor: inputBackground, color: textColor, borderColor: cardBorderColor }]}
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor={theme.textTertiary}
                value={ageYears}
                onChangeText={setAgeYears}
              />
              <Text style={[styles.ageLabel, { color: secondaryTextColor }]}>{t('petProfileAgeYears')}</Text>
            </View>
            <View style={styles.ageInputWrapper}>
              <TextInput
                style={[styles.input, styles.ageInput, { backgroundColor: inputBackground, color: textColor, borderColor: cardBorderColor }]}
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor={theme.textTertiary}
                value={ageMonths}
                onChangeText={setAgeMonths}
              />
              <Text style={[styles.ageLabel, { color: secondaryTextColor }]}>{t('petProfileAgeMonths')}</Text>
            </View>
          </View>

          {error ? <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text> : null}
          {savedMessage ? <Text style={[styles.savedText, { color: theme.success }]}>{savedMessage}</Text> : null}

          <View style={styles.saveButtonWrap}>
            <PrimaryButton title={t('petProfileSave')} onPress={handleSave} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.screenHorizontal,
    paddingBottom: spacing.xxl,
  },
  titleWrap: {
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.label,
    marginTop: spacing.xs,
    marginBottom: spacing.xxs,
  },
  input: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    ...typography.bodySmall,
  },
  speciesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  speciesButton: {
    borderRadius: radius.md,
    borderWidth: 1,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  speciesLabel: {
    ...typography.label,
  },
  ageRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ageInputWrapper: {
    flex: 1,
  },
  ageInput: {
    textAlign: 'center',
  },
  ageLabel: {
    marginTop: spacing.xxs,
    ...typography.caption,
    textAlign: 'center',
  },
  saveButtonWrap: {
    marginTop: spacing.md,
  },
  errorText: {
    marginTop: spacing.xs,
    ...typography.bodySmall,
    fontWeight: '600',
  },
  savedText: {
    marginTop: spacing.xs,
    ...typography.bodySmall,
    fontWeight: '600',
  },
  petRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: spacing.sm,
  },
  petInfo: {
    flex: 1,
    minWidth: 0,
  },
  petName: {
    ...typography.h3,
    flexShrink: 1,
  },
  petMeta: {
    marginTop: spacing.xxs,
    flexShrink: 1,
    ...typography.bodySmall,
  },
});
