// The 30 Days of Stix calendar. Each reel is a list of scenes; a scene's
// length is the larger of its `min` seconds and its voiceover plus a beat.
// Footage ranges skip moments where licensed art (anime posters, car or
// film posters, F1) fills the frame.

export type ClipRef = readonly [file: string, from: number, to: number];

export const CLIPS = {
  trays: ["s01", 0, 2.5],
  trays2: ["s02", 0, 1.5],
  trays3: ["s12", 0, 2.2],
  sheets: ["s05", 2.5, 5.4],
  sheets2: ["s12", 4.6, 8],
  sheets3: ["s20", 0, 3.5],
  sheets4: ["s07", 4.2, 6.5],
  crowd1: ["s04", 0, 5.8],
  crowd2: ["s10", 0, 6],
  crowd3: ["s11", 0, 4.6],
  crowd4: ["s16", 0, 6.2],
  crowd5: ["s17", 0, 6],
  crowd6: ["s18", 0, 6.3],
  crowd7: ["s24", 0, 5.7],
  crowd8: ["s23", 0, 5.6],
  picker: ["s21", 0, 4.6],
  picker2: ["s19", 0, 2.5],
  hands: ["s08", 0, 9.6],
  cricut: ["s13", 0, 27.3],
  cricut2: ["s13", 9, 18],
  trishul: ["s14", 0, 3.9],
  custom: ["s15", 0, 5],
} as const satisfies Record<string, ClipRef>;

export type ClipName = keyof typeof CLIPS;

type Base = {
  /** Voiceover line, also shown as subtitles. */
  vo?: string;
  /** Minimum on-screen seconds. */
  min?: number;
};

export type Scene = Base &
  (
    | { kind: "footage"; clips: ClipName[]; text?: string; tag?: string }
    | { kind: "title"; lines: string[]; bg?: "ink" | "lemon"; designs?: boolean }
    | { kind: "list"; title: string; items: string[]; numbered?: boolean; clip?: ClipName }
    | { kind: "versus"; title: string; left: [string, string]; right: [string, string]; art?: "cut" | "paper" | "size" }
    | { kind: "designs"; text?: string; numbered?: boolean; ids?: number[]; layout?: "grid" | "rain" | "flash" }
    | { kind: "cta"; line?: string }
  );

export type Reel = {
  day: number;
  title: string;
  /** Music mix used for the preview render (m1..m5). */
  music: "m1" | "m2" | "m3" | "m4" | "m5";
  scenes: Scene[];
};

// Lines in *asterisks* render in lemon.
export const REELS: Reel[] = [
  {
    day: 1,
    title: "Two Goan students, one sticker stall",
    music: "m3",
    scenes: [
      { kind: "title", lines: ["Day 1 of 30", "*30 Days of Stix*"], min: 1.4, vo: "Day one of thirty." },
      { kind: "footage", clips: ["crowd2", "crowd6"], text: "We're Stix N Vibes", vo: "We're Stix N Vibes. Two students from Goa who sell stickers." },
      { kind: "footage", clips: ["trays", "sheets2"], text: "Stickers. Posters. Framez.", vo: "Stickers, posters and Framez, at college stalls across Goa." },
      { kind: "footage", clips: ["crowd4"], text: "30 reels. 30 days.", vo: "For the next thirty days, we'll show you everything. How we make them, how to use them, and why people line up." },
      { kind: "cta", line: "Follow for Day 2", vo: "Follow so you don't miss day two." },
    ],
  },
  {
    day: 2,
    title: "What is a vinyl sticker?",
    music: "m5",
    scenes: [
      { kind: "title", lines: ["Paper sticker", "vs", "*vinyl sticker*"], min: 1.4, vo: "Not all stickers are the same." },
      { kind: "versus", title: "The difference", art: "paper", left: ["Paper", "Tears. Fades. Hates water."], right: ["Vinyl", "Flexible. Tough. Splash-proof."], vo: "A plain paper sticker tears and peels the first time it gets wet. Vinyl is a flexible plastic film, so it bends with the surface and handles splashes." },
      { kind: "footage", clips: ["sheets", "sheets3"], text: "Ours: splash-proof vinyl", vo: "Our stickers are printed on waterproof, splash-proof paper vinyl." },
      { kind: "list", title: "Made for", items: ["Laptops", "Water bottles", "Phone cases", "Notebooks"], vo: "Which means they're made for things you actually carry every day." },
      { kind: "cta", vo: "Follow for day three." },
    ],
  },
  {
    day: 3,
    title: "Stall setup: empty table to sticker wall",
    music: "m1",
    scenes: [
      { kind: "title", lines: ["Day 3", "*Setting up*", "the stall"], min: 1.3 },
      { kind: "footage", clips: ["trays2"], text: "8:00 am", min: 1.4 },
      { kind: "footage", clips: ["trays"], text: "8:15 am", min: 1.4 },
      { kind: "footage", clips: ["sheets2"], text: "8:30 am", min: 1.6 },
      { kind: "footage", clips: ["crowd1"], text: "10:00 am", min: 2.4 },
      { kind: "footage", clips: ["crowd5"], text: "Sold out vibes", min: 2 },
      { kind: "cta", min: 1.8 },
    ],
  },
  {
    day: 4,
    title: "How we cut stickers live",
    music: "m2",
    scenes: [
      { kind: "title", lines: ["How we cut", "*stickers live*"], min: 1.4, vo: "Here's how we cut stickers live at the stall." },
      { kind: "footage", clips: ["cricut"], tag: "Step 1", text: "Print the design", vo: "First, we print the design on a sheet of vinyl." },
      { kind: "footage", clips: ["cricut2"], tag: "Step 2", text: "The Cricut cuts it", vo: "Then the sheet goes into our Cricut. A tiny blade follows the outline of every sticker." },
      { kind: "footage", clips: ["trishul"], tag: "Step 3", text: "Peel. Done.", vo: "We peel it, hand it over, and you stick it. Usually in a couple of minutes." },
      { kind: "footage", clips: ["crowd7"], text: "Any shape you want", vo: "Because we cut on the spot, we can cut almost any shape you want." },
      { kind: "cta", vo: "Come watch it live at our next stall." },
    ],
  },
  {
    day: 5,
    title: "Pick your vibe",
    music: "m4",
    scenes: [
      { kind: "title", lines: ["Pick", "*your vibe*"], min: 1.3 },
      { kind: "designs", numbered: true, ids: [1, 3, 5, 8, 11, 14], layout: "grid", text: "Comment your number", min: 6 },
      { kind: "cta", line: "Comment 1 to 6", min: 2.4 },
    ],
  },
  {
    day: 6,
    title: "7 places to stick a sticker",
    music: "m1",
    scenes: [
      { kind: "title", lines: ["7 places", "to stick", "*a sticker*"], min: 1.4, vo: "Seven places to stick a sticker." },
      { kind: "list", title: "Stick it on", numbered: true, items: ["Laptop", "Water bottle", "Phone case", "Notebook", "Helmet", "Guitar", "Mirror"], clip: "hands", vo: "Your laptop. Your water bottle. Your phone case. Notebooks. Helmets. Your guitar. And the mirror you check every morning." },
      { kind: "designs", layout: "rain", text: "Where's yours going?", vo: "Tell us where yours is going.", min: 2.5 },
      { kind: "cta", vo: "Follow for day seven." },
    ],
  },
  {
    day: 7,
    title: "See you Sunday",
    music: "m3",
    scenes: [
      { kind: "footage", clips: ["crowd3"], text: "Week 1 done", min: 1.8 },
      { kind: "footage", clips: ["picker"], text: "New designs", min: 1.8 },
      { kind: "footage", clips: ["crowd6"], text: "Same energy", min: 1.8 },
      { kind: "footage", clips: ["crowd2"], text: "See you this weekend", min: 2.4 },
      { kind: "cta", line: "Watch our stories for the venue", min: 2.4 },
    ],
  },
  {
    day: 8,
    title: "Die cut vs kiss cut",
    music: "m5",
    scenes: [
      { kind: "title", lines: ["Die cut", "vs", "*kiss cut*"], min: 1.4, vo: "Die cut versus kiss cut. Here's the difference." },
      { kind: "versus", title: "Two ways to cut", art: "cut", left: ["Die cut", "Cut through the backing, in the sticker's shape"], right: ["Kiss cut", "Cut through the vinyl only, backing stays square"], vo: "A die cut sticker is cut all the way through, so the whole thing is the shape of the design. A kiss cut only cuts the vinyl, so the sticker sits on a square backing." },
      { kind: "list", title: "Pick", items: ["Die cut: clean, shaped look", "Kiss cut: easy peel, great for gifting", "Circle or square: simple and bold"], vo: "Die cut looks cleaner. Kiss cut is easier to peel and great for gifts. And we also do circles and squares." },
      { kind: "cta", vo: "Ask us for any cut you want." },
    ],
  },
  {
    day: 9,
    title: "Stick it without bubbles",
    music: "m2",
    scenes: [
      { kind: "title", lines: ["No more", "*bubbles*"], min: 1.4, vo: "How to stick a sticker without bubbles." },
      { kind: "list", title: "4 steps", numbered: true, items: ["Wipe the surface clean and dry", "Peel one edge, not the whole thing", "Press from the centre out", "Smooth with a card"], clip: "hands", vo: "One. Wipe the surface clean and dry. Two. Peel one edge, not the whole backing. Three. Press it down from the centre outwards. Four. Smooth it with a card to push any air out." },
      { kind: "footage", clips: ["picker2", "sheets4"], text: "Perfect. Every time.", vo: "That's it. Perfect every time." },
      { kind: "cta", vo: "Save this for your next sticker." },
    ],
  },
  {
    day: 10,
    title: "POV: you walk into our stall",
    music: "m4",
    scenes: [
      { kind: "footage", clips: ["crowd5"], text: "POV: you walk into our stall", min: 2.2 },
      { kind: "footage", clips: ["crowd1"], min: 1.6 },
      { kind: "footage", clips: ["hands"], text: "\"I'll just look\"", min: 2 },
      { kind: "footage", clips: ["picker"], text: "Leaves with 12", min: 2.2 },
      { kind: "cta", min: 2 },
    ],
  },
  {
    day: 11,
    title: "A4 vs A3 peel-to-paste posters",
    music: "m3",
    scenes: [
      { kind: "title", lines: ["Posters", "that *peel*", "and paste"], min: 1.4, vo: "Our posters peel and paste. No tape, no pins." },
      { kind: "versus", title: "Pick your size", art: "size", left: ["A4", "Desk, cupboard, small walls"], right: ["A3", "The statement piece"], vo: "A four is perfect for desks, cupboards and smaller walls. A three is double the size, for the one wall everyone sees." },
      { kind: "footage", clips: ["sheets3"], text: "Peel. Stick. Done.", vo: "Peel off the back, stick it up, done." },
      { kind: "cta", vo: "Find them at our stalls or in the shop." },
    ],
  },
  {
    day: 12,
    title: "Rate this design",
    music: "m5",
    scenes: [
      { kind: "footage", clips: ["trishul"], text: "Rate this 1 to 10", min: 4 },
      { kind: "footage", clips: ["cricut2"], text: "Cut live at our stall", min: 3.5 },
      { kind: "cta", line: "Drop your rating", min: 2.5 },
    ],
  },
  {
    day: 13,
    title: "Your image, our sticker",
    music: "m1",
    scenes: [
      { kind: "title", lines: ["Your image.", "*Our sticker.*"], min: 1.4, vo: "Got an image you love? We'll turn it into a sticker." },
      { kind: "list", title: "How custom works", numbered: true, items: ["DM us your image", "Pick the cut and size", "We print and cut it", "Dispatched in 2 days"], vo: "Send us your image on Instagram. Pick the cut and the size. We print it and cut it. And it's dispatched in two days." },
      { kind: "footage", clips: ["custom"], text: "Pets, logos, inside jokes", vo: "Pets, logos, your band, inside jokes. If you have the image, we can make it." },
      { kind: "cta", line: "DM \"CUSTOM\" to start", vo: "DM us the word custom to start." },
    ],
  },
  {
    day: 14,
    title: "Priced for students, on purpose",
    music: "m3",
    scenes: [
      { kind: "title", lines: ["Why are we", "*this cheap?*"], min: 1.4, vo: "People keep asking why our stickers cost so little." },
      { kind: "footage", clips: ["crowd4"], text: "We're students too", vo: "Simple. We're students too. We know what a student budget looks like." },
      { kind: "footage", clips: ["sheets2"], text: "Niche designs, Goa price", vo: "So we keep prices low enough that you can collect, not just buy one." },
      { kind: "cta", vo: "Come see the price card at our next stall." },
    ],
  },
  {
    day: 15,
    title: "The crowd at our last stall",
    music: "m4",
    scenes: [
      { kind: "footage", clips: ["crowd6"], text: "Our last college stall", min: 2 },
      { kind: "footage", clips: ["crowd8"], min: 1.6 },
      { kind: "footage", clips: ["crowd7"], min: 1.6 },
      { kind: "footage", clips: ["crowd5"], text: "Thank you, Goa", min: 2.4 },
      { kind: "cta", min: 2.2 },
    ],
  },
  {
    day: 16,
    title: "One stall, 100 vibes",
    music: "m2",
    scenes: [
      { kind: "title", lines: ["One stall", "*100 vibes*"], min: 1.2 },
      { kind: "footage", clips: ["trays", "sheets", "trays3", "sheets2", "hands", "sheets3"], text: "Pick fast", min: 4.5 },
      { kind: "designs", layout: "flash", text: "Which one's yours?", min: 4 },
      { kind: "footage", clips: ["crowd6", "picker", "crowd4"], text: "See you there", min: 2.4 },
      { kind: "cta", line: "Find us this weekend", min: 2 },
    ],
  },
  {
    day: 17,
    title: "Do stickers ruin laptops?",
    music: "m5",
    scenes: [
      { kind: "title", lines: ["Do stickers", "*ruin*", "your laptop?"], min: 1.4, vo: "Do stickers ruin your laptop?" },
      { kind: "title", lines: ["Short answer:", "*no.*"], min: 1.3, vo: "Short answer, no." },
      { kind: "list", title: "Good to know", items: ["Don't cover the vents", "Peel slowly to remove", "Leftover glue? A drop of rubbing alcohol"], vo: "Just don't cover the air vents. When you want to remove one, peel slowly. And if any glue stays behind, a drop of rubbing alcohol on a cloth takes it off." },
      { kind: "cta", vo: "Follow for more sticker tips." },
    ],
  },
  {
    day: 18,
    title: "Which vibe are you?",
    music: "m1",
    scenes: [
      { kind: "title", lines: ["Which vibe", "*are you?*"], min: 1.3, vo: "Which vibe are you?" },
      { kind: "designs", ids: [2, 7, 13], layout: "grid", text: "1 · Cosy night in", vo: "Number one. Cosy nights in." },
      { kind: "designs", ids: [4, 9, 16], layout: "grid", text: "2 · Main character", vo: "Number two. Main character energy." },
      { kind: "designs", ids: [6, 10, 17], layout: "grid", text: "3 · Lo-fi forever", vo: "Number three. Lo-fi forever." },
      { kind: "cta", line: "Comment 1, 2 or 3", vo: "Comment your number." },
    ],
  },
  {
    day: 19,
    title: "How to order on Instagram",
    music: "m3",
    scenes: [
      { kind: "title", lines: ["Can't make", "it to a *stall?*"], min: 1.4, vo: "Can't make it to a stall? Order on Instagram." },
      { kind: "list", title: "Order in 3 steps", numbered: true, items: ["DM @stixnvibes", "Pick designs or send your own", "Dispatched in 2 days"], vo: "Send us a DM. Pick from our designs, or send your own. We dispatch in two days." },
      { kind: "cta", line: "Or shop.stixnvibes.com", vo: "Or browse the shop. Link in bio." },
    ],
  },
  {
    day: 20,
    title: "Behind the trays",
    music: "m2",
    scenes: [
      { kind: "title", lines: ["Behind", "*the trays*"], min: 1.3, vo: "Behind the trays." },
      { kind: "footage", clips: ["trays", "trays3"], text: "Sorted by vibe", vo: "Every tray is sorted by vibe, so you can find your kind of sticker fast." },
      { kind: "footage", clips: ["hands"], text: "Dig in", vo: "And yes, you're allowed to dig through all of them." },
      { kind: "footage", clips: ["picker2"], text: "New drops every stall", vo: "We bring new designs to almost every stall." },
      { kind: "cta", vo: "Follow for day twenty-one." },
    ],
  },
  {
    day: 21,
    title: "What is Framez?",
    music: "m5",
    scenes: [
      { kind: "title", lines: ["What is", "*Framez?*"], min: 1.3, vo: "What is Framez?" },
      { kind: "footage", clips: ["sheets3"], text: "Prints, framed", vo: "Framez are our prints, framed and ready to put up." },
      { kind: "list", title: "Perfect for", items: ["Your desk", "Your room", "A gift that feels personal"], vo: "For your desk, your room, or a gift that actually feels personal." },
      { kind: "cta", line: "DM us for sizes", vo: "DM us for sizes and designs." },
    ],
  },
  {
    day: 22,
    title: "Tag the friend",
    music: "m4",
    scenes: [
      { kind: "designs", layout: "flash", text: "Tag the friend whose laptop needs this", min: 6 },
      { kind: "cta", line: "Tag them", min: 2.2 },
    ],
  },
  {
    day: 23,
    title: "Sticker care: 3 tips",
    music: "m1",
    scenes: [
      { kind: "title", lines: ["Make it", "*last*"], min: 1.3, vo: "Three tips to make your stickers last." },
      { kind: "list", title: "Sticker care", numbered: true, items: ["Give it a day before it meets water", "Wipe, don't scrub", "Keep edges pressed down"], vo: "One. Give it a day to settle before it meets water. Two. Wipe it, don't scrub it. Three. If an edge lifts, press it back down." },
      { kind: "cta", vo: "Save this one." },
    ],
  },
  {
    day: 24,
    title: "Why we started",
    music: "m3",
    scenes: [
      { kind: "title", lines: ["Why we", "*started*"], min: 1.3, vo: "Why we started Stix N Vibes." },
      { kind: "footage", clips: ["sheets"], text: "Cool stickers. Crazy prices.", vo: "We loved stickers. But the cool ones were hard to find in Goa, and too expensive for a student." },
      { kind: "footage", clips: ["cricut"], text: "So we bought a Cricut", vo: "So we decided to make them ourselves." },
      { kind: "footage", clips: ["crowd2", "crowd4"], text: "Atreya + Kritik", vo: "That's Atreya and Kritik. Now Stix N Vibes shows up at college stalls across Goa." },
      { kind: "cta", vo: "Thank you for being part of it." },
    ],
  },
  {
    day: 25,
    title: "What to bring to our stall",
    music: "m2",
    scenes: [
      { kind: "title", lines: ["Coming to", "our *stall?*"], min: 1.3, vo: "Coming to our stall? Bring these." },
      { kind: "list", title: "Bring", items: ["Cash or UPI", "Your laptop or bottle", "Your friends", "A custom idea"], clip: "crowd3", vo: "Cash or U P I. Your laptop or bottle, so you can stick on the spot. Your friends. And any custom idea you have." },
      { kind: "cta", vo: "See you there." },
    ],
  },
  {
    day: 26,
    title: "17 designs in 10 seconds",
    music: "m5",
    scenes: [
      { kind: "title", lines: ["17 designs", "*10 seconds*"], min: 1.4 },
      { kind: "designs", layout: "flash", text: "Screenshot your fave", min: 7 },
      { kind: "cta", min: 1.8 },
    ],
  },
  {
    day: 27,
    title: "Build a poster wall",
    music: "m4",
    scenes: [
      { kind: "title", lines: ["Build a", "*poster wall*"], min: 1.3, vo: "How to build a poster wall that looks planned." },
      { kind: "list", title: "4 rules", numbered: true, items: ["Start with one A3 in the middle", "Add A4s around it", "Keep the gaps the same", "Stick to two or three colours"], vo: "Start with one A three in the middle. Add A fours around it. Keep the gaps the same. And stick to two or three colours." },
      { kind: "footage", clips: ["sheets3"], text: "No tape. No pins.", vo: "Our posters peel and paste, so you can move them around until it's right." },
      { kind: "cta", vo: "Follow for day twenty-eight." },
    ],
  },
  {
    day: 28,
    title: "5 ways to style your stuff",
    music: "m1",
    scenes: [
      { kind: "title", lines: ["Style your", "*stuff*"], min: 1.4, vo: "Five ways to style your stuff with stickers." },
      { kind: "list", title: "5 tips", numbered: true, items: ["Pick one theme", "Start big in a corner", "Mix sizes", "Leave some breathing space", "Add one statement piece"], vo: "Pick one theme. Start with a big one in a corner. Mix sizes. Leave some breathing space. And finish with one statement piece." },
      { kind: "designs", layout: "flash", ids: [3, 8, 12, 14, 16, 1, 5], min: 3, vo: "Start with these." },
      { kind: "cta", vo: "Show us yours. Tag us." },
    ],
  },
  {
    day: 29,
    title: "Artists: send us your designs",
    music: "m3",
    scenes: [
      { kind: "title", lines: ["Calling", "*artists*"], min: 1.3, vo: "Calling all artists in Goa." },
      { kind: "footage", clips: ["trishul"], text: "Your art. On laptops.", vo: "Want to see your art on laptops all over Goa?" },
      { kind: "list", title: "How", numbered: true, items: ["DM us your portfolio", "We pick designs together", "We print, cut and sell at stalls"], vo: "DM us your portfolio. We pick designs together. Then we print them, cut them and take them to our stalls." },
      { kind: "cta", line: "DM \"ARTIST\"", vo: "DM us the word artist." },
    ],
  },
  {
    day: 30,
    title: "Day 30: thank you",
    music: "m4",
    scenes: [
      { kind: "title", lines: ["Day 30", "*we did it*"], min: 1.3, vo: "Day thirty. We did it." },
      { kind: "footage", clips: ["crowd6", "crowd1"], text: "30 reels later", vo: "Thirty reels. Cutting, sticking, stalls and a lot of you." },
      { kind: "designs", layout: "rain", text: "Thank you", vo: "Thank you for watching, sharing and showing up." },
      { kind: "footage", clips: ["crowd5"], text: "Next stall soon", vo: "Our next stall is coming soon. Watch our stories for the date." },
      { kind: "cta", vo: "Follow Stix N Vibes. Your stickers, your vibe." },
    ],
  },
];
