import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimalType } from '../domain/types';
import { getAnimalDisplayName } from '../domain/calculations';
import { getAnimalAsset } from '../utils/animalAssets';
import { useI18n } from '../i18n/I18nContext';
import { useThemeColors } from '../theme/useThemeColors';
import { spacing, radius, typography, colors } from '../theme/designTokens';

interface AnimalSelectorProps {
  selectedAnimal: AnimalType;
  onSelect: (animal: AnimalType) => void;
}

const ANIMAL_TYPES = [AnimalType.DOG, AnimalType.CAT, AnimalType.RABBIT, AnimalType.BIRD, AnimalType.HAMSTER] as const;

/**
 * Animal type selector. Spec: 選択中は Primary 枠。
 */
export const AnimalSelector: React.FC<AnimalSelectorProps> = ({
  selectedAnimal,
  onSelect,
}) => {
  const { t } = useI18n();
  const theme = useThemeColors();

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.header} pointerEvents="box-none">
        <Text style={[styles.title, { color: theme.textPrimary }]}>{t('chooseYourPartner')}</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{t('selectAnimal')}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        pointerEvents="auto"
      >
        {ANIMAL_TYPES.map((type) => {
          const isSelected = type === selectedAnimal;
          return (
            <TouchableOpacity
              key={type}
              style={[
                styles.card,
                { borderColor: theme.border },
                isSelected && { borderColor: theme.primary, borderWidth: 3 },
              ]}
              onPress={() => onSelect(type)}
              activeOpacity={0.8}
            >
              <Image
                source={getAnimalAsset(type)}
                style={[styles.cardImage, isSelected && styles.cardImageSelected]}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.overlay}
              >
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>{getAnimalDisplayName(type, t)}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const CARD_WIDTH = 120;
const CARD_HEIGHT = 160;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xxs,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    marginTop: spacing.xxs,
  },
  scrollView: {
    marginHorizontal: -spacing.xxs,
  },
  scrollContent: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: radius.xl,
    marginHorizontal: spacing.xs,
    overflow: 'hidden',
    backgroundColor: colors.borderLight,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.9,
  },
  cardImageSelected: {
    opacity: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: spacing.sm,
  },
  labelContainer: {
    alignItems: 'center',
  },
  label: {
    color: colors.textOnPrimary,
    ...typography.body,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
