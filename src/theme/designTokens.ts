/**
 * Animal Manager — UI Design Tokens
 * プラットフォーム: iOS/Android (React Native)
 * 基準: iPhone 15 (393×852 pt)
 */

// ========== 色 ==========
export const colors = {
  // ベース（白基調）
  background: '#FAFBFC',
  backgroundSecondary: '#FFFFFF',
  surface: '#FFFFFF',

  // アクセント（落ち着いたブルー）
  primary: '#4A90E2',
  primaryLight: '#6BA3E8',
  primaryDark: '#3A7BC8',

  // テキスト
  textPrimary: '#1A202C',
  textSecondary: '#4A5568',
  textTertiary: '#718096',
  textOnPrimary: '#FFFFFF',

  // セマンティック
  success: '#2D9D78',
  warning: '#E67E22',
  error: '#C53030',
  info: '#4A90E2',

  // ボーダー・区切り
  border: '#E2E8F0',
  borderLight: '#EDF2F7',
  divider: '#E2E8F0',

  // ダークモード
  dark: {
    background: '#121212',
    backgroundSecondary: '#1A1A1A',
    surface: '#1F1F1F',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#718096',
    border: '#333333',
    divider: '#404040',
  },
} as const;

// ========== タイポグラフィ ==========
export const typography = {
  // 見出し
  h1: { fontSize: 26, fontWeight: '700' as const, lineHeight: 34, letterSpacing: 0.3 },
  h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28, letterSpacing: 0.2 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24, letterSpacing: 0.2 },

  // 本文
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },

  // 数値・強調（次の予定日/時間/年齢を目立たせる）
  display: { fontSize: 32, fontWeight: '700' as const, lineHeight: 40, letterSpacing: -0.5 },
  displaySmall: { fontSize: 24, fontWeight: '700' as const, lineHeight: 32 },
  label: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16, letterSpacing: 0.5 },

  // キャプション
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
} as const;

// ========== 余白・スペーシング ==========
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,

  // 画面パディング（広め）
  screenHorizontal: 20,
  screenTop: 16,
  screenBottom: 24,
  // ヘッダー左右余白（設定・リマインダーボタンと重ならないように）
  headerPaddingHorizontal: 56,
} as const;

// ========== 角丸 ==========
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

// ========== 影（控えめ） ==========
export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  fab: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

// ========== タップ領域 ==========
export const touchTarget = {
  minHeight: 44,
  minWidth: 44,
  buttonPaddingVertical: 14,
  buttonPaddingHorizontal: 20,
} as const;

// ========== アイコン方針 ==========
export const iconSize = {
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
} as const;
