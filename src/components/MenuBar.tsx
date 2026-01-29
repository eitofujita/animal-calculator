import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../contexts/ThemeContext';
import { useThemeColors } from '../theme/useThemeColors';
import { colors, spacing, radius, typography, iconSize } from '../theme/designTokens';

interface MenuBarProps {
  onAbout?: () => void;
  onSettings?: () => void;
  onHelp?: () => void;
}

export interface MenuBarRef {
  openMenu: () => void;
}

/**
 * Menu Bar Component
 * Displays a hamburger menu in the top left corner
 */
export const MenuBar = forwardRef<MenuBarRef, MenuBarProps>(({
  onAbout,
  onSettings,
  onHelp,
}, ref) => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const theme = useThemeColors();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

  const menuBackground = theme.surface;
  const menuTextColor = theme.textPrimary;
  const menuDividerColor = theme.divider;
  const menuFooterTextColor = theme.textTertiary;

  const openMenu = () => {
    console.log('Menu button pressed!');
    // Show menu and reset animation value
    setIsMenuVisible(true);
    // Start animation on next frame (wait for Modal to render)
    requestAnimationFrame(() => {
      slideAnim.setValue(-300); // Start from off-screen (left side)
      overlayOpacity.setValue(0); // Start with transparent overlay
      // Animate both slide-in and overlay fade-in simultaneously
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const closeMenu = () => {
    // Animate both slide-out and overlay fade-out simultaneously
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: -300,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start((finished) => {
      if (finished) {
        setIsMenuVisible(false);
        // Reset animation values for next open/close
        slideAnim.setValue(-300);
        overlayOpacity.setValue(0);
      }
    });
  };

  const handleMenuAction = (action?: () => void) => {
    closeMenu();
    if (action) {
      setTimeout(action, 300);
    }
  };

  // Expose openMenu function via ref
  useImperativeHandle(ref, () => ({
    openMenu,
  }));

  return (
    <>
      <Modal
        visible={isMenuVisible}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: overlayOpacity }]}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            activeOpacity={1}
            onPress={closeMenu}
          />
          <Animated.View
            style={[
              styles.menuContainer,
              {
                transform: [{ translateX: slideAnim }],
                backgroundColor: menuBackground,
              },
            ]}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.menuInnerContainer}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.menuHeader}
              >
                <Text style={styles.menuTitle}>{t('menu')}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeMenu}
                  activeOpacity={0.7}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </LinearGradient>

              <View style={styles.menuContent}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuAction(onAbout)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.menuItemText, { color: menuTextColor }]}>{t('about')}</Text>
                </TouchableOpacity>
                <View style={[styles.menuItemSeparator, { backgroundColor: menuDividerColor }]} />

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuAction(onSettings)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.menuItemText, { color: menuTextColor }]}>{t('settings')}</Text>
                </TouchableOpacity>
                <View style={[styles.menuItemSeparator, { backgroundColor: menuDividerColor }]} />

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuAction(onHelp)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.menuItemText, { color: menuTextColor }]}>{t('help')}</Text>
                </TouchableOpacity>

                <View style={[styles.menuDivider, { backgroundColor: menuDividerColor }]} />

                <View style={styles.menuFooter}>
                  <Text style={[styles.menuFooterText, { color: menuFooterTextColor }]}>
                    {t('appName')}
                  </Text>
                  <Text style={[styles.menuFooterVersion, { color: menuFooterTextColor }]}>{t('appVersion')}</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </>
  );
});

MenuBar.displayName = 'MenuBar';

/**
 * Menu Button Component
 * Renders the hamburger menu button
 */
export const MenuButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const theme = useThemeColors();
  return (
    <TouchableOpacity
      style={[
        styles.menuButtonInline,
        {
          backgroundColor: theme.surface,
          borderColor: theme.primary,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.hamburger}>
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButtonContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    zIndex: 99999,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'box-none',
    elevation: 25,
  },
  menuButtonInline: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderWidth: 2,
    zIndex: 1000,
    overflow: 'hidden',
  },
  hamburger: {
    width: iconSize.sm,
    height: 15,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  menuInnerContainer: {
    flex: 1,
  },
  menuHeader: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  menuContent: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  menuItemSeparator: {
    height: 1,
    marginHorizontal: 20,
  },
  menuDivider: {
    height: 1,
    marginVertical: 16,
    marginHorizontal: 20,
  },
  menuFooter: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  menuFooterText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuFooterVersion: {
    fontSize: 12,
  },
});
