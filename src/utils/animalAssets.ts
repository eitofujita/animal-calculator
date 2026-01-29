import { ImageSourcePropType } from 'react-native';
import { AnimalType } from '../domain/types';

const animalAssets: Record<AnimalType, ImageSourcePropType> = {
  [AnimalType.DOG]: require('../../assets/dog.png'),
  [AnimalType.CAT]: require('../../assets/cat.png'),
  [AnimalType.RABBIT]: require('../../assets/rabbit.png'),
  [AnimalType.BIRD]: require('../../assets/bird.png'),
  [AnimalType.HAMSTER]: require('../../assets/hamster.png'),
};

const animalEmojis: Record<AnimalType, string> = {
  [AnimalType.DOG]: '🐕',
  [AnimalType.CAT]: '🐱',
  [AnimalType.RABBIT]: '🐰',
  [AnimalType.BIRD]: '🐦',
  [AnimalType.HAMSTER]: '🐹',
};

export const getAnimalAsset = (animalType: AnimalType): ImageSourcePropType => {
  return animalAssets[animalType];
};

export const getAnimalEmoji = (animalType: AnimalType): string => {
  return animalEmojis[animalType];
};
