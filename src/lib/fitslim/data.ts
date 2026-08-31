export const MEMBER = {
  name: "Sarah Johnson",
  firstName: "Sarah",
  memberId: "FS-10482",
  memberSince: "March 2026",
  age: 42,
  goals: [
    "Healthy weight management",
    "Improve nutrition consistency",
    "Increase daily movement",
    "Improve hydration",
  ],
  focusAreas: ["Protein", "Hydration", "Movement", "Sleep", "Healthy routines"],
  favoriteFoods: ["Greek yogurt", "Chicken", "Salmon", "Berries", "Avocado"],
  dietaryPreference: "Balanced",
  activityLevel: "Beginner",
  responseStyle: "Simple and encouraging",
};

export type AdminUserRole = "admin" | "member";

export type AdminUserStatus = "active" | "invited" | "suspended";

export type AdminUser = {
  id: string;
  name: string;
  firstName: string;
  email: string;
  memberId: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  memberSince: string;
  lastActive: string | null;
  goals: string[];
};

export type QuickPromptItem = { icon: string; label: string; prompt: string };

export const QUICK_PROMPTS: QuickPromptItem[] = [
  {
    icon: "🍳",
    label: "Give me a high-protein breakfast",
    prompt: "Give me a high-protein breakfast I can make in 10 minutes.",
  },
  {
    icon: "🥗",
    label: "Help me plan healthy meals this week",
    prompt: "Help me plan healthy meals this week.",
  },
  { icon: "🛒", label: "Create my grocery list", prompt: "Create my grocery list." },
  {
    icon: "🍽️",
    label: "What should I order at a restaurant?",
    prompt: "What should I order at a restaurant?",
  },
  {
    icon: "✈️",
    label: "Help me stay on track while traveling",
    prompt: "Help me stay on track while traveling.",
  },
  { icon: "💧", label: "How can I drink more water?", prompt: "How can I drink more water?" },
  {
    icon: "🚶",
    label: "Create a beginner walking plan",
    prompt: "Create a beginner walking plan.",
  },
  {
    icon: "😴",
    label: "Help me build a better evening routine",
    prompt: "Help me build a better evening routine.",
  },
  {
    icon: "💉",
    label: "Explain GLP-1 nutrition basics",
    prompt: "Explain GLP-1 nutrition basics.",
  },
  {
    icon: "🩺",
    label: "What should I ask my provider?",
    prompt: "What should I ask my provider at my next visit?",
  },
];

export const EXPLORE_TOPICS = [
  {
    slug: "nutrition",
    icon: "🥗",
    title: "Nutrition",
    blurb: "Balanced plates, protein, fiber and simple swaps.",
  },
  {
    slug: "recipes",
    icon: "🍳",
    title: "Recipes",
    blurb: "Quick, everyday recipes you'll actually make.",
  },
  {
    slug: "restaurants",
    icon: "🍽️",
    title: "Restaurants",
    blurb: "Ordering strategies for any type of menu.",
  },
  {
    slug: "travel",
    icon: "✈️",
    title: "Travel",
    blurb: "Stay steady on the road, in airports and hotels.",
  },
  {
    slug: "hydration",
    icon: "💧",
    title: "Hydration",
    blurb: "Practical ways to drink more water each day.",
  },
  {
    slug: "exercise",
    icon: "🚶",
    title: "Exercise",
    blurb: "Beginner-friendly movement you can sustain.",
  },
  {
    slug: "habits",
    icon: "🌱",
    title: "Healthy Habits",
    blurb: "Small routines that stack into big change.",
  },
  { slug: "sleep", icon: "😴", title: "Sleep", blurb: "Evening routines and wind-down ideas." },
  {
    slug: "stress",
    icon: "🧘",
    title: "Stress",
    blurb: "Mindful eating and calmer daily rhythms.",
  },
  {
    slug: "glp1",
    icon: "💉",
    title: "GLP-1 Education",
    blurb: "General education to pair with your provider's guidance.",
  },
];

export const TOPIC_DETAIL: Record<string, { questions: string[]; prompts: string[] }> = {
  nutrition: {
    questions: [
      "What does a balanced plate look like?",
      "How much protein should a meal have?",
      "How do I add more fiber?",
    ],
    prompts: [
      "Build me a balanced dinner",
      "Give me 5 high-fiber snacks",
      "Make my lunch more filling",
    ],
  },
  recipes: {
    questions: [
      "What can I cook in 15 minutes?",
      "Any high-protein breakfasts?",
      "Easy sheet-pan dinners?",
    ],
    prompts: [
      "Give me a 5-minute breakfast recipe",
      "Show me a high-protein dinner",
      "Something I can meal prep",
    ],
  },
  restaurants: {
    questions: [
      "What should I order at Italian?",
      "How do I handle buffets?",
      "Best coffee shop orders?",
    ],
    prompts: [
      "Help me order at a Mexican restaurant",
      "Lower-sugar drink ideas",
      "Balanced fast food options",
    ],
  },
  travel: {
    questions: [
      "What snacks travel well?",
      "How do I stay hydrated on flights?",
      "Hotel room movement ideas?",
    ],
    prompts: [
      "Plan a 4-day trip to Denver",
      "Airport food strategies",
      "Hotel-friendly breakfasts",
    ],
  },
  hydration: {
    questions: [
      "How much water is typical?",
      "How do I remember to drink?",
      "Do other drinks count?",
    ],
    prompts: [
      "Build me a hydration routine",
      "Flavor ideas without sugar",
      "Morning hydration habit",
    ],
  },
  exercise: {
    questions: [
      "How do I start walking?",
      "What is strength training?",
      "How often should I move?",
    ],
    prompts: [
      "Create a beginner walking plan",
      "10-minute movement break",
      "Movement while traveling",
    ],
  },
  habits: {
    questions: [
      "How do habits stick?",
      "What is habit stacking?",
      "How do I restart after a break?",
    ],
    prompts: [
      "Help me build a morning routine",
      "Habit ideas for busy weeks",
      "Help me restart this week",
    ],
  },
  sleep: {
    questions: [
      "What is a wind-down routine?",
      "Should I eat before bed?",
      "How do I limit screens?",
    ],
    prompts: [
      "Help me build a better evening routine",
      "Calm bedtime checklist",
      "Simple wind-down ideas",
    ],
  },
  stress: {
    questions: [
      "What is mindful eating?",
      "How do I handle stress snacking?",
      "Quick calming practices?",
    ],
    prompts: ["Teach me mindful eating", "Help with evening snacking", "A 3-minute reset"],
  },
  glp1: {
    questions: [
      "What foods are easier to tolerate when my appetite is reduced?",
      "Why is protein emphasized?",
      "What should I discuss with my provider?",
    ],
    prompts: ["Explain GLP-1 nutrition basics", "Gentle meal ideas", "Questions for my provider"],
  },
};

export type SavedItem = {
  id: string;
  title: string;
  category: "Recipes" | "Meal Plans" | "Tips" | "Conversations";
  savedAt: string;
  summary: string;
  content: string;
};

export const INITIAL_SAVED: SavedItem[] = [
  {
    id: "s1",
    title: "5-Minute Protein Breakfasts",
    category: "Recipes",
    savedAt: "Aug 19, 2026",
    summary: "Five quick breakfasts built around protein.",
    content:
      "Five quick breakfasts built around protein. Try a Greek yogurt power bowl, an egg scramble, or overnight oats with protein powder.",
  },
  {
    id: "s2",
    title: "Healthy Restaurant Ordering Guide",
    category: "Tips",
    savedAt: "Aug 18, 2026",
    summary: "How to read any menu with confidence.",
    content:
      "How to read any menu with confidence. Look for grilled, baked or steamed options, ask for sauces on the side, and lead with vegetables and a lean protein.",
  },
  {
    id: "s3",
    title: "3-Day Easy Meal Plan",
    category: "Meal Plans",
    savedAt: "Aug 17, 2026",
    summary: "Higher-protein breakfasts, lunches and dinners.",
    content:
      "A higher-protein plan across three easy days. Breakfasts, lunches and dinners built around lean protein, vegetables and whole grains.",
  },
  {
    id: "s4",
    title: "Beginner Walking Routine",
    category: "Tips",
    savedAt: "Aug 15, 2026",
    summary: "A gentle two-week walking build-up.",
    content:
      "A gentle two-week walking build-up. Start with 10–15 minute walks and add a few minutes each day as you feel ready.",
  },
];

export const CONVERSATION_HISTORY = [
  {
    group: "Today",
    items: [
      {
        id: "h1",
        title: "High-protein breakfast ideas",
        preview: "Greek yogurt power bowl and 3 alternates",
        prompt: "Give me a high-protein breakfast I can make in 10 minutes.",
      },
    ],
  },
  {
    group: "Yesterday",
    items: [
      {
        id: "h2",
        title: "Restaurant choices while traveling",
        preview: "Airport and casual dining strategies",
        prompt: "What should I order at a restaurant?",
      },
    ],
  },
  {
    group: "Aug 18",
    items: [
      {
        id: "h3",
        title: "Beginner walking plan",
        preview: "A two-week build from 10 to 25 minutes",
        prompt: "Create a beginner walking plan.",
      },
    ],
  },
  {
    group: "Aug 16",
    items: [
      {
        id: "h4",
        title: "Simple grocery list",
        preview: "Proteins, produce and pantry basics",
        prompt: "Create my grocery list.",
      },
    ],
  },
  {
    group: "Aug 14",
    items: [
      {
        id: "h5",
        title: "GLP-1 nutrition questions",
        preview: "General education on gentler meals",
        prompt: "Explain GLP-1 nutrition basics.",
      },
    ],
  },
];

export type GroceryItem = { id: string; name: string; section: string; checked: boolean };

export const INITIAL_GROCERY: GroceryItem[] = [
  { id: "g1", name: "Greek yogurt", section: "Proteins", checked: false },
  { id: "g2", name: "Eggs", section: "Proteins", checked: false },
  { id: "g3", name: "Chicken breast", section: "Proteins", checked: false },
  { id: "g4", name: "Salmon", section: "Proteins", checked: false },
  { id: "g5", name: "Blueberries", section: "Produce", checked: false },
  { id: "g6", name: "Spinach", section: "Produce", checked: false },
  { id: "g7", name: "Broccoli", section: "Produce", checked: false },
  { id: "g8", name: "Avocado", section: "Produce", checked: false },
  { id: "g9", name: "Chia seeds", section: "Pantry", checked: false },
  { id: "g10", name: "Oats", section: "Pantry", checked: false },
  { id: "g11", name: "Almonds", section: "Pantry", checked: false },
];

export const PROVIDER_QUESTION_SUGGESTIONS = [
  "Are my current goals realistic?",
  "Should I make any changes to my nutrition plan?",
  "What symptoms should I let you know about?",
  "What should I focus on before my next appointment?",
];

export const RECIPES = [
  {
    id: "r1",
    title: "5-Minute Greek Yogurt Power Bowl",
    minutes: 5,
    tag: "High protein",
    ingredients: ["Greek yogurt", "Blueberries", "Strawberries", "Chia seeds", "Almonds"],
    steps: ["Add yogurt.", "Add berries.", "Sprinkle chia seeds.", "Add almonds.", "Serve."],
  },
  {
    id: "r2",
    title: "Egg & Veggie Breakfast Wrap",
    minutes: 10,
    tag: "Balanced",
    ingredients: ["Eggs", "Spinach", "Bell pepper", "Whole grain wrap", "Feta"],
    steps: [
      "Scramble eggs.",
      "Wilt spinach and peppers.",
      "Warm the wrap.",
      "Fill and fold.",
      "Slice and serve.",
    ],
  },
  {
    id: "r3",
    title: "Sheet-Pan Salmon & Broccoli",
    minutes: 25,
    tag: "Dinner",
    ingredients: ["Salmon fillets", "Broccoli", "Olive oil", "Lemon", "Garlic"],
    steps: [
      "Heat oven to 425°F.",
      "Toss broccoli with oil.",
      "Add salmon to the pan.",
      "Roast 15 minutes.",
      "Finish with lemon.",
    ],
  },
  {
    id: "r4",
    title: "Turkey Meatballs & Roasted Veg",
    minutes: 30,
    tag: "Meal prep",
    ingredients: ["Ground turkey", "Oats", "Egg", "Zucchini", "Marinara"],
    steps: [
      "Mix turkey, oats and egg.",
      "Roll meatballs.",
      "Bake 20 minutes.",
      "Roast zucchini alongside.",
      "Serve with marinara.",
    ],
  },
];

export const RESTAURANT_TYPES = [
  "Fast Food",
  "Casual Dining",
  "Italian",
  "Mexican",
  "Asian",
  "Breakfast",
  "Coffee Shop",
];
export const RESTAURANT_PRIORITIES = [
  "Higher protein",
  "More vegetables",
  "Balanced meal",
  "Lower-sugar beverage",
  "Simple choices",
];

export const RESTAURANT_PICKS: Record<string, string[]> = {
  "Fast Food": [
    "Grilled chicken sandwich, skip the mayo",
    "Side salad instead of fries",
    "Unsweetened iced tea or water",
  ],
  "Casual Dining": [
    "Grilled protein with a double vegetable side",
    "Soup and half salad combo",
    "Sauce and dressing on the side",
  ],
  Italian: [
    "Grilled chicken or fish with vegetables",
    "Half portion of pasta with a side salad",
    "Sparkling water with lemon",
  ],
  Mexican: [
    "Chicken fajitas with extra veggies",
    "Burrito bowl with beans and salsa",
    "Guacamole instead of queso",
  ],
  Asian: [
    "Steamed dumplings and a broth soup",
    "Stir-fry with extra vegetables",
    "Brown rice, sauce on the side",
  ],
  Breakfast: ["Two-egg plate with fruit", "Greek yogurt parfait", "Whole grain toast with avocado"],
  "Coffee Shop": [
    "Americano or drip coffee",
    "Unsweetened latte with a protein box",
    "Sparkling water alongside your drink",
  ],
};

export const TRAVEL_TIPS = {
  food: [
    "Pack shelf-stable protein like jerky or nut butter packs",
    "Scan menus before you arrive",
    "Anchor one predictable meal each day",
  ],
  hydration: [
    "Bring an empty bottle through security",
    "One glass of water per flight hour",
    "Start the morning with water before coffee",
  ],
  movement: [
    "Walk the terminal between flights",
    "10-minute morning hotel stretch",
    "Choose the farther parking spot",
  ],
  snacks: ["Greek yogurt cups", "Apple and almonds", "Roasted chickpeas", "String cheese"],
};

export const FAQS = [
  {
    q: "Is FitSlim AI a doctor?",
    a: "No. FitSlim AI™ is an educational wellness companion. It does not diagnose, treat, or replace your provider or care team.",
  },
  {
    q: "Can FitSlim AI prescribe medication?",
    a: "No. FitSlim AI cannot prescribe, recommend, or change any medication. Prescribing decisions belong to your provider.",
  },
  {
    q: "Can FitSlim AI change my GLP-1 dose?",
    a: "No. Dosing is decided only by your prescribing provider. FitSlim AI can share general nutrition education to discuss with them.",
  },
  {
    q: "Can FitSlim AI interpret my labs?",
    a: "No. FitSlim AI does not interpret lab results or personal medical data. Bring lab questions to your care team.",
  },
  {
    q: "Can FitSlim AI help with meals?",
    a: "Yes. Meal ideas, recipes, grocery lists, restaurant strategies and simple planning are core strengths.",
  },
  {
    q: "Can FitSlim AI help while traveling?",
    a: "Yes. Travel Companion offers food strategies, hydration reminders, movement ideas and snack suggestions.",
  },
  {
    q: "Is FitSlim AI available 24/7?",
    a: "The app is designed to be available whenever questions come up. It is not a monitoring or emergency service.",
  },
  {
    q: "What should I do if I have symptoms?",
    a: "Contact your care team. For urgent or emergency symptoms, seek appropriate medical care through your local emergency resources.",
  },
];
