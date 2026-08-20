# FitSlim Companion

Build a complete, polished, responsive web application called:

FITSLIM AI™

Tagline:
"Your everyday health & wellness companion."

IMPORTANT:
This is primarily an AI CHATBOT EXPERIENCE.

Do NOT build this as a generic healthcare dashboard, EHR, patient portal, medical-record application, or analytics dashboard.

The main product experience should be:
User opens FitSlim AI → sees a beautiful conversational AI interface → asks questions → receives helpful educational answers → can use quick actions, suggested prompts, recipes, meal ideas, habit support, travel guidance, exercise education, GLP-1 educational information, hydration support, and questions to discuss with their provider.

Use MOCK DATA ONLY for this first version.

Do not connect to a real AI API.
Do not connect to a database.
Do not implement authentication.
Do not implement real payments.
Do not implement real medical records.
Create realistic frontend interactions and local mock state so the application feels functional.

==================================================
1. PRODUCT POSITIONING
==================================================

FitSlim AI™ is an AI-powered educational wellness companion that works alongside the FitSlim Method™, FitSlim Blueprint™, and FitSlim Academy™.

It helps members with:

- Nutrition education
- Healthy meal planning
- Recipes
- Protein-focused meals
- Fiber-friendly meals
- Grocery planning
- Restaurant choices
- Travel wellness
- Hydration
- Exercise and movement
- Healthy habits
- Sleep routines
- Stress management
- Mindful eating
- General GLP-1 education
- Questions to discuss with a provider
- Understanding general health concepts
- Accountability and encouragement

The chatbot must clearly communicate:

"FitSlim AI™ provides educational support. It does not replace your provider."

Never present FitSlim AI as a doctor, nurse, therapist, pharmacist, or medical professional.

==================================================
2. VISUAL DESIGN DIRECTION
==================================================

Use the provided CSS style as the primary design reference.

The visual language should feel:

- Premium
- Modern
- Clean
- Warm
- Trustworthy
- Sophisticated
- Wellness-focused
- Technology-forward
- Human
- Not overly clinical

Use:

Work Sans as the primary font.

Exo 2 as the secondary/display font where appropriate.

Suggested font imports:

@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap');

Use CSS variables inspired by the supplied design:

--navy: #003064;
--deep-navy: #00275B;
--dark-teal: #0C3D4C;
--teal: #00A1B8;
--bright-teal: #0497B1;
--cobalt: #155EEF;
--smoke: #F5F5F5;
--white: #FFFFFF;
--black: #000000;
--light-blue: #D7EFF9;
--pale-teal: #EDF8F9;
--soft-green: #E4EFF0;
--green: #0DB26B;
--purple: #9155A7;
--indigo: #878DE1;
--text: #333333;
--muted: #6F747A;
--border: #E5E9ED;

Do not use a rainbow palette.

Primary UI should use navy, teal, white, pale blue, and subtle green accents.

Use gradients sparingly.

==================================================
3. GLOBAL DESIGN SYSTEM
==================================================

Border radius:

Cards: 20px
Buttons: 12–14px
Chat bubbles: 18–22px
Inputs: 14px

Use generous whitespace.

Use subtle shadows:

0 10px 30px rgba(0,48,100,0.08)

Cards should have:

background: white
border: 1px solid rgba(0,48,100,0.08)

Use smooth hover transitions.

Buttons should feel substantial and premium.

Primary button:

dark navy background
white text

Secondary button:

white/light background
navy text
navy border

Accent actions:

teal background

Use subtle micro-animations.

Avoid excessive animations.

==================================================
4. APPLICATION STRUCTURE
==================================================

Create a desktop-first responsive application.

Desktop:

Left sidebar navigation
Main chatbot workspace
Optional right contextual panel

Tablet:

Collapsible sidebar
Main chatbot workspace

Mobile:

Bottom navigation
Full-screen chatbot
Context panels become drawers/modals

Application shell:

--------------------------------------------
LEFT SIDEBAR
--------------------------------------------

FitSlim AI™ logo

Navigation:

Chat
Explore
Saved
My Blueprint
Academy
History
Settings

Bottom:

Help & Safety
User profile

--------------------------------------------
MAIN AREA
--------------------------------------------

Chat interface.

--------------------------------------------
RIGHT PANEL
--------------------------------------------

Contextual cards such as:

Today's Focus
My Blueprint
Suggested Actions
Saved Resources

The right panel can collapse.

==================================================
5. SIDEBAR
==================================================

Create a polished sidebar approximately 250px wide.

Top:

FitSlim AI™

Small label:

"Powered by FitSlim USA"

Navigation:

💬 Chat
✨ Explore
🔖 Saved
🎯 My Blueprint
🎓 FitSlim Academy
🕘 History

Divider

Account:

👤 Sarah Johnson

"Member since 2026"

Bottom:

⚙ Settings
🛡 Help & Safety

Add a small status card:

"AI Educational Support"

"FitSlim AI helps reinforce your wellness journey. It does not replace your care team."

Use a subtle teal icon.

==================================================
6. MAIN CHAT PAGE
==================================================

THIS IS THE MOST IMPORTANT SCREEN.

Create a premium conversational interface.

Header:

"FitSlim AI™"

Subtitle:

"Your everyday health & wellness companion."

Right side:

"Educational Support"

green/teal status pill

Three-dot menu.

Main welcome state:

Large heading:

"Hi Sarah 👋"

"How can I help you today?"

Supporting copy:

"Ask me about meals, nutrition, hydration, exercise, healthy habits, travel, or questions to discuss with your care team."

Then show suggested prompts.

==================================================
7. QUICK PROMPTS
==================================================

Create beautiful clickable prompt cards.

Examples:

🍳
"Give me a high-protein breakfast"

🥗
"Help me plan healthy meals this week"

🛒
"Create my grocery list"

🍽️
"What should I order at a restaurant?"

✈️
"Help me stay on track while traveling"

💧
"How can I drink more water?"

🚶
"Create a beginner walking plan"

😴
"Help me build a better evening routine"

💉
"Explain GLP-1 nutrition basics"

🩺
"What should I ask my provider?"

Clicking a prompt should populate the chat input and simulate a conversation.

==================================================
8. MOCK CHAT EXPERIENCE
==================================================

Make the chatbot interactive with mock responses.

When the user selects:

"Give me a high-protein breakfast"

Show:

USER:

"Give me a high-protein breakfast I can make in 10 minutes."

Then show an AI typing animation.

Then response:

FITSLIM AI:

"Absolutely. Here's a simple option:

Greek Yogurt Power Bowl

• Greek yogurt
• Berries
• Chia seeds
• A small handful of nuts
• Optional drizzle of honey

Prep time: about 5 minutes.

You can adjust the ingredients based on your preferences and nutritional needs.

Want me to turn this into a grocery list?"

Buttons:

"Create Grocery List"
"Give Me 3 More"
"Save Recipe"

==================================================
9. CHAT BUBBLES
==================================================

User messages:

Right aligned
navy background
white text

AI messages:

Left aligned
white background
dark text
subtle border

AI avatar:

Create a small elegant circular FitSlim AI icon.

Do NOT make it look like a humanoid robot.

Use an abstract AI/wellness symbol.

AI messages may contain:

Headings
Bullets
Numbered lists
Small cards
Recipe cards
Action buttons
Links to Academy lessons
Provider discussion prompts

==================================================
10. CHAT INPUT
==================================================

At bottom of chatbot:

Large rounded input.

Placeholder:

"Ask FitSlim AI anything about your wellness journey..."

Left:

+ button

Options:

Upload
Saved foods
Recipe
Camera placeholder

Center:

text input

Right:

microphone icon
send button

Below:

"FitSlim AI provides educational support and does not replace your healthcare provider."

Make this very subtle but visible.

==================================================
11. CHAT INTERACTIONS
==================================================

Simulate realistic interactions.

If user types:

"Help me plan meals"

Respond with:

"Absolutely. Let's keep it simple.

What would you like to prioritize?

1. Higher protein
2. More fiber
3. Easy meal prep
4. Lower-sugar choices
5. Budget-friendly meals

You can choose more than one."

Then show selectable buttons.

If user selects "Higher protein":

Show a 3-day meal plan.

Monday
Breakfast: Greek yogurt bowl
Lunch: Chicken grain bowl
Dinner: Salmon + vegetables

Tuesday
Breakfast: Egg & veggie wrap
Lunch: Turkey avocado salad
Dinner: Chicken stir-fry

Wednesday
Breakfast: Cottage cheese + berries
Lunch: Tuna salad wrap
Dinner: Turkey meatballs + vegetables

Add:

"Save Meal Plan"
"Create Grocery List"

==================================================
12. CHAT TOPICS
==================================================

Build topic-aware mock responses for:

Nutrition
Recipes
Restaurants
Travel
Hydration
Exercise
Healthy Habits
Sleep
Stress
GLP-1 Education
Provider Questions
Academy

Each should have unique mock content.

==================================================
13. GLP-1 SAFETY UX
==================================================

GLP-1 conversations require extra boundary messaging.

Example:

User:

"What foods are easier to tolerate when my appetite is reduced?"

AI:

"If you're experiencing reduced appetite while using a GLP-1 medication, some people find smaller, simpler meals easier to manage. You can focus on practical nutrition strategies such as adequate hydration and nutrient-dense foods.

Your individual needs can vary, so follow the guidance from your prescribing provider.

If you're experiencing significant or concerning symptoms, contact your care team."

Then show:

"Talk to My Provider"

"Learn GLP-1 Basics"

Never:

- Recommend medication changes
- Recommend dosage changes
- Diagnose side effects
- Tell the user to stop medication
- Tell the user to start medication
- Claim the user has a condition

==================================================
14. SAFETY / ESCALATION
==================================================

Create a polished safety banner component.

For relevant conversations:

"Some questions are best answered by your care team."

Buttons:

"Contact My Care Team"

"See Safety Information"

The UI should never imply that the care team has automatically been notified.

Create a Safety page.

Include:

"FitSlim AI is not an emergency service."

"For urgent or emergency symptoms, seek appropriate medical care."

Use emergency information only as generic placeholder content in the mockup.

Do not make false claims about monitoring.

==================================================
15. RIGHT SIDEBAR
==================================================

Create:

TODAY'S FOCUS

"Build Consistency"

Progress bar:

3 / 5 activities

Cards:

💧 Hydration
"Drink water regularly"

🥗 Nutrition
"Add a protein-focused meal"

🚶 Movement
"Take a 15-minute walk"

Each card:

Progress
Check button

==================================================
16. MY BLUEPRINT
==================================================

Create a beautiful informational page.

Title:

"My FitSlim Blueprint™"

Subtitle:

"Your personalized wellness roadmap."

Mock member data:

Sarah Johnson

Primary goals:

Healthy weight management
Improved nutrition consistency
More daily movement
Better hydration

Focus areas:

Protein
Hydration
Movement
Sleep
Healthy routines

Important:

Clearly label this as MOCK DATA.

Add:

"Your provider creates and updates your Blueprint™."

FitSlim AI:

"helps reinforce educational topics connected to your plan."

Do NOT allow the mock AI to modify the Blueprint.

==================================================
17. EXPLORE
==================================================

Create an Explore page.

Heading:

"Explore FitSlim AI"

Subtitle:

"Discover practical support for everyday wellness."

Large category cards:

Nutrition
Recipes
Restaurants
Travel
Hydration
Exercise
Healthy Habits
Sleep
Stress
GLP-1 Education

Each opens a topic page with:

Popular questions
Recommended prompts
Academy resources
Saved items

==================================================
18. SAVED
==================================================

Create a Saved Resources page.

Tabs:

All
Recipes
Meal Plans
Tips
Academy
Conversations

Mock saved items:

"5-Minute Protein Breakfasts"

"Healthy Restaurant Ordering Guide"

"3-Day Easy Meal Plan"

"Beginner Walking Routine"

"GLP-1 Nutrition Basics"

Each card has:

Title
Category
Date saved
Open button
Remove button

==================================================
19. HISTORY
==================================================

Create conversation history.

Title:

"Your Conversations"

Search input:

"Search conversations..."

Mock history:

Today
"High-protein breakfast ideas"

Yesterday
"Restaurant choices while traveling"

Aug 18
"Beginner walking plan"

Aug 16
"Simple grocery list"

Aug 14
"GLP-1 nutrition questions"

Clicking opens the conversation.

==================================================
20. ACADEMY INTEGRATION
==================================================

Create a FitSlim Academy page.

Heading:

"FitSlim Academy™"

Subtitle:

"Learn the skills that make healthy habits easier."

Mock categories:

Nutrition Basics
Protein
Hydration
Movement
Sleep
Mindful Eating
Healthy Habits
Long-Term Maintenance
GLP-1 Education

Lesson cards:

"Understanding Protein"

"Building a Balanced Plate"

"Hydration Basics"

"Smart Restaurant Choices"

"Creating Sustainable Habits"

Each:

Estimated time
Progress
Start Lesson

After each lesson:

"Ask FitSlim AI"

Example:

"You just learned about protein. Want help creating a high-protein meal plan?"

==================================================
21. PERSONALIZATION
==================================================

Create a member profile panel.

Mock data:

Sarah Johnson
Age: 42
Goals:
- Better nutrition consistency
- Healthy weight management
- Increase movement

Preferences:

Favorite foods:
Chicken
Greek yogurt
Salmon
Berries

Dietary preference:
Balanced

Activity:
Beginner

Do not include sensitive medical information.

Do not display diagnosis data.

==================================================
22. AI PERSONALIZATION CARD
==================================================

Right panel card:

"FitSlim AI remembers what helps you."

Example:

"You usually prefer quick meals and simple grocery lists."

Buttons:

"Edit Preferences"

"Manage AI Memory"

==================================================
23. AI MEMORY PAGE
==================================================

Create a page:

"AI Preferences & Memory"

Sections:

Goals
Food preferences
Favorite recipes
Preferred response style
Activity preferences

Toggle:

"Allow FitSlim AI to remember my preferences"

"Use previous conversations for personalization"

"Clear AI memory"

Make privacy controls obvious.

==================================================
24. PROVIDER QUESTIONS
==================================================

Create a special tool:

"Questions for My Provider"

User can type:

"What should I ask at my next visit?"

Mock AI response:

"Here are a few questions you may want to discuss with your provider:

• Are my current goals realistic?
• Should I make any changes to my nutrition plan?
• What symptoms should I let you know about?
• What should I focus on before my next appointment?"

Button:

"Save Questions"

Create a saved list.

==================================================
25. RESTAURANT MODE
==================================================

Create a dedicated conversational experience.

Heading:

"Restaurant Guide"

Prompt:

"Where are you eating?"

Mock options:

Fast Food
Casual Dining
Italian
Mexican
Asian
Breakfast
Coffee Shop

Then:

"What are you trying to prioritize?"

Higher protein
More vegetables
Balanced meal
Lower-sugar beverage
Simple choices

Show mock recommendations.

Avoid presenting recommendations as medical prescriptions.

==================================================
26. TRAVEL MODE
==================================================

Create:

"Travel Companion"

Inputs:

Destination
Trip duration
Dining situation

Mock:

Destination:
Denver

Duration:
4 days

Show:

Travel food strategies
Hydration reminders
Walking ideas
Restaurant strategies
Simple snack ideas

==================================================
27. RECIPE MODE
==================================================

Create a beautiful recipe response card.

Example:

"5-Minute Greek Yogurt Power Bowl"

Time:
5 min

Ingredients:
Greek yogurt
Blueberries
Strawberries
Chia seeds
Almonds

Steps:
1. Add yogurt.
2. Add berries.
3. Sprinkle chia seeds.
4. Add almonds.
5. Serve.

Buttons:

Save Recipe
Add to Grocery List
Ask FitSlim AI

==================================================
28. GROCERY LIST
==================================================

Create a grocery-list tool.

Mock list:

PROTEINS

□ Greek yogurt
□ Eggs
□ Chicken breast
□ Salmon

PRODUCE

□ Blueberries
□ Spinach
□ Broccoli
□ Avocado

PANTRY

□ Chia seeds
□ Oats
□ Almonds

Buttons:

Add Item
Check All
Clear
Print

==================================================
29. MOBILE EXPERIENCE
==================================================

On mobile, prioritize CHAT.

Mobile layout:

Top header:

FitSlim AI™

Menu button

Chat messages fill viewport.

Bottom:

Quick prompt horizontal scroll

Chat input fixed at bottom

Bottom navigation:

Chat
Explore
Saved
Blueprint
Profile

The chatbot must feel like a native premium mobile messaging app.

==================================================
30. LANDING / MARKETING PAGE
==================================================

Also create a public marketing page for FitSlim AI.

Hero:

Meet FitSlim AI™

"Practical wellness support for real life."

Supporting text:

"Get educational guidance for nutrition, meals, movement, hydration, travel, healthy habits, and questions to discuss with your care team."

Primary CTA:

"START YOUR FREE ASSESSMENT"

Secondary CTA:

"EXPLORE THE FITSLIM METHOD™"

Hero should use the same visual language as the supplied .fai-hero CSS.

Use:

min-height: 700px
max-width content 680px
left aligned content
large whitespace
Work Sans
navy/teal palette

Create a sophisticated abstract wellness/AI visual on the right side.

Do not use generic stock healthcare imagery.

==================================================
31. MARKETING PAGE SECTIONS
==================================================

Hero

Why FitSlim AI Matters

What FitSlim AI Can Help With

See It In Action

How It Works

FitSlim-Aligned Education

FitSlim Academy Integration

GLP-1 Education

Technology + Your Care Team

Safety Boundary

FAQ

CTA

Footer

==================================================
32. MARKETING HERO COPY
==================================================

Eyebrow:

FITSLIM AI™

Headline:

"Your questions don't only happen during appointments."

Subheadline:

"FitSlim AI™ gives members practical educational support for nutrition, meals, movement, hydration, travel, healthy habits, and more."

CTA:

"START YOUR FREE ASSESSMENT"

Secondary:

"EXPLORE THE FITSLIM METHOD™"

Add floating prompt cards around the visual:

"What's a high-protein breakfast?"

"Help me plan my groceries."

"What should I order at a restaurant?"

"Help me prepare questions for my provider."

==================================================
33. DESIGN THE MARKETING PAGE TO MATCH THE SUPPLIED CSS
==================================================

Use the supplied style concepts:

.fai-hero {
 position: relative;
 width: 100vw;
 min-height: 700px;
 padding: 3.5rem 0;
 overflow: hidden;
 font-family: 'Work Sans', sans-serif;
 display: flex;
 align-items: center;
 justify-content: flex-start;
}

Hero content:

width: 100%;
max-width: 680px;
padding: 3rem 1rem 3rem 4rem;
text-align: left;
display: flex;
flex-direction: column;
align-items: flex-start;

Use a large hero visual on the right.

Use subtle decorative circles, gradients, soft blobs, and abstract AI/wellness shapes.

==================================================
34. RESPONSIVE HERO
==================================================

Desktop:

Text left
Visual right

Tablet:

Text left
Visual right but smaller

Mobile:

Text centered
Visual underneath

Buttons become full-width.

==================================================
35. FAQ
==================================================

Create expandable FAQ cards.

Questions:

Is FitSlim AI a doctor?

Can FitSlim AI prescribe medication?

Can FitSlim AI change my GLP-1 dose?

Can FitSlim AI interpret my labs?

Can FitSlim AI help with meals?

Can FitSlim AI help while traveling?

Is FitSlim AI available 24/7?

What should I do if I have symptoms?

Answers should reinforce the educational-only boundary.

==================================================
36. SETTINGS
==================================================

Create:

Profile
Notifications
AI Preferences
AI Memory
Privacy
Security
Accessibility
Appearance
Help & Safety
Terms
Privacy Policy

Appearance:

Light
Dark
System

AI settings:

Personalization
Memory
Response style

==================================================
37. MOCK USER DATA
==================================================

Use this mock member:

Name:
Sarah Johnson

Member ID:
FS-10482

Member since:
March 2026

Goals:

Healthy weight management
Improve nutrition consistency
Increase movement
Improve hydration

Favorite foods:

Greek yogurt
Chicken
Salmon
Berries
Avocado

Preferred response style:

Simple and encouraging

Recent conversations:

"High-protein breakfast ideas"
"Healthy restaurant choices"
"3-day grocery list"
"Beginner walking plan"

Recent Academy lessons:

Protein Basics — 100%
Hydration Basics — 75%
Building Balanced Meals — 100%

==================================================
38. MOCK DASHBOARD CONTEXT
==================================================

Today's Focus:

Hydration
Nutrition
Movement

Progress:

3 / 5

Recent activity:

✓ Completed Protein Basics
✓ Saved Greek Yogurt Bowl
✓ Created grocery list
○ 15-minute walk

AI insight:

"You've been choosing quick, protein-focused meals lately. Want me to build a simple 3-day plan?"

==================================================
39. CHAT MOCK DATA
==================================================

Pre-populate the main chat with an example conversation:

USER:

"Can you help me plan a high-protein breakfast?"

AI:

"Absolutely! If you want something quick, try a Greek yogurt power bowl.

🥣 Greek Yogurt Power Bowl

• Greek yogurt
• Berries
• Chia seeds
• Almonds
• Optional drizzle of honey

Prep time: 5 minutes.

Would you like me to make this into a grocery list?"

Buttons:

Create Grocery List
Show More Breakfasts
Save Recipe

Then user:

"Create a grocery list."

AI:

"Here's a simple list for 3 breakfasts:

PROTEIN
• Greek yogurt

FRUIT
• Blueberries
• Strawberries

PANTRY
• Chia seeds
• Almonds

Want me to add anything else?"

==================================================
40. LOADING STATE
==================================================

When sending a message:

Show three animated dots.

AI avatar remains visible.

Use subtle animation.

Then show response.

==================================================
41. EMPTY STATES
==================================================

Create polished empty states for:

No saved resources
No conversation history
No saved provider questions
No AI memories
No grocery items

Use friendly language.

Example:

"Nothing saved yet."

"Save recipes, meal plans, and helpful answers so they're easy to find later."

==================================================
42. ACCESSIBILITY
==================================================

Use:

Semantic HTML
Keyboard navigation
Visible focus states
ARIA labels
Accessible contrast
Minimum 44px tap targets
Reduced-motion support

Do not rely solely on color.

==================================================
43. COMPONENT ARCHITECTURE
==================================================

Build reusable React components:

AppShell
Sidebar
MobileNavigation
TopBar
ChatWindow
ChatMessage
AIMessage
UserMessage
ChatInput
QuickPrompt
QuickPromptGrid
TypingIndicator
ContextPanel
FocusCard
BlueprintCard
AcademyCard
RecipeCard
MealPlanCard
GroceryList
ProviderQuestions
SafetyBanner
SavedResourceCard
ConversationHistory
ProfileCard
Modal
Toast
FAQAccordion

Keep components modular.

==================================================
44. ROUTES
==================================================

Create these routes:

/
/chat
/explore
/saved
/blueprint
/academy
/history
/provider-questions
/grocery-list
/recipes
/travel
/restaurants
/profile
/settings
/safety

Marketing:

/marketing

The root route should redirect to /chat for the mock authenticated experience.

==================================================
45. STATE
==================================================

Use local mock state.

Chat messages should update dynamically.

Quick prompts should populate/send messages.

Saved items should update.

Grocery items should be checkable.

Provider questions should be saveable.

Preferences should be editable.

Dark mode should work.

Sidebar should collapse.

No backend required.

==================================================
46. MICROINTERACTIONS
==================================================

Use tasteful animations:

Message fade-in
Typing indicator
Button hover
Card hover
Modal transitions
Toast notifications
Save animation
Checkmark animation

Do not over-animate the UI.

==================================================
47. IMPORTANT HEALTHCARE BOUNDARIES
==================================================

FitSlim AI must NOT:

Diagnose conditions
Prescribe medication
Change medication
Recommend medication doses
Interpret personal laboratory results
Create treatment plans
Claim to be a doctor
Claim to replace a provider
Claim to monitor the user continuously
Claim that a provider has been notified
Claim to provide emergency monitoring

When a conversation becomes medical or urgent:

Use:

"This is something to discuss with your healthcare provider."

For emergency situations:

"Seek emergency medical care or contact local emergency services."

Do not hard-code "911" into the core product UI because the product may eventually be used outside the United States. Use configurable safety resources.

==================================================
48. IMPORTANT PRODUCT BOUNDARY
==================================================

Do not make the UI feel like:

- An EHR
- Patient portal
- Medical chart
- Provider dashboard
- Hospital application
- Lab dashboard
- Clinical monitoring system

Instead make it feel like:

Premium AI wellness companion
+
Conversational assistant
+
FitSlim education platform
+
Personalized wellness support

==================================================
49. FOOTER
==================================================

Footer:

FitSlim AI™

"Educational support for your wellness journey."

Links:

FitSlim Method™
FitSlim Academy™
Membership
Privacy
Terms
Help & Safety
Contact

Footer text:

"FitSlim AI™ provides general educational and wellness support and does not replace professional medical advice, diagnosis, or treatment."

==================================================
50. FINAL VISUAL QUALITY
==================================================

The result should look like a real premium SaaS/consumer wellness product.

Do NOT create a generic Tailwind dashboard.

Avoid:

Excessive cards
Tiny typography
Dense tables
Hospital blue
Generic medical icons
Stock healthcare dashboards
Overly rounded childish UI
Huge gradients
Neon AI aesthetics
Cyberpunk styling

Aim for:

Apple-level simplicity
Modern wellness brand
Premium SaaS
Clean conversational UI
Strong typography
Large whitespace
Elegant navy + teal palette
High-quality interaction design

The CHAT should receive the most design attention.

The first impression should immediately communicate:

"This is a sophisticated AI wellness companion."

==================================================
51. PRIORITY ORDER
==================================================

If implementation time is limited, prioritize in this order:

1. Chat UI
2. Chat interactions
3. Quick prompts
4. AI responses
5. Safety boundaries
6. Responsive mobile chat
7. Explore
8. Saved resources
9. My Blueprint
10. Academy
11. Provider Questions
12. Grocery List
13. Recipe mode
14. Restaurant mode
15. Travel mode
16. History
17. Settings
18. Marketing landing page

==================================================
52. IMPORTANT LOVABLE INSTRUCTION
==================================================

Do not just generate static screens.

Make the mock application FEEL FUNCTIONAL.

Examples:

Clicking a quick prompt starts a conversation.

Typing a message produces a contextual mock AI response.

Save buttons actually add items to Saved.

Grocery list checkboxes work.

Provider questions can be saved.

Recipe cards can be saved.

Sidebar navigation works.

Mobile navigation works.

Dark mode works.

Settings toggles work.

Modals work.

Toast notifications work.

The application should feel like a functioning product prototype rather than a collection of screenshots.

Use realistic mock data throughout.

Do not use lorem ipsum.

Do not leave empty placeholder sections.

Do not write "coming soon" unless absolutely necessary.

==================================================
53. BRAND VOICE
==================================================

FitSlim AI should sound:

Warm
Clear
Encouraging
Practical
Confident
Non-judgmental

Avoid:

Fear
Shame
Medical jargon
Overly clinical language
Absolute health claims
Promises of outcomes

Example:

Instead of:

"You failed to follow your plan."

Use:

"Let's make the next choice a little easier."

Instead of:

"You need to improve your diet."

Use:

"Here are a few simple ways to make your meals more balanced."

==================================================
54. HERO EXPERIENCE
==================================================

The most important marketing statement:

"Your questions don't only happen during appointments."

Follow with:

"FitSlim AI™ gives you practical educational support when real life happens — from meal planning and restaurant choices to hydration, movement, travel, healthy habits, and questions for your care team."

Primary CTA:

START YOUR FREE ASSESSMENT

Secondary CTA:

TRY FITSLIM AI™

==================================================
55. FINAL OUTPUT
==================================================

Generate the complete frontend application now.

Use React + TypeScript.

Use Tailwind CSS where appropriate, but create a custom design system matching the provided CSS.

Use Lucide icons.

Do not use external image dependencies unless absolutely necessary.

Use CSS shapes, gradients, icons, and illustrations for the AI/wellness visuals.

Use the provided Work Sans / Exo 2 typography.

Make every major screen polished.

Make desktop and mobile responsive.

The CHAT EXPERIENCE IS THE CORE PRODUCT.

Do not build an EHR.

Do not build a provider dashboard.

Do not build clinical records.

Do not build medication tracking.

Do not build lab-result interpretation.

Build a premium AI wellness chatbot prototype with realistic mock interactions and data.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d262ee43-95bc-47c5-9956-966fc367e2ea).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
