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
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(300)).current;

  const openMenu = () => {
    console.log('Menu button pressed!');
    // メニューを表示し、アニメーション値をリセット
    setIsMenuVisible(true);
    // 次のフレームでアニメーションを開始（Modalの表示を待つ）
    requestAnimationFrame(() => {
      slideAnim.setValue(300); // 画面外から開始
      // スライドインアニメーション
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    });
  };

  const closeMenu = () => {
    // スライドアウトアニメーション
    Animated.spring(slideAnim, {
      toValue: 300,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start((finished) => {
      if (finished) {
        setIsMenuVisible(false);
        // アニメーション値をリセットして次回の開閉に備える
        slideAnim.setValue(300);
      }
    });
  };

  const handleMenuAction = (action?: () => void) => {
    closeMenu();
    if (action) {
      setTimeout(action, 300);
    }
  };

  // ref経由でopenMenu関数を外部に公開
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
        <View style={styles.modalOverlay}>
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
              },
            ]}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.menuInnerContainer}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.menuHeader}
              >
                <Text style={styles.menuTitle}>Menu</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeMenu}
                  activeOpacity={0.7}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </LinearGradient>

              <View style={styles.menuContent}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuAction(onAbout)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemIcon}>ℹ️</Text>
                  <Text style={styles.menuItemText}>About</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuAction(onSettings)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemIcon}>⚙️</Text>
                  <Text style={styles.menuItemText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuAction(onHelp)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemIcon}>❓</Text>
                  <Text style={styles.menuItemText}>Help</Text>
                </TouchableOpacity>

                <View style={styles.menuDivider} />

                <View style={styles.menuFooter}>
                  <Text style={styles.menuFooterText}>
                    Pet Age Calculator
                  </Text>
                  <Text style={styles.menuFooterVersion}>Version 1.0.0</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
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
  return (
    <TouchableOpacity
      style={styles.menuButtonInline}
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
      onPressIn={() => {
        console.log('Menu button pressed IN');
      }}
      onPressOut={() => {
        console.log('Menu button pressed OUT');
      }}
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 20,
    borderWidth: 2,
    borderColor: '#667eea',
    alignSelf: 'flex-start',
  },
  menuButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 20,
    borderWidth: 2,
    borderColor: '#667eea',
  },
  hamburger: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#667eea',
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
    right: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
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
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
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
    fontSize: 20,
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
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
    color: '#718096',
    marginBottom: 4,
  },
  menuFooterVersion: {
    fontSize: 12,
    color: '#A0AEC0',
  },
});
