/**
 * English translations
 */
export const en = {
  // App
  appName: 'Pet Age Calculator',
  appVersion: 'Version 1.0.0',
  
  // Header
  headerTitle: 'Pet Age Calculator',
  
  // Menu
  menu: 'Menu',
  about: 'About',
  settings: 'Settings',
  help: 'Help',
  
  // Animal Selector
  chooseYourPartner: 'Choose your animal',
  selectAnimal: 'Select an animal to check its age',
  
  // Animals
  dog: 'Dog',
  cat: 'Cat',
  rabbit: 'Rabbit',
  bird: 'Bird',
  hamster: 'Hamster',
  
  // Age Input
  age: 'Age',
  years: 'years',
  months: 'months',
  yearsOnly: 'Years only',
  yearsAndMonths: 'Years + Months',
  
  // Current Selection
  currentSelection: 'Current Selection',
  
  // Buttons
  calculate: 'Calculate',
  reset: 'Reset',
  
  // Result Card
  humanAgeEquivalent: 'Human Age Equivalent',
  animal: 'Animal',
  
  // Error Messages
  error: 'Error',
  pleaseEnterAge: 'Please enter at least years or months',
  ageCannotBeNegative: 'Age cannot be negative',
  monthsMustBeValid: 'Months must be between 0 and 11',
  warningAgeExceeds: 'Warning: Age exceeds 30 years. Result may be inaccurate.',
  
  // Footer
  calculationEstimate: 'This calculation provides an estimate based on common formulas',
  
  // Settings
  general: 'General',
  language: 'Language',
  theme: 'Theme',
  data: 'Data',
  autoSave: 'Auto-save',
  enabled: 'Enabled',
  disabled: 'Disabled',
  light: 'Light',
  dark: 'Dark',
  aboutSection: 'About',
  version: 'Version',
  
  // Language names
  english: 'English',
  japanese: 'Japanese',

  // Tabs
  tabHome: 'Home',
  tabCalculator: 'Calculator',
  tabPet: 'Pet',
  tabReminders: 'Reminders',
  tabWeightLog: 'Weight',
  tabPro: 'Pro',

  // Auth
  authTitle: 'Welcome',
  authDescription: 'Sign in to keep your pet data safe. For now we start with anonymous login.',
  authContinue: 'Continue',
  authMissingConfigTitle: 'Firebase configuration is missing.',
  authMissingConfigDescription: 'Add Firebase config (environment variables in .env) to enable login.',
  authFailed: 'Login failed. Please try again.',
  authGoogle: 'Continue with Google',
  authGoogleUnavailable: 'Google login is not configured yet.',
  authGoogleFailed: 'Google login failed. Please try again.',

  // Home
  homeTitle: 'Home',
  homeUpcoming: "Today's schedule",
  homeNextSchedule: 'Next schedule',
  homeNextReminderEmpty: 'No reminders yet. Add one from the Reminders tab.',
  homeNoPetTitle: 'Add your first pet',
  homeNoPetDescription: 'Register your pet to show its photo on the home screen.',
  homeAddPet: 'Add pet',
  homePetSectionTitle: 'Your pet',
  homeAddReminder: 'Add',
  daysLeft: 'In {count} days',
  daysLeftToday: 'Today',
  daysLeftTomorrow: 'Tomorrow',
  addReminderFromAge: 'Add reminder for this age',

  // Pet Profile
  petProfileTitle: 'Pet profile',
  petProfileCurrent: 'Current pet',
  petProfileFormTitle: 'Pet details',
  petProfileName: 'Name',
  petProfileNamePlaceholder: 'e.g. Pochi',
  petProfileSpecies: 'Species',
  petProfileAge: 'Age',
  petProfileAgeYears: 'Years',
  petProfileAgeMonths: 'Months',
  petProfileSave: 'Save',
  petProfileSaved: 'Saved',
  petProfileValidationName: 'Please enter a name',

  // Reminders
  remindersTitle: 'Reminders',
  remindersEmpty: 'No reminders yet. This screen will manage medication, vaccines, and visits.',
  remindersFilterAll: 'All',
  remindersFilterMedication: 'Medication',
  remindersFilterVaccine: 'Vaccine',
  remindersFilterVet: 'Vet',
  firstReminderCta: 'Create your first reminder',

  // Weight Log
  weightLogTitle: 'Weight log',
  weightLogEmpty: 'No weight records yet. We will store the latest 7 days here.',
  weightLogNoData: 'No weight records yet.',
  weightLogAddRecord: 'Add record',
  weightLogLatest: 'Latest weight',
  weightLogKg: 'kg',

  // Health Log (健康記録)
  healthLogTitle: 'Health log',
  healthLogSubtitle: 'Record weight, diet, excretion, exercise, sleep, and symptoms by date.',
  healthLogEmpty: 'No entries for this date. Tap a category below to add.',
  healthLogDate: 'Date',
  healthLogSelectDate: 'Select date',
  healthLogCalendarTitle: 'Select date',
  healthLogCategoryWeight: 'Weight',
  healthLogCategoryDiet: 'Diet / Meals',
  healthLogCategoryExcretion: 'Excretion',
  healthLogCategoryExercise: 'Walk / Exercise',
  healthLogCategorySleep: 'Sleep',
  healthLogCategorySymptoms: 'Symptoms',
  healthLogAddWeight: 'Add weight (kg)',
  healthLogAddDiet: 'Add diet note',
  healthLogAddExcretion: 'Record excretion',
  healthLogAddExercise: 'Add exercise (min)',
  healthLogAddSleep: 'Add sleep (hours)',
  healthLogAddSymptoms: 'Add symptoms',
  healthLogPlaceholderWeight: 'e.g. 5.2',
  healthLogPlaceholderDiet: 'e.g. Ate normally',
  healthLogPlaceholderExcretion: 'e.g. Normal',
  healthLogPlaceholderExercise: 'e.g. 30',
  healthLogPlaceholderSleep: 'e.g. 8',
  healthLogPlaceholderSymptoms: 'e.g. Vomiting, diarrhea',
  healthLogUnitKg: 'kg',
  healthLogUnitMin: 'min',
  healthLogUnitHours: 'hours',
  healthLogSave: 'Save',
  healthLogCancel: 'Cancel',
  healthLogDelete: 'Delete',
  healthLogDeleteConfirm: 'Remove this entry?',
  healthLogExcretionNormal: 'Normal',
  healthLogExcretionSoft: 'Soft',
  healthLogExcretionDiarrhea: 'Diarrhea',
  healthLogExcretionConstipation: 'Constipation',
  healthLogSymptomVomiting: 'Vomiting',
  healthLogSymptomDiarrhea: 'Diarrhea',
  healthLogSymptomOther: 'Other',

  // Pro
  proTitle: 'Pro',
  proDescription: 'Unlock unlimited reminders, pets, and weight logs.',
  proPrice: 'One-time purchase: ¥1,200',
  proPaywallTitle: 'Unlock everything with Pro',
  proValue1: 'Unlimited reminders',
  proValue2: 'Multiple pets',
  proValue3: 'Unlimited weight log',
  proPriceOneTime: '¥1,200',
  proPriceSubtext: 'One-time purchase, yours forever',
  proPurchase: 'Purchase',
  proRestore: 'Restore purchase',
  proLater: 'Maybe later',
  calculatorTitle: 'Age calculator',
};
