import { en } from './en';

/**
 * Japanese translations
 * Type-safe: Must have all keys from en
 */
export const ja: typeof en = {
  // App
  appName: 'ペット年齢計算機',
  appVersion: 'バージョン 1.0.0',
  
  // Header
  headerTitle: 'ペット年齢計算機',
  
  // Menu
  menu: 'メニュー',
  about: 'アプリについて',
  settings: '設定',
  help: 'ヘルプ',
  
  // Animal Selector
  chooseYourPartner: '動物を選ぶ',
  selectAnimal: '年齢を知りたい動物を選択してください',
  
  // Animals
  dog: '犬',
  cat: '猫',
  rabbit: 'うさぎ',
  bird: '鳥',
  hamster: 'ハムスター',
  
  // Age Input
  age: '年齢',
  years: '年',
  months: 'ヶ月',
  yearsOnly: '年',
  yearsAndMonths: '年 + ヶ月',
  
  // Current Selection
  currentSelection: '現在の選択',
  
  // Buttons
  calculate: '計算',
  reset: 'リセット',
  
  // Result Card
  humanAgeEquivalent: '人間年齢',
  animal: '動物',
  
  // Error Messages
  error: 'エラー',
  pleaseEnterAge: '年またはヶ月を入力してください',
  ageCannotBeNegative: '年齢は負の値にできません',
  monthsMustBeValid: 'ヶ月は0から11の間で入力してください',
  warningAgeExceeds: '警告: 年齢が30年を超えています。結果が不正確な可能性があります。',
  
  // Footer
  calculationEstimate: 'この計算は一般的な計算式に基づいた概算です',
  
  // Settings
  general: '一般',
  language: '言語',
  theme: 'テーマ',
  data: 'データ',
  autoSave: '自動保存',
  enabled: '有効',
  disabled: '無効',
  light: 'ライト',
  dark: 'ダーク',
  aboutSection: 'アプリについて',
  version: 'バージョン',
  
  // Language names
  english: '英語',
  japanese: '日本語',

  // Tabs
  tabHome: 'ホーム',
  tabCalculator: '計算',
  tabPet: 'ペット',
  tabReminders: 'リマインダー',
  tabWeightLog: '体重',
  tabPro: 'Pro',

  // Auth
  authTitle: 'ようこそ',
  authDescription: 'ペット情報を守るためにログインが必要です。まずは匿名ログインから始めます。',
  authContinue: '続ける',
  authMissingConfigTitle: 'Firebaseの設定が未入力です。',
  authMissingConfigDescription: 'Firebase の設定（.env の環境変数）を追加してください。',
  authFailed: 'ログインに失敗しました。もう一度お試しください。',
  authGoogle: 'Googleで続ける',
  authGoogleUnavailable: 'Googleログインの設定がまだありません。',
  authGoogleFailed: 'Googleログインに失敗しました。もう一度お試しください。',

  // Home
  homeTitle: 'ホーム',
  homeUpcoming: '今日の予定',
  homeNextSchedule: '次の予定',
  homeNextReminderEmpty: '予定はまだありません。リマインダーから追加できます。',
  homeNoPetTitle: '最初のペットを登録',
  homeNoPetDescription: 'ペットを登録するとホームに写真が表示されます。',
  homeAddPet: 'ペットを追加',
  homePetSectionTitle: 'あなたのペット',
  homeAddReminder: '追加',
  daysLeft: 'あと{count}日',
  daysLeftToday: '今日',
  daysLeftTomorrow: '明日',
  addReminderFromAge: 'この年齢でリマインダーを追加',

  // Pet Profile
  petProfileTitle: 'ペット情報',
  petProfileCurrent: '現在のペット',
  petProfileFormTitle: 'ペットの登録',
  petProfileName: '名前',
  petProfileNamePlaceholder: '例：ポチ',
  petProfileSpecies: '種類',
  petProfileAge: '年齢',
  petProfileAgeYears: '年',
  petProfileAgeMonths: 'ヶ月',
  petProfileSave: '保存',
  petProfileSaved: '保存しました',
  petProfileValidationName: '名前を入力してください',

  // Reminders
  remindersTitle: 'リマインダー',
  remindersEmpty: 'まだリマインダーがありません。投薬・ワクチン・通院をここで管理します。',
  remindersFilterAll: 'すべて',
  remindersFilterMedication: '投薬',
  remindersFilterVaccine: 'ワクチン',
  remindersFilterVet: '通院',
  firstReminderCta: '最初のリマインダーを作ろう',

  // Weight Log
  weightLogTitle: '体重ログ',
  weightLogEmpty: '体重の記録はまだありません。直近7日分を保存します。',
  weightLogNoData: 'まだ体重記録がありません。',
  weightLogAddRecord: '記録を追加',
  weightLogLatest: '最新の体重',
  weightLogKg: 'kg',

  // Health Log (健康記録)
  healthLogTitle: '健康記録',
  healthLogSubtitle: '体重・食事・排泄・散歩/運動・睡眠・症状を日付で記録します。',
  healthLogEmpty: 'この日はまだ記録がありません。下のカテゴリから追加できます。',
  healthLogDate: '日付',
  healthLogSelectDate: '日付を選択',
  healthLogCalendarTitle: '日付を選択',
  healthLogCategoryWeight: '体重',
  healthLogCategoryDiet: '食事',
  healthLogCategoryExcretion: '排泄',
  healthLogCategoryExercise: '散歩・運動',
  healthLogCategorySleep: '睡眠',
  healthLogCategorySymptoms: '症状',
  healthLogAddWeight: '体重を追加 (kg)',
  healthLogAddDiet: '食事メモを追加',
  healthLogAddExcretion: '排泄を記録',
  healthLogAddExercise: '運動を追加 (分)',
  healthLogAddSleep: '睡眠を追加 (時間)',
  healthLogAddSymptoms: '症状を追加',
  healthLogPlaceholderWeight: '例: 5.2',
  healthLogPlaceholderDiet: '例: 普段通り',
  healthLogPlaceholderExcretion: '例: 正常',
  healthLogPlaceholderExercise: '例: 30',
  healthLogPlaceholderSleep: '例: 8',
  healthLogPlaceholderSymptoms: '例: 嘔吐、下痢',
  healthLogUnitKg: 'kg',
  healthLogUnitMin: '分',
  healthLogUnitHours: '時間',
  healthLogSave: '保存',
  healthLogCancel: 'キャンセル',
  healthLogDelete: '削除',
  healthLogDeleteConfirm: 'この記録を削除しますか？',
  healthLogExcretionNormal: '正常',
  healthLogExcretionSoft: 'やや軟便',
  healthLogExcretionDiarrhea: '下痢',
  healthLogExcretionConstipation: '便秘',
  healthLogSymptomVomiting: '嘔吐',
  healthLogSymptomDiarrhea: '下痢',
  healthLogSymptomOther: 'その他',

  // Pro
  proTitle: 'Pro',
  proDescription: 'リマインダー無制限、複数ペット、体重ログ無制限を解放します。',
  proPrice: '買い切り：¥1,200',
  proPaywallTitle: 'Pro で全部使う',
  proValue1: '無制限リマインダー',
  proValue2: '複数ペット',
  proValue3: 'ログ無制限',
  proPriceOneTime: '¥1,200',
  proPriceSubtext: '一度の購入でずっと',
  proPurchase: '購入する',
  proRestore: '購入を復元',
  proLater: '後で',
  calculatorTitle: '年齢換算',
};
