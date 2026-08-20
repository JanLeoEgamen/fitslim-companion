export type ChatAction = { label: string; prompt?: string; to?: string; save?: { title: string; category: "Recipes" | "Meal Plans" | "Tips" | "Academy" | "Conversations"; summary: string } };

export type RecipeCardData = {
  title: string;
  minutes: number;
  ingredients: string[];
  steps: string[];
};

export type ChatMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
  actions?: ChatAction[];
  recipe?: RecipeCardData;
  safety?: "general" | "glp1" | "urgent";
  createdAt: number;
};

let seq = 0;
export const newId = () => `m${Date.now().toString(36)}${(seq += 1)}`;

type Reply = Omit<ChatMessage, "id" | "role" | "createdAt">;

const rules: { match: RegExp; reply: Reply }[] = [
  {
    match: /(emergency|chest pain|can'?t breathe|severe|fainted|passed out|bleeding)/i,
    reply: {
      safety: "urgent",
      text: `I'm not able to help with urgent or emergency symptoms.

Please seek emergency medical care or contact your local emergency services right away.

If this isn't urgent but still concerning, contact your care team — they know your history and can advise you directly.`,
      actions: [{ label: "See Safety Information", to: "/safety" }],
    },
  },
  {
    match: /(dose|dosage|increase my|stop taking|prescribe|prescription|side effect|nausea|zepbound|ozempic|wegovy|mounjaro|glp)/i,
    reply: {
      safety: "glp1",
      text: `## General GLP-1 nutrition education

If you're experiencing reduced appetite while using a GLP-1 medication, some people find smaller, simpler meals easier to manage. Many members focus on practical nutrition strategies such as:

• Steady hydration throughout the day
• Protein first, then vegetables and gentle carbohydrates
• Smaller portions eaten more often
• Softer textures like yogurt, eggs, soups and blended options
• Eating slowly and pausing when comfortably satisfied

Your individual needs can vary, so follow the guidance from your prescribing provider.

I can't advise on medication, dosing, or symptoms. If you're experiencing significant or concerning symptoms, contact your care team.`,
      actions: [
        { label: "Talk to My Provider", to: "/provider-questions" },
        { label: "Learn GLP-1 Basics", to: "/academy" },
      ],
    },
  },
  {
    match: /(lab|blood work|a1c|cholesterol|diagnos|is this normal|do i have)/i,
    reply: {
      safety: "general",
      text: `That's something to discuss with your healthcare provider.

I can't interpret personal results or tell you what a specific number means for you. What I can do is help you get ready for the conversation — for example, writing down what you've noticed and the questions you'd like to ask.`,
      actions: [{ label: "Build Provider Questions", to: "/provider-questions" }],
    },
  },
  {
    match: /(breakfast|protein.*(morning|breakfast))/i,
    reply: {
      text: `Absolutely. Here's a simple option:

## Greek Yogurt Power Bowl

• Greek yogurt
• Berries
• Chia seeds
• A small handful of nuts
• Optional drizzle of honey

Prep time: about 5 minutes.

You can adjust the ingredients based on your preferences and nutritional needs.

Want me to turn this into a grocery list?`,
      recipe: {
        title: "5-Minute Greek Yogurt Power Bowl",
        minutes: 5,
        ingredients: ["Greek yogurt", "Blueberries", "Strawberries", "Chia seeds", "Almonds"],
        steps: ["Add yogurt.", "Add berries.", "Sprinkle chia seeds.", "Add almonds.", "Serve."],
      },
      actions: [
        { label: "Create Grocery List", prompt: "Create a grocery list." },
        { label: "Give Me 3 More", prompt: "Show me 3 more high-protein breakfasts." },
        { label: "Save Recipe", save: { title: "5-Minute Greek Yogurt Power Bowl", category: "Recipes", summary: "Quick high-protein breakfast bowl." } },
      ],
    },
  },
  {
    match: /(3 more|three more|more breakfast)/i,
    reply: {
      text: `Happy to. Three more quick, protein-forward breakfasts:

1. Egg & veggie wrap — scrambled eggs, spinach, peppers, whole grain wrap
2. Cottage cheese bowl — cottage cheese, berries, cinnamon, a few walnuts
3. Savory oats — oats cooked with broth, topped with a soft egg and avocado

Each one takes about 10 minutes. Want the ingredients added to your grocery list?`,
      actions: [
        { label: "Create Grocery List", prompt: "Create a grocery list." },
        { label: "Save These Ideas", save: { title: "5-Minute Protein Breakfasts", category: "Recipes", summary: "Three fast protein-forward breakfast ideas." } },
      ],
    },
  },
  {
    match: /(higher protein|more fiber|meal prep|lower.?sugar|budget)/i,
    reply: {
      text: `Great choice. Here's a simple 3-day plan:

## Monday
• Breakfast: Greek yogurt bowl
• Lunch: Chicken grain bowl
• Dinner: Salmon + vegetables

## Tuesday
• Breakfast: Egg & veggie wrap
• Lunch: Turkey avocado salad
• Dinner: Chicken stir-fry

## Wednesday
• Breakfast: Cottage cheese + berries
• Lunch: Tuna salad wrap
• Dinner: Turkey meatballs + vegetables

Keep what works, swap what doesn't — this is a starting point, not a rulebook.`,
      actions: [
        { label: "Save Meal Plan", save: { title: "3-Day Easy Meal Plan", category: "Meal Plans", summary: "Higher-protein breakfasts, lunches and dinners." } },
        { label: "Create Grocery List", prompt: "Create a grocery list." },
      ],
    },
  },
  {
    match: /(plan.*meal|meal.*plan|plan.*week|what should i eat)/i,
    reply: {
      text: `Absolutely. Let's keep it simple.

What would you like to prioritize?

1. Higher protein
2. More fiber
3. Easy meal prep
4. Lower-sugar choices
5. Budget-friendly meals

You can choose more than one.`,
      actions: [
        { label: "Higher protein", prompt: "Higher protein" },
        { label: "More fiber", prompt: "More fiber" },
        { label: "Easy meal prep", prompt: "Easy meal prep" },
        { label: "Lower-sugar choices", prompt: "Lower-sugar choices" },
        { label: "Budget-friendly meals", prompt: "Budget-friendly meals" },
      ],
    },
  },
  {
    match: /(grocery|shopping list)/i,
    reply: {
      text: `Here's a simple list for 3 breakfasts:

## Protein
• Greek yogurt

## Fruit
• Blueberries
• Strawberries

## Pantry
• Chia seeds
• Almonds

Want me to add anything else?`,
      actions: [
        { label: "Open Grocery List", to: "/grocery-list" },
        { label: "Add Dinner Items", prompt: "Add dinner items to my grocery list." },
      ],
    },
  },
  {
    match: /(restaurant|eat out|order|menu|dining)/i,
    reply: {
      text: `Restaurants are very doable with a plan.

## A simple ordering approach
1. Pick your protein first
2. Add a vegetable side
3. Choose sauces and dressings on the side
4. Pick a drink that won't add hidden sugar

Tell me the type of restaurant and I'll get more specific — Italian, Mexican, Asian, breakfast, fast food, casual dining or a coffee shop.

These are general ideas, not medical or dietary prescriptions.`,
      actions: [
        { label: "Open Restaurant Guide", to: "/restaurants" },
        { label: "Save Ordering Guide", save: { title: "Healthy Restaurant Ordering Guide", category: "Tips", summary: "A four-step approach for any menu." } },
      ],
    },
  },
  {
    match: /(travel|trip|flight|airport|hotel|vacation)/i,
    reply: {
      text: `Travel is mostly about a few reliable defaults.

## Food
• Pack shelf-stable protein
• Anchor one predictable meal a day
• Scan menus before you arrive

## Hydration
• Empty bottle through security, fill after
• A glass of water for each hour in the air

## Movement
• Walk the terminal between flights
• 10-minute stretch each morning

Want me to build this around a specific destination and trip length?`,
      actions: [
        { label: "Open Travel Companion", to: "/travel" },
        { label: "Save Travel Tips", save: { title: "Travel Wellness Strategies", category: "Tips", summary: "Food, hydration and movement defaults for trips." } },
      ],
    },
  },
  {
    match: /(water|hydrat|drink more)/i,
    reply: {
      text: `Hydration gets much easier when it's attached to things you already do.

• A glass of water before your morning coffee
• A bottle on your desk you refill at each break
• Water with every meal
• Sparkling water in the evening if you want something fizzy
• Add lemon, cucumber or mint for flavor without sugar

Individual hydration needs vary, so check with your provider if you have specific guidance to follow.`,
      actions: [
        { label: "Save Hydration Routine", save: { title: "Everyday Hydration Routine", category: "Tips", summary: "Simple anchors for drinking more water." } },
        { label: "Learn Hydration Basics", to: "/academy" },
      ],
    },
  },
  {
    match: /(walk|exercise|workout|movement|steps|gym)/i,
    reply: {
      text: `Here's a gentle beginner walking plan:

## Week 1
• Days 1–3: 10 minutes, easy pace
• Days 4–5: 15 minutes
• Days 6–7: 15 minutes + a few gentle stretches

## Week 2
• Days 1–3: 20 minutes
• Days 4–7: 25 minutes, adding a small hill or faster stretch

Consistency matters more than pace. If anything feels off, ease back and check in with your provider.`,
      actions: [
        { label: "Save Walking Plan", save: { title: "Beginner Walking Routine", category: "Tips", summary: "A two-week gentle walking build-up." } },
        { label: "Movement While Traveling", prompt: "How do I stay active while traveling?" },
      ],
    },
  },
  {
    match: /(evening routine|sleep|bedtime|wind.?down|tired)/i,
    reply: {
      text: `A calmer evening usually starts earlier than you'd expect.

1. Set a soft "kitchen closed" time
2. Dim lights about an hour before bed
3. Put screens on a charger outside the bedroom
4. Five minutes of stretching or slow breathing
5. Same wake time most days

Pick one to start with this week — one is plenty.`,
      actions: [
        { label: "Save Evening Routine", save: { title: "Simple Evening Routine", category: "Tips", summary: "Five steps for a calmer wind-down." } },
        { label: "Help With Evening Snacking", prompt: "Help me with evening snacking." },
      ],
    },
  },
  {
    match: /(stress|mindful|snacking|emotional eating|anxious)/i,
    reply: {
      text: `Let's make the next choice a little easier — no judgment attached.

• Pause and name what you need: hunger, rest, or a break
• Drink a glass of water and wait five minutes
• If you're still hungry, choose something with protein
• Step outside for three minutes of fresh air
• Keep a simple "closing" ritual like tea after dinner

Mindful eating is a practice, not a test.`,
      actions: [
        { label: "Save Mindful Eating Tips", save: { title: "Mindful Eating Practices", category: "Tips", summary: "Gentle strategies for stress and evening snacking." } },
        { label: "Open Academy Lesson", to: "/academy" },
      ],
    },
  },
  {
    match: /(habit|routine|consistency|motivat|restart)/i,
    reply: {
      text: `Habits stick best when they're small and attached to something existing.

1. Choose one habit — not five
2. Attach it to a cue you already have ("after I pour coffee...")
3. Make it embarrassingly small for two weeks
4. Track it with a simple checkmark
5. Restart without commentary when you miss a day

Which one would you like to start with?`,
      actions: [
        { label: "Save Habit Framework", save: { title: "Habit Building Framework", category: "Tips", summary: "Five steps for habits that stick." } },
        { label: "Build a Morning Routine", prompt: "Help me build a morning routine." },
      ],
    },
  },
  {
    match: /(provider|doctor|appointment|visit|care team|ask my)/i,
    reply: {
      safety: "general",
      text: `Here are a few questions you may want to discuss with your provider:

• Are my current goals realistic?
• Should I make any changes to my nutrition plan?
• What symptoms should I let you know about?
• What should I focus on before my next appointment?

You can save these and bring them along. Your provider knows your history — I'm here for the everyday education in between visits.`,
      actions: [
        { label: "Save Questions", to: "/provider-questions" },
        { label: "Add My Own Question", to: "/provider-questions" },
      ],
    },
  },
  {
    match: /(academy|lesson|learn|course)/i,
    reply: {
      text: `FitSlim Academy™ has short lessons you can finish in a coffee break.

• Understanding Protein — 8 min
• Building a Balanced Plate — 10 min
• Hydration Basics — 6 min
• Smart Restaurant Choices — 9 min
• Creating Sustainable Habits — 12 min

Want me to suggest the next lesson based on what you've been asking about?`,
      actions: [
        { label: "Open Academy", to: "/academy" },
        { label: "Suggest My Next Lesson", prompt: "What lesson should I take next?" },
      ],
    },
  },
  {
    match: /(recipe|cook|dinner|lunch|snack)/i,
    reply: {
      text: `Here's an easy one that reheats well:

## Sheet-Pan Salmon & Broccoli

• Salmon fillets
• Broccoli
• Olive oil, lemon, garlic

About 25 minutes start to finish, and it makes a great next-day lunch.`,
      recipe: {
        title: "Sheet-Pan Salmon & Broccoli",
        minutes: 25,
        ingredients: ["Salmon fillets", "Broccoli", "Olive oil", "Lemon", "Garlic"],
        steps: ["Heat oven to 425°F.", "Toss broccoli with oil.", "Add salmon to the pan.", "Roast 15 minutes.", "Finish with lemon."],
      },
      actions: [
        { label: "Save Recipe", save: { title: "Sheet-Pan Salmon & Broccoli", category: "Recipes", summary: "25-minute dinner that reheats well." } },
        { label: "Browse Recipes", to: "/recipes" },
      ],
    },
  },
];

const fallback: Reply = {
  text: `I'm here for that. To point you in the most useful direction, tell me a bit more — are you thinking about meals, hydration, movement, sleep, travel, restaurants, healthy habits, or questions for your care team?

You can also tap one of the suggestions to get started.`,
  actions: [
    { label: "Plan My Meals", prompt: "Help me plan healthy meals this week." },
    { label: "Beginner Walking Plan", prompt: "Create a beginner walking plan." },
    { label: "Explore Topics", to: "/explore" },
  ],
};

export function generateReply(input: string): ChatMessage {
  const rule = rules.find((r) => r.match.test(input));
  const reply = rule ? rule.reply : fallback;
  return { id: newId(), role: "ai", createdAt: Date.now(), ...reply };
}

export function userMessage(text: string): ChatMessage {
  return { id: newId(), role: "user", text, createdAt: Date.now() };
}