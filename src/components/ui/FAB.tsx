import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadows, spacing } from '../../theme/designTokens';

const SIZE = 56;

interface FABProps {
  onPress: () => void;
}

export const FAB: React.FC<FABProps> = ({ onPress }) => {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 16) + 16;

  return (
    <View style={[styles.wrap, { bottom }]} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.fab}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: spacing.screenHorizontal,
    left: undefined,
    alignItems: 'flex-end',
  },
  fab: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.fab,
  },
  icon: {
    color: colors.textOnPrimary,
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
});
