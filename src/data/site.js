export const brand = {
  name: 'STRYDE',
  email: 'hello@stryde.fit',
  phone: '+1 (512) 555-0148',
  address: '18 Harbor Lane, Suite 400, Austin, TX',
  hours: 'Mon–Fri 6:00–20:00 · Sat 7:00–14:00',
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'workouts', label: 'Workouts' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'progress', label: 'Progress' },
  { id: 'contact', label: 'Contact' },
]

export const highlights = [
  { value: 16, label: 'Sessions to log' },
  { value: 4, label: 'Training styles' },
  { value: 8, label: 'Weeks of charts' },
  { value: 5, label: 'Goals to chase' },
]

export const stepGoal = 10000
export const minuteGoal = 60

export const weekActivity = [
  { day: 'Mon', short: 'Mo', steps: 8420, calories: 460, minutes: 38, hr: 132 },
  { day: 'Tue', short: 'Tu', steps: 9104, calories: 620, minutes: 48, hr: 146 },
  { day: 'Wed', short: 'We', steps: 7540, calories: 505, minutes: 36, hr: 134 },
  { day: 'Thu', short: 'Th', steps: 10220, calories: 710, minutes: 55, hr: 151 },
  { day: 'Fri', short: 'Fr', steps: 8340, calories: 560, minutes: 40, hr: 139 },
  { day: 'Sat', short: 'Sa', steps: 12180, calories: 840, minutes: 68, hr: 158 },
  { day: 'Sun', short: 'Su', steps: 4980, calories: 280, minutes: 22, hr: 116 },
]

export function getTodayIndex(date = new Date()) {
  return (date.getDay() + 6) % 7
}

export function heartZone(hr) {
  if (hr < 120) return 'Zone 1 · recovery'
  if (hr < 140) return 'Zone 2 · aerobic'
  if (hr < 155) return 'Zone 3 · tempo'
  return 'Zone 4 · threshold'
}

export const workouts = [
  {
    id: 'cardio',
    index: '01',
    name: 'Cardio',
    focus: 'Engine',
    summary: 'Runs, rides, and rope work that keep the heart honest.',
    accent: '#ff5a36',
    exercises: [
      {
        id: 'tempo-run',
        name: 'Sunrise Tempo Run',
        duration: '28 min',
        difficulty: 'Intermediate',
        calories: 340,
        progress: 68,
        cue: 'A pace for short sentences, not a sprint.',
      },
      {
        id: 'hill-intervals',
        name: 'Hill Intervals',
        duration: '22 min',
        difficulty: 'Advanced',
        calories: 310,
        progress: 42,
        cue: 'Eight climbs, full walk-down recovery.',
      },
      {
        id: 'recovery-spin',
        name: 'Recovery Spin',
        duration: '35 min',
        difficulty: 'Beginner',
        calories: 220,
        progress: 80,
        cue: 'Light resistance. Nasal breathing if you can.',
      },
      {
        id: 'jump-rope',
        name: 'Jump Rope Flow',
        duration: '15 min',
        difficulty: 'Intermediate',
        calories: 190,
        progress: 25,
        cue: 'Alternate bounce and side swing every minute.',
      },
    ],
  },
  {
    id: 'strength',
    index: '02',
    name: 'Strength Training',
    focus: 'Muscle',
    summary: 'Compound lifts and core work with room to add load.',
    accent: '#d8ff4a',
    exercises: [
      {
        id: 'lower-power',
        name: 'Lower Body Power',
        duration: '40 min',
        difficulty: 'Intermediate',
        calories: 380,
        progress: 55,
        cue: 'Squat, hinge, lunge. Leave two reps in reserve.',
      },
      {
        id: 'push-pull',
        name: 'Push and Pull',
        duration: '35 min',
        difficulty: 'Advanced',
        calories: 320,
        progress: 36,
        cue: 'Superset a press with a row. Rest 75 seconds.',
      },
      {
        id: 'full-body',
        name: 'Foundation Full Body',
        duration: '30 min',
        difficulty: 'Beginner',
        calories: 240,
        progress: 88,
        cue: 'Goblet squat, hip hinge, and a tall plank.',
      },
      {
        id: 'core-stability',
        name: 'Core Stability',
        duration: '18 min',
        difficulty: 'Beginner',
        calories: 140,
        progress: 60,
        cue: 'Slow lowers. Ribs stay heavy on the floor.',
      },
    ],
  },
  {
    id: 'yoga',
    index: '03',
    name: 'Yoga',
    focus: 'Mobility',
    summary: 'Flows for range of motion, balance, and downshifting.',
    accent: '#8fd4ff',
    exercises: [
      {
        id: 'mobility-flow',
        name: 'Mobility Flow',
        duration: '25 min',
        difficulty: 'Beginner',
        calories: 110,
        progress: 74,
        cue: 'Hips, thoracic spine, then a long exhale.',
      },
      {
        id: 'power-vinyasa',
        name: 'Power Vinyasa',
        duration: '40 min',
        difficulty: 'Intermediate',
        calories: 260,
        progress: 48,
        cue: 'One breath per movement. Skip the jump-back if you need to.',
      },
      {
        id: 'evening-restore',
        name: 'Evening Restore',
        duration: '20 min',
        difficulty: 'Beginner',
        calories: 90,
        progress: 92,
        cue: 'Supported poses. Lights low, jaw unclenched.',
      },
      {
        id: 'balance-breath',
        name: 'Balance and Breath',
        duration: '30 min',
        difficulty: 'Intermediate',
        calories: 150,
        progress: 33,
        cue: 'Tree, warrior three, then box breathing.',
      },
    ],
  },
  {
    id: 'hiit',
    index: '04',
    name: 'HIIT',
    focus: 'Conditioning',
    summary: 'Short intervals for days when the clock is tight.',
    accent: '#ffb020',
    exercises: [
      {
        id: 'metabolic-burn',
        name: 'Metabolic Burn',
        duration: '20 min',
        difficulty: 'Advanced',
        calories: 300,
        progress: 45,
        cue: '40 seconds on, 20 off. Five rounds.',
      },
      {
        id: 'tabata-engine',
        name: 'Tabata Engine',
        duration: '16 min',
        difficulty: 'Advanced',
        calories: 250,
        progress: 28,
        cue: '20 seconds hard, 10 easy. Protect your form.',
      },
      {
        id: 'athletic-conditioning',
        name: 'Athletic Conditioning',
        duration: '25 min',
        difficulty: 'Intermediate',
        calories: 330,
        progress: 64,
        cue: 'Shuttle runs, sprawls, and a farmer carry.',
      },
      {
        id: 'beginner-intervals',
        name: 'Beginner Intervals',
        duration: '18 min',
        difficulty: 'Beginner',
        calories: 180,
        progress: 70,
        cue: 'March, squat, and step-back lunge. Rest as written.',
      },
    ],
  },
]

export const difficultyTone = {
  Beginner: 'bg-[#e7f6d8] text-[#1f5a32]',
  Intermediate: 'bg-[#fff1d4] text-[#8a5600]',
  Advanced: 'bg-[#ffe3db] text-[#b43316]',
}

export const progressLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']

export const progressSeries = {
  minutes: {
    unit: 'min',
    values: [186, 210, 198, 244, 260, 238, 290, 312],
  },
  calories: {
    unit: 'kcal',
    values: [4200, 4680, 4410, 5220, 5480, 5010, 5960, 6340],
  },
}

export const workoutMix = [
  { label: 'Cardio', value: 32, color: '#ff5a36' },
  { label: 'Strength', value: 28, color: '#d8ff4a' },
  { label: 'Yoga', value: 18, color: '#8fd4ff' },
  { label: 'HIIT', value: 22, color: '#ffb020' },
]

export const records = [
  { label: '5K time', value: '24:12', note: 'Park loop · September' },
  { label: 'Deadlift', value: '140 kg', note: 'Three-rep set' },
  { label: 'Best streak', value: '21 days', note: 'Training days in a row' },
  { label: 'Longest zone 2', value: '48 min', note: 'Easy Saturday run' },
]

export const initialGoals = [
  {
    id: 'distance',
    title: 'Weekly distance',
    detail: 'Easy runs and rides counted together.',
    current: 14.2,
    target: 20,
    step: 1,
    unit: 'km',
  },
  {
    id: 'strength',
    title: 'Strength sessions',
    detail: 'Lift days completed this week.',
    current: 3,
    target: 4,
    step: 1,
    unit: 'sessions',
  },
  {
    id: 'steps',
    title: 'Step streak',
    detail: 'Days at or above 8,000 steps.',
    current: 5,
    target: 7,
    step: 1,
    unit: 'days',
  },
  {
    id: 'water',
    title: 'Hydration',
    detail: 'Average liters of water each day.',
    current: 2.1,
    target: 3,
    step: 0.2,
    unit: 'L',
  },
  {
    id: 'sleep',
    title: 'Sleep rhythm',
    detail: 'Nights with at least seven hours.',
    current: 6,
    target: 7,
    step: 1,
    unit: 'nights',
  },
]

export const meals = [
  {
    id: 'breakfast',
    course: 'Breakfast',
    name: 'Citrus protein oats',
    description: 'Rolled oats, skyr, orange segments, and crushed pistachio.',
    prep: '12 min',
    calories: 420,
    protein: 32,
    carbs: 48,
    fat: 12,
    fiber: 7,
    tint: '#f6e2c2',
  },
  {
    id: 'lunch',
    course: 'Lunch',
    name: 'Herb chicken grain bowl',
    description: 'Grilled chicken, farro, cucumber, herbs, and olive oil.',
    prep: '20 min',
    calories: 610,
    protein: 46,
    carbs: 58,
    fat: 18,
    fiber: 9,
    tint: '#dceccf',
  },
  {
    id: 'dinner',
    course: 'Dinner',
    name: 'Seared salmon plate',
    description: 'Salmon, quinoa, charred greens, and a lemon yogurt sauce.',
    prep: '25 min',
    calories: 680,
    protein: 44,
    carbs: 42,
    fat: 32,
    fiber: 8,
    tint: '#f7d2c8',
  },
  {
    id: 'snack',
    course: 'Snack',
    name: 'Apple and cottage cheese',
    description: 'A crisp apple, cottage cheese, cinnamon, and a few almonds.',
    prep: '5 min',
    calories: 220,
    protein: 18,
    carbs: 24,
    fat: 6,
    fiber: 4,
    tint: '#d7ecf5',
  },
]

export const contactTopics = ['Coaching', 'Membership', 'Partnerships', 'Support']

export const socials = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
  { id: 'x', label: 'X', href: 'https://x.com' },
]
