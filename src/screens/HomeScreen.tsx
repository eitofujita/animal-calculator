import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useI18n } from '../i18n/I18nContext';
import { useThemeColors } from '../theme/useThemeColors';
import { loadPets } from '../utils/storage';
import { Pet } from '../domain/types';
import { getAnimalAsset } from '../utils/animalAssets';
import { getAnimalDisplayName } from '../domain/calculations';
import { AppTabParamList } from '../navigation/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { colors, typography, spacing, radius, shadows } from '../theme/designTokens';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { SecondaryButton } from '../components/ui/SecondaryButton';
import { RemindersHeaderButton } from '../components/ui/RemindersHeaderButton';
import { SettingsHeaderButton } from '../components/ui/SettingsHeaderButton';

type HomeNavigationProp = BottomTabNavigationProp<AppTabParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const { t } = useI18n();
  const theme = useThemeColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeNavigationProp>();
  const isFocused = useIsFocused();
  const [primaryPet, setPrimaryPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (!isFocused) return;
    const fetchPets = async () => {
      const pets = await loadPets();
      setPrimaryPet(pets.length > 0 ? pets[0] : null);
    };
    fetchPets();
  }, [isFocused]);

  const handleAddPet = () => navigation.navigate('PetProfile');
  const handleAddReminder = () => navigation.getParent()?.navigate('Reminders' as never);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <SettingsHeaderButton />
      <RemindersHeaderButton />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.screenTop }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingHorizontal: spacing.headerPaddingHorizontal }]}>
          <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={2}>
            {t('homeTitle')}
          </Text>
          {primaryPet && (
            <TouchableOpacity
              style={[styles.petSwitcher, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => navigation.navigate('PetProfile')}
              activeOpacity={0.8}
            >
              <Image source={getAnimalAsset(primaryPet.species)} style={styles.petSwitcherImage} />
              <Text style={[styles.petSwitcherName, { color: theme.textPrimary }]} numberOfLines={1}>
                {primaryPet.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }, shadows.card]}>
          <Text style={[styles.cardLabel, { color: theme.textTertiary }]}>{t('homeNextSchedule')}</Text>
          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>{t('homeUpcoming')}</Text>
          <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
            {t('homeNextReminderEmpty')}
          </Text>
          <TouchableOpacity onPress={handleAddReminder} style={styles.cardAddReminder} activeOpacity={0.8}>
            <Text style={[styles.cardAddReminderText, { color: theme.primary }]}>{t('homeAddReminder')}</Text>
          </TouchableOpacity>
        </View>

        {!primaryPet && (
          <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }, shadows.card]}>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>{t('homeNoPetTitle')}</Text>
            <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>{t('homeNoPetDescription')}</Text>
            <View style={styles.cardButton}>
              <PrimaryButton title={t('homeAddPet')} onPress={handleAddPet} />
            </View>
          </View>
        )}

        {primaryPet && (
          <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }, shadows.card]}>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>{t('homePetSectionTitle')}</Text>
            <View style={styles.petRow}>
              <Image source={getAnimalAsset(primaryPet.species)} style={styles.petImage} />
              <View style={styles.petInfo}>
                <Text style={[styles.petName, { color: theme.textPrimary }]}>{primaryPet.name}</Text>
                <Text style={[styles.petMeta, { color: theme.textSecondary }]}>
                  {getAnimalDisplayName(primaryPet.species, t)}
                </Text>
              </View>
            </View>
            <View style={styles.cardButton}>
              <SecondaryButton title={t('homeAddPet')} onPress={handleAddPet} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing.screenTop,
    paddingBottom: spacing.screenBottom,
  },
  header: {
    minHeight: 56,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  petSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    marginTop: spacing.xs,
    minHeight: 44,
  },
  petSwitcherImage: { width: 32, height: 32, borderRadius: 16, marginRight: spacing.sm },
  petSwitcherName: { ...typography.h3, flex: 1 },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  cardLabel: { ...typography.label, marginBottom: spacing.xxs },
  cardTitle: { ...typography.h2, marginBottom: spacing.xs, flexShrink: 1 },
  cardSubtitle: { ...typography.bodySmall, flexShrink: 1 },
  cardAddReminder: { marginTop: spacing.sm },
  cardAddReminderText: { ...typography.bodySmall, fontWeight: '600' },
  cardButton: { marginTop: spacing.md },
  petRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs },
  petImage: { width: 64, height: 64, borderRadius: 32, marginRight: spacing.md },
  petInfo: { flex: 1, minWidth: 0 },
  petName: { ...typography.h3, marginBottom: 2, flexShrink: 1 },
  petMeta: { ...typography.bodySmall, flexShrink: 1 },
});
