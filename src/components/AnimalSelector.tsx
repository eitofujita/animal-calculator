import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimalType } from '../domain/types';
import { getAnimalDisplayName } from '../domain/calculations';

interface AnimalSelectorProps {
  selectedAnimal: AnimalType;
  onSelect: (animal: AnimalType) => void;
}

interface AnimalOption {
  type: AnimalType;
  label: string;
  imageSource: any;
  color: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// 動物データ（画像はassetsフォルダから）
const ANIMAL_DATA: AnimalOption[] = [
  { 
    type: AnimalType.DOG, 
    label: 'Dog', 
    imageSource: require('../../assets/dog.png'),
    color: '#FF9F43'
  },
  { 
    type: AnimalType.CAT, 
    label: 'Cat', 
    imageSource: require('../../assets/cat.png'),
    color: '#54A0FF'
  },
  { 
    type: AnimalType.RABBIT, 
    label: 'Rabbit', 
    imageSource: require('../../assets/rabbit.png'),
    color: '#FF6B6B'
  },
  { 
    type: AnimalType.BIRD, 
    label: 'Bird', 
    imageSource: require('../../assets/bird.png'),
    color: '#1DD1A1'
  },
  { 
    type: AnimalType.HAMSTER, 
    label: 'Hamster', 
    imageSource: require('../../assets/hamster.png'),
    color: '#FECA57'
  },
];

/**
 * Animal type selector component with beautiful card design
 * Horizontal scrollable cards with images
 */
export const AnimalSelector: React.FC<AnimalSelectorProps> = ({
  selectedAnimal,
  onSelect,
}) => {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.header} pointerEvents="box-none">
        <Text style={styles.title}>Choose your partner</Text>
        <Text style={styles.subtitle}>年齢を知りたい動物を選択してください</Text>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        nestedScrollEnabled={true}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        pointerEvents="auto"
      >
        {ANIMAL_DATA.map((animal) => {
          const isSelected = animal.type === selectedAnimal;
          return (
            <TouchableOpacity
              key={animal.type}
              style={[
                styles.card,
                isSelected && [styles.cardSelected, { borderColor: animal.color }],
              ]}
              onPress={() => onSelect(animal.type)}
              activeOpacity={0.8}
            >
              {/* Background Image */}
              <Image
                source={animal.imageSource}
                style={[
                  styles.cardImage,
                  isSelected && styles.cardImageSelected,
                ]}
                resizeMode="cover"
              />

              {/* Checkmark Badge */}
              {isSelected && (
                <View style={[styles.checkmarkBadge, { backgroundColor: animal.color }]}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              )}

              {/* Gradient Overlay & Label */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.overlay}
              >
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>{animal.label}</Text>
                </View>
              </LinearGradient>

              {/* Selection Glow Effect */}
              {isSelected && (
                <View style={[styles.glowEffect, { shadowColor: animal.color }]} />
              )}
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
    marginBottom: 28,
  },
  header: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 4,
  },
  scrollView: {
    marginHorizontal: -4,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    marginHorizontal: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardSelected: {
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1.05 }, { translateY: -4 }],
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
  checkmarkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: 12,
  },
  labelContainer: {
    alignItems: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  glowEffect: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 0,
  },
});
