import type { SectionSlug } from "./sections";
import type { Reply } from "./ai";

export type SectionRule = { match: RegExp; reply: Reply };

const nutrition: SectionRule[] = [
  {
    match: /(protein)/i,
    reply: {
      text: `Here are easy, protein-focused meals you'll actually want:

## Protein-Focused Ideas
• **Breakfast:** Greek yogurt with berries and chia, or eggs + spinach on whole-grain toast
• **Lunch:** Chicken, salmon, tofu, or shrimp over a big salad or grain bowl
• **Dinner:** Grilled protein + a generous roasted-vegetable side
• **Snacks:** Cottage cheese, hard-boiled eggs, edamame, or a protein shake

Many people find 20–30 g of protein per meal helps meals feel satisfying. Pick a protein you like and build the plate around it.`,
      actions: [
        { label: "Build a Grocery List", prompt: "Build a grocery list." },
        { label: "High-Protein Recipes", prompt: "Give me high-protein recipes." },
      ],
    },
  },
  {
    match: /(fiber)/i,
    reply: {
      text: `Fiber is your friend for fullness and steady energy:

## Fiber-Friendly Meals
• Beans, lentils, and chickpeas in soups, salads, and bowls
• Whole grains: oats, brown rice, quinoa
• Lots of vegetables and fruit with the skin (apples, berries, carrots)
• Air-popped popcorn as a snack

Tip: add fiber gradually and drink plenty of water to stay comfortable. Making half your plate vegetables and fruit is a simple starting point.`,
      actions: [
        { label: "Save Fiber Checklist", save: { title: "Fiber-Friendly Meals", category: "Tips", summary: "Simple ways to add more fiber to everyday meals." } },
        { label: "Meal Ideas", prompt: "Give me fiber-friendly meal ideas for the week." },
      ],
    },
  },
  {
    match: /(portion|serving|how much should i eat)/i,
    reply: {
      text: `A useful, no-scale guide to portions:

## Portion Guide (your hand)
• **Palm** = a portion of protein (about as big as your palm)
• **Fist** = a portion of starchy carbs (rice, pasta, potato, oats)
• **Two cupped hands** = a portion of vegetables
• **Thumb tip** = a portion of oil, butter, or spread
• **Thumb** = a portion of nut butter or cheese

Aim for roughly half your plate vegetables, a quarter protein, and a quarter starchy carbs. This is general guidance — your provider or dietitian can tailor it to you.`,
      actions: [
        { label: "Build a Balanced Plate", prompt: "What does a balanced plate look like?" },
        { label: "Healthy Swaps", prompt: "Give me healthy swaps for common foods." },
      ],
    },
  },
  {
    match: /(swap|instead of)/i,
    reply: {
      text: `Small swaps, big difference:

## Healthy Swaps
• **Sweet drinks →** sparkling water with lemon, or herbal tea
• **White bread →** whole grain
• **Creamy dressing →** vinaigrette, or dressing on the side
• **Mayo →** avocado, hummus, or a Greek-yogurt dip
• **Fries →** side salad, roasted veg, or fruit
• **Fried protein →** grilled, baked, or air-fried

Pick the one or two swaps you'll actually stick with this week.`,
      actions: [
        { label: "Save Swap List", save: { title: "Healthy Swaps", category: "Tips", summary: "Simple food swaps that add up." } },
        { label: "Budget Meals", prompt: "Give me budget-friendly meal ideas." },
      ],
    },
  },
  {
    match: /(budget|cheap|cheaper|affordable|cost)/i,
    reply: {
      text: `Eating well on a budget is very doable:

## Budget-Friendly Meals
• **Protein:** eggs, beans, lentils, chickpeas, canned tuna, and chicken in bulk
• **Produce:** frozen vegetables (just as nutritious) and in-season fruit
• **Pantry:** oats, rice, potatoes, and your favorite spices
• **Build:** a big batch of one protein + one grain + one vegetable to mix into meals

Shopping with a simple list (proteins, produce, pantry) keeps it easy and cuts waste.`,
      actions: [
        { label: "Build a Grocery List", prompt: "Build a budget-friendly grocery list." },
        { label: "Meal Prep", prompt: "Help me get started with meal prep." },
      ],
    },
  },
  {
    match: /(cultural|ethni|hispanic|asian|indian|mediterranean|mexican)/i,
    reply: {
      text: `You don't have to give up the foods you love — keep the flavors, adjust the plate:

## Cultural Food Ideas That Fit Your Goals
• **Mexican:** chicken fajitas with extra vegetables, beans, and salsa instead of queso
• **Asian:** stir-fry with extra vegetables and brown rice, sauce on the side
• **Indian:** lentil dal with chicken or tofu and a side of vegetables
• **Italian:** grilled fish or chicken with a big salad and a modest portion of pasta
• **Mediterranean:** hummus, whole grain pita, olives, and lots of roasted vegetables

The trick is keeping your usual flavors while shifting the balance toward protein and vegetables.`,
      actions: [
        { label: "Healthy Swaps", prompt: "Give me healthy swaps for common foods." },
        { label: "Meal Ideas", prompt: "Give me healthy meal ideas for the week." },
      ],
    },
  },
  {
    match: /(meal prep|meal-prep|prepare.*week|batch)/i,
    reply: {
      text: `Stress-free meal prep in 4 simple steps:

## Easy Meal Prep
1. **Pick 2–3 dinners** that reheat well (stews, sheet-pan meals, grain bowls)
2. **Cook one big protein** (chicken, ground turkey, or beans) you can add anywhere
3. **Prep vegetables** (chop, roast, or steam ahead)
4. **Portion into containers** so healthy meals are the easiest choice

You never need to prep 7 days — even 2–3 extra dinners = into a huge win for your week.`,
      actions: [
        { label: "Build a Grocery List", prompt: "Build a grocery list for meal prep." },
        { label: "Meal-Prep Recipes", prompt: "Give me meal-prep recipes." },
      ],
    },
  },
];

const restaurants: SectionRule[] = [
  {
    match: /(fast.?food)/i,
    reply: {
      text: `Here are healthier fast-food choices:

## Better Fast-Food Picks
• Order your burger or sandwich — ask for sauces on the side
• Choose **grilled** over fried protein when available
• Pick a side salad or fruit instead of fries
• Go for water, unsweetened iced tea, or a diet/sugar-free drink
• Size down when it's an option (small vs. large)

You can almost always find something that works — you don't have to eat a "perfect" meal, just a slightly better one.`,
      actions: [
        { label: "Lower-Sugar Drinks", prompt: "What are lower-sugar beverage ideas when dining out?" },
        { label: "What to Order", prompt: "Help me decide what to order at a restaurant." },
      ],
    },
  },
  {
    match: /(protein.?forward|double protein|grilled)|(high.?protein.*restaurant)/i,
    reply: {
      text: `Protein-forward ordering, no matter the menu:

1. **Start with the protein** — grilled chicken, shrimp, fish, lean beef, or tofu
2. **Ask for double or extra** if the place allows it
3. **Add a vegetable side** instead of a second carb
4. **Keep sauces/dressings on the side** so you're in control

Cuisines like Mexican (fajitas, burrito bowls), Asian (stir-fries), and Mediterranean (kebab platters) make it easy to lead with protein.`,
      actions: [
        { label: "Fast-Food Options", prompt: "What are healthier fast-food choices?" },
        { label: "Save Ordering Guide", save: { title: "Protein-Forward Ordering", category: "Tips", summary: "Lead with protein at any restaurant." } },
      ],
    },
  },
  {
    match: /(beverage|drink|soda|sugar.?free|lower.?sugar|sweet)/i,
    reply: {
      text: `Lower-sugar beverage ideas for dining out:

- **Water** with lemon, lime, cucumber, or fresh fruit
- **Sparkling water** (plain or lightly flavored)
- **Unsweetened iced tea** or diluted versions
- **Black coffee or cold brew** (skip the syrups)
- **Diet or zero-sugar sodas** if you want the fizz
- **Small juice** cut with water or seltzer

Simple rule of thumb: water first, and make any sweet drink the exception, not the default.`,
      actions: [
        { label: "Hydration Basics", prompt: "Teach me about hydration." },
        { label: "Order a Meal", prompt: "Help me decide what to order at a restaurant." },
      ],
    },
  },
  {
    match: /(travel|trip|flight|airport|hotel|vacation)/i,
    reply: {
      text: `Dining well while traveling is about strategy:

## Travel Dining Guidance
1. **Scan the menu online** before you arrive and pick your order in advance
2. **Ask for sauces and dressing on the side**
3. **Anchor one predictable meal** a day (protein + vegetables + water)
4. **Pack snacks** — Greek yogurt cups, nuts, fruit, cheese sticks — so you're not ravenous
5. **In airports**, grab a premade salad, wrap, or a "protein box" instead of a big fast-food meal

Travel is a rhythm, not a one-off — aim for mostly on-track and enjoy it.`,
      actions: [
        { label: "Travel Tips", to: "/travel" },
        { label: "On a Weight Plan", prompt: "How do I dine out while on a weight-management plan?" },
      ],
    },
  },
  {
    match: /(weight.?management|weight.?plan|on a plan|watch|maintenance)/i,
    reply: {
      text: `Dining out while on a weight-management plan:

## A Calm, Doable Approach
1. **Have a plan before you arrive** — protein, a vegetable, and one treat keeps it simple
2. **Start with a full glass of water** and a vegetable appetizer if there is one
3. **Order the protein + vegetable plate** and ask for sauce on the side
4. **Box a portion right away** if the serving looks large
5. **Eat slowly and pause** when you feel comfortably full — satisfaction is a cue

Remember: one meal won't make or break your progress. This is general education — your provider or dietitian supports your personal plan.`,
      actions: [
        { label: "Save Dining Guide", save: { title: "Dining Out on a Weight Plan", category: "Tips", summary: "A calm strategy for restaurant meals." } },
        { label: "What to Order", prompt: "Help me decide what to order at a restaurant." },
      ],
    },
  },
  {
    match: /(what to order|order at|order a|menu|eat out|dining)/i,
    reply: {
      text: `A simple strategy that works on any menu:

## Order With Confidence
1. **Pick your protein first** (grilled chicken, fish, shrimp, lean beef, tofu)
2. **Add a generous vegetable side**
3. **Put sauces and dressings on the side**, not on the plate
4. **Choose water or a lower-sugar drink**

Then tailor it to where you are: fajitas at Mexican, stir-fry at Asian, grilled fish and a salad at Italian. These are general ideas, not medical prescriptions.`,
      actions: [
        { label: "Fast-Food Picks", prompt: "What are healthier fast-food choices?" },
        { label: "Browse the Guide", to: "/restaurants" },
      ],
    },
  },
];

const recipes: SectionRule[] = [
  {
    match: /(high.?protein)/i,
    reply: {
      text: `High-protein recipes that come together fast:

## High-Protein Favorites
• **Greek Yogurt Power Bowl** — yogurt, berries, chia, a handful of nuts (5 min)
• **Egg & Veggie Wrap** — scrambled eggs, spinach, peppers, whole-grain wrap (10 min)
• **Sheet-Pan Salmon & Broccoli** — salmon + broccoli roasted with lemon (25 min)
• **Turkey Meatballs & Roasted Veg** — batch-cooks well for the week (30 min)

Most pair protein with a vegetable side — pick one and I can build a grocery list.`,
      actions: [
        { label: "Recipe Meals", prompt: "Give me a high-protein dinner." },
        { label: "Build a Grocery List", prompt: "Build a grocery list." },
      ],
    },
  },
  {
    match: /(low.?glycemic)/i,
    reply: {
      text: `Lower-glycemic meal ideas — protein, fiber, and flavor without big blood-sugar swings:

## Lower-Glycemic Ideas
• **Breakfast:** eggs + whole-grain toast + avocado or berries
• **Lunch:** protein + leafy greens + roasted vegetables
• **Dinner:** grilled fish or chicken + non-starchy veggies + a small portion of beans or quinoa
• **Snacks:** veggies + hummus, or yogurt + berries

These ideas are general education, not a prescription — your provider or dietitian can tailor specifics for you.`,
      actions: [
        { label: "Save Low-GI Ideas", save: { title: "Lower-Glycemic Meals", category: "Meal Plans", summary: "Balanced plates that smooth your blood-sugar response." } },
        { label: "Simple Recipes", prompt: "Give me simple recipes." },
      ],
    },
  },
  {
    match: /(family|kids|kid.?friendly)/i,
    reply: {
      text: `Family-friendly meals that scale for everyone:

## Family Dinners (one recipe, whole table)
• **Turkey Tacos** — with lettuce wraps or whole-grain tortillas
• **Sheet-Pan Chicken & Vegetables** — everyone picks their favorites
• **Build-Your-Own Grain Bowls** — rice, protein, veggies, sauces
• **Baked Fish or Meatballs** — with pasta or roasted veg on the side

Let each person customize (more sauce, fewer veggies) and keep the base meal healthy for everyone.`,
      actions: [
        { label: "Meal-Prep Recipes", prompt: "Give me meal-prep recipes." },
        { label: "Dinner Ideas", prompt: "Give me a high-protein dinner." },
      ],
    },
  },
  {
    match: /(meal prep|meal-preps?|batch)/i,
    reply: {
      text: `Meal-prep recipes that stay good for the week:

- **Turkey Meatballs & Roasted Veg** — portion into 4 containers
- **Chicken & Grain Bowls** — cooked chicken, quinoa, roasted veg + a simple sauce
- **Tuna Salad Wraps** — quick, grab-and-go lunches
- **Sheet-Pan Salmon & Broccoli** — make a little extra for tomorrow

Set aside one quiet hour, and your future self will have real meals ready.`,
      actions: [
        { label: "Build a Grocery List", prompt: "Build a grocery list." },
        { label: "Simple Recipes", prompt: "Give me simple recipes." },
      ],
    },
  },
  {
    match: /(breakfast|lunch|dinner|snack|a grab)/i,
    reply: {
      text: `A sample day so you know what to reach for:

## A Simple Day
• **Breakfast:** Greek yogurt + berries + chia
• **Lunch:** chicken & vegetable grain bowl
• **Snack:** apple + peanut butter
• **Dinner:** salmon or tofu + roasted vegetables

Swap the protein and vegetables for ones you actually like — that's the secret.`,
      actions: [
        { label: "High-Protein Meals", prompt: "Give me high-protein recipes." },
        { label: "Build a Grocery List", prompt: "Create my grocery list." },
      ],
    },
  },
  {
    match: /(simple|easy|quick|10 min|ten minute)/i,
    reply: {
      text: `Simple recipes that come together in minutes:

1. **Egg & Veggie Wrap** — scramble eggs, wilt spinach, wrap it in whole-grain
2. **Greek Yogurt Bowl** — yogurt, berries, chia, a few nuts
3. **Turkey & Veggie Skillet** — protein + any vegetables you have on hand
4. **Sheet-Pan Anything** — protein + vegetables, one pan in the oven

Usually all you need is a protein, a vegetable, and a hot pan.`,
      actions: [
        { label: "High-Protein Ideas", prompt: "Give me high-protein recipes." },
        { label: "Meal Prep", prompt: "Give me meal-prep recipes." },
      ],
    },
  },
];

const glp1: SectionRule[] = [
  {
    match: /(eating|meal|food|what should i eat|appetite)/i,
    reply: {
      text: `## Eating While Using a GLP-1 Medication (General Education)

If your appetite is reduced, smaller, simpler meals often work better:

• Eat **smaller amounts more often** rather than three big meals
• Start with **protein first**, then vegetables and gentle carbohydrates
• Favor **softer textures** — yogurt, eggs, soups, mashed vegetable dishes
• **Hydrate** steadily throughout the day
• Eat slowly and pause when comfortably satisfied

I can only share general education — your prescribing provider's guidance is the source of truth for your plan.`,
      actions: [
        { label: "Gentle Meal Ideas", prompt: "Give me gentle meal ideas while my appetite is low." },
        { label: "Hydration & Protein", prompt: "How can I stay hydrated and hit protein?" },
      ],
    },
  },
  {
    match: /(provider|discuss|talk to|appointment|ask my|questions for)/i,
    reply: {
      text: `Some helpful topics to raise with your provider:

- Whether your current goals are realistic
- Any symptoms you've noticed (nausea, changes in appetite) and when they happen
- How your meals and hydration are going
- What to focus on between now and your next visit
- When to reach out to the care team

You can save questions to bring to your visit — your provider knows your history best.`,
      actions: [
        { label: "Save Questions", to: "/provider-questions" },
        { label: "When to Contact", prompt: "When should I contact my care team?" },
      ],
    },
  },
  {
    match: /(hydration|protein.*(remind|reminder))|(hit protein)/i,
    reply: {
      text: `Gentle hydration and protein reminders:

- **Protein:** aim to include a protein source at each eating window (yogurt, eggs, chicken, tofu, beans)
- **Hydration:** sip water steadily — set a reminder or keep a bottle within reach
- **Combine them:** a protein-rich snack like yogurt counts toward both

If dehydration ever concerns you, call your care team — they're there to help.`,
      actions: [
        { label: "Gentle Meal Ideas", prompt: "Give me gentle meal ideas." },
        { label: "When to Contact", prompt: "When should I contact my care team?" },
      ],
    },
  },
  {
    match: /(nausea|appetite change|side effect|stomach)/i,
    reply: {
      text: `Educational note — nausea and appetite changes are common with some GLP-1 medications:

- **Nausea** can be eased with smaller, blander meals, eating slowly, and going easy on greasy or very sweet foods
- **Reduced appetite** is expected — eat smaller portions more often and keep protein + fluids going
- These are educational explanations, not a diagnosis for your specific situation

If you're concerned, **contact your care team or provider** — I can't assess symptoms or change anything for you.`,
      actions: [
        { label: "When to Contact", prompt: "When should I contact my care team?" },
        { label: "Talk to My Provider", to: "/provider-questions" },
      ],
    },
  },
  {
    match: /(contact|call|care team|who do i|reach out)/i,
    reply: {
      text: `Good question — here's general guidance on when to reach out:

- **Right away:** any urgent/emergency symptom (chest pain, breathing trouble, fainting, severe bleeding) — call for help immediately
- **Contact your care team:** new or changing nausea, vomiting, belly pain, signs of dehydration, or anything that worries you
- **When in doubt,** call — your care team would always rather hear from you

I'm here for education, not for assessing medical concerns — your provider knows your history best.`,
      actions: [
        { label: "See Safety Info", to: "/safety" },
        { label: "Talk to My Provider", to: "/provider-questions" },
      ],
    },
  },
  {
    match: /(medication|medicine|what is|basic)/i,
    reply: {
      text: `General education on GLP-1 medications:

- GLP-1 medications are prescribed for some people to help with appetite, blood sugar, and weight management
- People often notice **reduced appetite**, slower digestion, and sometimes nausea
- The nutrition focus is usually **protein, hydration, gentle carbohydrates, and smaller meals**
- **Dosing and any changes are always done by your provider**

FitSlim AI™ does not prescribe, change dosages, or diagnose — follow the plan from your care team and bring your questions to them.`,
      actions: [
        { label: "Eating on GLP-1", prompt: "How should I think about eating while using GLP-1 medication?" },
        { label: "Provider Questions", to: "/provider-questions" },
      ],
    },
  },
];

const exercise: SectionRule[] = [
  {
    match: /(walk)/i,
    reply: {
      text: `A gentle 2-week beginner walking plan:

## Week 1
• Days 1–3: **10 minutes** at an easy pace
• Days 4–5: **15 minutes**
• Days 6–7: 15 minutes + a couple of easy stretches

## Week 2
• Days 1–3: **20 minutes**
• Days 4–7: 25 minutes, adding a small hill or a faster stretch

Consistency beats pace. If anything feels off, ease back and check in with your provider.`,
      actions: [
        { label: "Save Walking Plan", save: { title: "Beginner Walking Routine", category: "Tips", summary: "A gentle two-week walking build-up." } },
        { label: "Strength Basics", prompt: "Give me strength training ideas for beginners." },
      ],
    },
  },
  {
    match: /(strength|weights|squat|push.?up|band)/i,
    reply: {
      text: `Beginner-friendly strength that needs no equipment (or a simple band):

- **Squat to chair** — lower slowly, tap the seat, stand
- **Wall push-ups** — as you get stronger, move to knee push-ups
- **Glute bridges** — shoulders on the floor, lift your hips
- **Band rows** — attach a band to a doorknob and pull toward you

Try 2 days a week, 2 sets of 8–10 reps, and stop before you lose form. A little strength goes a long way for daily life.`,
      actions: [
        { label: "Walking Plan", prompt: "Create a beginner walking plan." },
        { label: "Stretching", prompt: "Give me stretching and mobility ideas." },
      ],
    },
  },
  {
    match: /(stretch|mobility|flexib)/i,
    reply: {
      text: `A 5-minute stretch & mobility reset you can do anywhere:

- **Neck & shoulder rolls** — slow circles, 30 seconds each
- **Cat-cow** on hands and knees
- **Hamstring reach** — sit and reach toward your toes
- **Hip & ankle circles** before you walk

Best after a warm-up or at the end of the day. Gentle and consistent is the goal.`,
      actions: [
        { label: "Low-Impact Ideas", prompt: "Give me low-impact exercise ideas." },
        { label: "Walking Plan", prompt: "Create a beginner walking plan." },
      ],
    },
  },
  {
    match: /(low.?impact|beginner.?workout|joint)/i,
    reply: {
      text: `Low-impact options that are easy on the joints:

- **Walking** (even 10 minutes at a time)
- **Swimming or water aerobics**
- **Stationary cycling or elliptical**
- **Yoga and gentle stretching**
- **Chair exercises** if that feels right

Choose what feels good and go at your own pace — gentle movement still counts and adds up.`,
      actions: [
        { label: "Stretching", prompt: "Give me stretching and mobility ideas." },
        { label: "Motivation", prompt: "How do I stay motivated to exercise?" },
      ],
    },
  },
  {
    match: /(motivat|stuck|boring|don'?t want to|lazy)/i,
    reply: {
      text: `Motivation usually follows action, not the other way around:

- **Start with 5 minutes** — "just 5" is enough to get moving
- **Attach it to something you already do** (after morning coffee, right after lunch)
- **Make it easy** — leave your shoes out, pick a route you enjoy
- **Track wins** so you can see the streak
- **Missed a day?** Just restart at your next opportunity

You don't need a perfect plan — you need a simple, repeatable one.`,
      actions: [
        { label: "Walking Plan", prompt: "Create a beginner walking plan." },
        { label: "Reminders", prompt: "Give me activity reminders." },
      ],
    },
  },
  {
    match: /(remind|stay active|consistent|remember to move)/i,
    reply: {
      text: `A few ways to build movement into busy days:

- **Attach a move to a cue** — stretch after each meeting, walk after lunch
- **Keep shoes and a water bottle where you'll see them**
- **Set a gentle alarm** — "stretch or walk"
- **Park farther and take the stairs**
- **Schedule movement** like an appointment

Reminders work best when they're boring-explicit, not decorative.`,
      actions: [
        { label: "Beginner Walking Plan", prompt: "Create a beginner walking plan." },
        { label: "Motivation", prompt: "How do I stay motivated to exercise?" },
      ],
    },
  },
];

const hydration: SectionRule[] = [
  {
    match: /(educat|basics|how much|important|why)/i,
    reply: {
      text: `Hydration basics, simply:

- **Needs vary** by body size, activity, and weather — there's no single "right" number
- A useful signal is **pale-yellow urine** (very dark usually means drink more)
- **All fluids count** (water, milk, tea, coffee), and water-dense foods help too
- On hot days or during exercise, you'll need a bit more

If you have specific medical guidance (like a fluid limit), follow that instead. Individual needs vary.`,
      actions: [
        { label: "Beverage Ideas", prompt: "Give me beverage ideas besides plain water." },
        { label: "Reminders", prompt: "How can I remember to drink water?" },
      ],
    },
  },
  {
    match: /(beverage|flavor|flavour|drink|sparkling|infuse)/i,
    reply: {
      text: `Ways to add flavor without added sugar:

- **Water** with lemon, lime, cucumber, mint, or berries
- **Sparkling water** (plain or lightly flavored)
- **Herbal tea** — hot or iced
- **Cold brew** with a splash of unsweetened milk
- **A small splash of juice** to brighten plain water

Keep water within arm's reach and it becomes the easy default.`,
      actions: [
        { label: "Daily Routine", prompt: "Build me a simple hydration routine." },
        { label: "Save Ideas", save: { title: "No-Sugar Flavor Ideas", category: "Tips", summary: "Tasty ways to stay hydrated without added sugar." } },
      ],
    },
  },
  {
    match: /(remind|remember|stick|forget)/i,
    reply: {
      text: `Reminders that actually stick:

- **One glass with each meal** (a reliable anchor)
- **Fill a bottle** and refill it at the same times every day
- **Keep a bottle on your desk** and take a sip at each break
- **Pair water with a habit** — "before my morning coffee"
- Use a **gentle phone alarm** if it helps

You're more likely to drink what's already within reach.`,
      actions: [
        { label: "Daily Routine", prompt: "Build me a simple hydration routine." },
        { label: "Busy Days", prompt: "Give me hydration tips for travel, exercise, and busy days." },
      ],
    },
  },
  {
    match: /(travel|exercise|busy|work)/i,
    reply: {
      text: `Hydration for busier situations:

- **Travel:** bring an empty bottle through security and fill it after; aim for a glass of water per hour in the air
- **Exercise:** sip water before, during, and after — more when it's hot or sweaty
- **Busy days:** keep a big bottle with you and finish one before your morning coffee

Plan ahead with a full bottle and you'll rarely fall behind.`,
      actions: [
        { label: "Reminders", prompt: "How can I remember to drink water?" },
        { label: "Beverage Ideas", prompt: "Give me beverage ideas besides plain water." },
      ],
    },
  },
];

const habits: SectionRule[] = [
  {
    match: /(goal)/i,
    reply: {
      text: `Set a goal you can actually keep:

- **Pick ONE** goal to start with
- Make it **tiny and specific** — "after coffee, 10-minute walk" beats "exercise more"
- Give it a **start date** and a simple way to track it
- Plan a **2–4 week check-in** to see what's working

A goal you can do today is worth more than a perfect plan you can't.`,
      actions: [
        { label: "Habit Tracking", prompt: "Help me track my habits." },
        { label: "Save Goal Guide", save: { title: "Goal-Setting Guide", category: "Tips", summary: "How to set a realistic, keepable goal." } },
      ],
    },
  },
  {
    match: /(track|habit|routine|stack)/i,
    reply: {
      text: `Simple habit tracking that works:

- **One checkmark per day** in a calendar is plenty
- **Attach the habit to a cue** you already have (after coffee, after lunch)
- **Don't obsess over streaks** — restart right after a miss
- **Review weekly** and adjust so it stays easy

Consistency built on tiny steps beats occasional bursts.`,
      actions: [
        { label: "Set a Goal", prompt: "Help me set health goals." },
        { label: "Morning Routine", prompt: "Help me build a morning routine." },
      ],
    },
  },
  {
    match: /(motivat|stuck|lazy|give up)/i,
    reply: {
      text: `Staying motivated over the long haul:

- **Make it small enough to start** — 2 minutes still counts
- **Track and celebrate small wins** each week
- **Pair it with something you enjoy** (music, a friend, a great podcast)
- **Forgive the off-days** and just get back to your baseline
- **Reconnect to your "why"** — remember what you're aiming for

Motivation ebbs and flows; your systems and habits carry you.`,
      actions: [
        { label: "Long-Term Maintenance", prompt: "Help me with long-term maintenance." },
        { label: "Start a Habit", prompt: "Help me set health goals." },
      ],
    },
  },
  {
    match: /(sleep|evening|wind.?down|bedtime|rest)/i,
    reply: {
      text: `A calmer sleep routine starts earlier than you'd think:

1. **Set a soft "kitchen closed" time** for the evening
2. **Dim the lights** about an hour before bed
3. **Move screens** off to charge outside the bedroom
4. **Five minutes of stretching or slow breathing**
5. **Wake at the same time** most days

Pick one step to start this week — one is plenty.`,
      actions: [
        { label: "Manage Stress", prompt: "Help me manage stress." },
        { label: "Save Evening Routine", save: { title: "Simple Evening Routine", category: "Tips", summary: "Five steps for a calmer wind-down." } },
      ],
    },
  },
  {
    match: /(stress|overwhelm|anxious|pressure)/i,
    reply: {
      text: `Small things that help with stress throughout the day:

- **Take a slow-breathing reset** (four counts in, four counts out)
- **Name what you're feeling** — "I'm overwhelmed" labels can soften it
- **One minute of mindful eating** at a meal
- **Short movement breaks** to change your state
- **Protect sleep and hydration** — they carry a lot of the load

You don't have to fix everything at once. Pick one practice and build from there.`,
      actions: [
        { label: "Mindful Eating", prompt: "Teach me mindful eating." },
        { label: "Sleep Routine", prompt: "Help me build a sleep routine." },
      ],
    },
  },
  {
    match: /(mindful|emotional eating)/i,
    reply: {
      text: `Mindful eating basics:

- **Sit down and put screens away**
- **Eat slowly**, taking a bite and putting your fork down between bites
- **Notice the taste, texture, and your fullness** as you go
- **Stop when comfortably satisfied**, not stuffed
- **Check in on your emotions** — are you hungry, or bored/stressed?

It's a practice, not perfection. A few mindful meals a week still count.`,
      actions: [
        { label: "Manage Stress", prompt: "Help me manage stress." },
        { label: "Healthy Habits", prompt: "Help me build healthy habits." },
      ],
    },
  },
  {
    match: /(maintain|long.?term|keep it up|relapse|restart)/i,
    reply: {
      text: `Long-term maintenance is about flexibility, not perfection:

- **Expect ups and downs** — they're normal and not failures
- **Keep 2–3 anchor habits** that are non-negotiable (e.g., daily walk, meals anchored)
- **Revisit your goals monthly** and adjust as life changes
- **Restart quickly** after a rough stretch instead of waiting for "Monday"
- **Celebrate where you are** more than where you think you "should" be

Maintenance is earned with steady, forgiving consistency — you've got this.`,
      actions: [
        { label: "Set a Goal", prompt: "Help me set health goals." },
        { label: "Save Guide", save: { title: "Long-Term Maintenance", category: "Tips", summary: "How to keep healthy habits going for the long haul." } },
      ],
    },
  },
];

const fallbackText = (label: string, items: string[]): string =>
  `I can help you with ${label.toLowerCase()}. Tell me a bit more about what you'd like, or tap one of these to get started:\n\n${items
    .map((item) => `• ${item}`)
    .join("\n")}\n\nThis is educational support — it doesn't replace your care team.`;

export const SECTION_FALLBACKS: Record<SectionSlug, Reply> = {
  nutrition: {
    text: fallbackText("Nutrition", [
      "Give me healthy meal ideas for the week",
      "Give me protein-focused meal ideas",
      "Build me a grocery list",
      "Teach me about portion sizes",
    ]),
    actions: [
      { label: "Meal Ideas", prompt: "Give me healthy meal ideas for the week." },
      { label: "Protein Meals", prompt: "Give me protein-focused meal ideas." },
      { label: "Grocery List", prompt: "Build me a grocery list." },
    ],
  },
  restaurants: {
    text: fallbackText("Restaurants", [
      "Help me decide what to order at a restaurant",
      "What are healthier fast-food choices?",
      "Give me lower-sugar beverage ideas",
      "How do I dine out on a weight-management plan?",
    ]),
    actions: [
      { label: "What to Order", prompt: "Help me decide what to order at a restaurant." },
      { label: "Fast Food", prompt: "What are healthier fast-food choices?" },
      { label: "Lower-Sugar Drinks", prompt: "Give me lower-sugar beverage ideas." },
    ],
  },
  recipes: {
    text: fallbackText("Recipes", [
      "Give me a simple recipe",
      "Give me high-protein recipes",
      "Give me meal-prep recipes",
      "Give me family-friendly dinner ideas",
    ]),
    actions: [
      { label: "Simple Recipe", prompt: "Give me simple recipes." },
      { label: "High-Protein", prompt: "Give me high-protein recipes." },
      { label: "Meal Prep", prompt: "Give me meal-prep recipes." },
    ],
  },
  glp1: {
    text: `I can share general education about GLP-1 medications — eating well, hydration and protein reminders, questions for your provider, and when to contact your care team.

Tap a suggestion to get started, or tell me more.

FitSlim AI™ does not prescribe medication, change dosages, diagnose side effects, or replace provider guidance.`,
    actions: [
      { label: "Eating on GLP-1", prompt: "How should I think about eating while using GLP-1 medication?" },
      { label: "Provider Topics", prompt: "What should I ask my provider about GLP-1?" },
      { label: "When to Contact", prompt: "When should I contact my care team?" },
    ],
  },
  exercise: {
    text: fallbackText("Exercise & Movement", [
      "Create a beginner walking plan",
      "Give me strength training ideas",
      "Give me stretching and mobility ideas",
      "How do I stay motivated?",
    ]),
    actions: [
      { label: "Walking Plan", prompt: "Create a beginner walking plan." },
      { label: "Strength", prompt: "Give me strength training ideas for beginners." },
      { label: "Stretching", prompt: "Give me stretching and mobility ideas." },
    ],
  },
  hydration: {
    text: fallbackText("Hydration", [
      "Teach me the basics of hydration",
      "Give me beverage ideas besides plain water",
      "How can I remember to drink water?",
      "Hydration tips for busy days",
    ]),
    actions: [
      { label: "Basics", prompt: "Teach me the basics of hydration." },
      { label: "Beverage Ideas", prompt: "Give me beverage ideas besides plain water." },
      { label: "Reminders", prompt: "How can I remember to drink water?" },
    ],
  },
  habits: {
    text: fallbackText("Healthy Habits", [
      "Help me set health goals",
      "Help me track my habits",
      "Help me build a sleep routine",
      "Help me manage stress",
    ]),
    actions: [
      { label: "Set a Goal", prompt: "Help me set health goals." },
      { label: "Habit Tracking", prompt: "Help me track my habits." },
      { label: "Manage Stress", prompt: "Help me manage stress." },
    ],
  },
};

export const SECTION_RULES: Record<SectionSlug, SectionRule[]> = {
  nutrition,
  restaurants,
  recipes,
  glp1,
  exercise,
  hydration,
  habits,
};