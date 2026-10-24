// 100 reels in 10 series of 10, about 30 s each. Same scene kinds as the
// challenge; the builders below just keep the calendar readable.
// Slides: sr = Soft Rebellion, jj = Journal Jotz, rt = Retro pt1.
// Soft Rebellion slides 03, 16 and 17 carry swear words, so they stay out.
import type { ClipName, Reel, Scene } from "./reels";

type Music = Reel["music"];

const T = (lines: string[], vo?: string, min = 1.4): Scene => ({ kind: "title", lines, vo, min });
const TL = (lines: string[], vo?: string, min = 1.4): Scene => ({ kind: "title", lines, vo, min, bg: "lemon" });
const F = (clips: ClipName[], text?: string, vo?: string, min?: number): Scene => ({ kind: "footage", clips, text, vo, min });
const S = (src: string, text?: string, vo?: string, focus: "zoom" | "quads" | "pan" = "zoom", min?: number): Scene => ({
  kind: "slide",
  src,
  text,
  vo,
  focus,
  min,
});
const D = (ids: number[] | undefined, text?: string, vo?: string, layout: "grid" | "rain" | "flash" = "grid", min?: number): Scene => ({
  kind: "designs",
  ids,
  text,
  vo,
  layout,
  min,
});
const N = (ids: number[], text: string, vo?: string, min?: number): Scene => ({ kind: "designs", ids, text, vo, layout: "grid", numbered: true, min });
const L = (title: string, items: string[], vo: string, opts: { numbered?: boolean; clip?: ClipName } = {}): Scene => ({
  kind: "list",
  title,
  items,
  vo,
  ...opts,
});
const V = (title: string, left: [string, string], right: [string, string], vo: string, art?: "cut" | "paper" | "size"): Scene => ({
  kind: "versus",
  title,
  left,
  right,
  vo,
  art,
});
const END = (vo?: string, line?: string, min?: number): Scene => ({ kind: "cta", vo, line, min });

// Stall footage for each episode's outro, rotated so neighbours differ.
const MONTAGES: ClipName[][] = [
  ["crowd1", "crowd5"],
  ["crowd2", "crowd6"],
  ["crowd3", "crowd7"],
  ["crowd4", "crowd8"],
  ["picker", "sheets2"],
  ["trays", "crowd2"],
  ["sheets3", "crowd5"],
  ["crowd6", "picker2"],
  ["crowd7", "sheets"],
  ["crowd8", "trays3"],
];

/** What we actually sell and how, for the brand-fact scene. */
const FACTS: [text: string, vo: string, clips: ClipName[]][] = [
  ["Waterproof vinyl", "Every sticker is printed on waterproof, splash-proof vinyl.", ["sheets", "sheets4"]],
  ["Cut live", "At our stalls, we cut custom stickers live on a Cricut.", ["cricut", "cricut2"]],
  ["A4 + A3 posters", "We also make peel and paste posters, in A4 and A3.", ["sheets3", "sheets2"]],
  ["Framez", "And Framez, ready to stand on your desk or hang on your wall.", ["sheets2", "trays3"]],
  ["Custom? DM us", "Want something custom? Send us a DM on Instagram.", ["custom", "trishul"]],
  ["Dispatched in 2 days", "Order online and we dispatch in two days.", ["sheets", "hands"]],
  ["UPI or cash", "At the stall, pay by UPI or cash. Whatever's easy.", ["crowd3", "picker"]],
  ["Student prices", "Niche designs at prices made for students.", ["picker2", "trays"]],
  ["Across Goa", "Find us at college fests and pop-ups across Goa.", ["crowd1", "crowd4"]],
  ["shop.stixnvibes.com", "Or shop anytime at shop dot stixnvibes dot com.", ["sheets3", "trays2"]],
];

/** Break a title into title-card lines of about 12 characters. */
const wrap = (title: string) =>
  title.split(" ").reduce<string[]>((lines, word) => {
    const last = lines[lines.length - 1];
    if (last && (last + " " + word).length <= 12) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
    return lines;
  }, []);

/**
 * Each episode gets the same frame around its own scenes: a music-only beat in
 * the middle (unless it already has one), a stall outro with its own line, a
 * "next up" teaser for the following episode, then the end card.
 */
const series = (name: string, music: Music[], outro: [text: string, vo: string][], reels: { title: string; scenes: Scene[] }[]): Reel[] =>
  reels.map((r, i) => {
    const body = r.scenes.slice(0, -1);
    const end = r.scenes[r.scenes.length - 1];
    const hasBeat = body.some((s) => s.kind === "designs" && (s.layout === "flash" || s.layout === "rain") && !s.vo);
    if (!hasBeat) body.splice(Math.ceil(body.length / 2), 0, D(undefined, undefined, undefined, i % 2 ? "rain" : "flash", 2.2));
    // Shorter episodes get one brand fact so every reel lands near 30 s.
    const words = r.scenes.reduce((n, sc) => n + (sc.vo ? sc.vo.split(" ").length : 0), 0);
    if (words < 90) {
      const [factText, factVo, clips] = FACTS[(i + name.length) % FACTS.length];
      body.push(F(clips, factText, factVo));
    }
    const [text, vo] = outro[i];
    body.push(F(MONTAGES[(i + name.length) % MONTAGES.length], text, vo));
    const next = reels[i + 1]?.title;
    body.push(
      next
        ? TL(["Next up", ...wrap(next).map((l) => `*${l}*`)], `Next episode. ${next}.`, 2.2)
        : TL(["New series", "*soon*"], `That's the end of ${name}. A new series starts soon.`, 2.2),
    );
    return { ...r, scenes: [...body, end], series: name, ep: i + 1, music: music[i % music.length], breath: 0.45 };
  });

// ---------------------------------------------------------------- 1. Sticker Mood

const mood = series("Sticker Mood", ["m4", "m2", "m5"], [
  ["Find your mood IRL", "Every mood on this sheet is at our stall. Come find the one that's literally you."],
  ["Mood board, but on a laptop", "Stick your mood where people can read it. Saves you explaining yourself."],
  ["Hype yourself up", "One sticker on your laptop, and you get a pep talk every time you open it."],
  ["Delulu is the solulu", "Stickers won't do your assignments, but they'll keep you believing you can."],
  ["Everyone has a favourite", "At every stall, someone finds a sticker and shouts, this is so me."],
  ["Be soft with yourself", "These are small reminders that you're doing better than you think."],
  ["Matching stickers?", "Best friend stickers are a thing now. Get matching ones at our stall."],
  ["Say it without saying it", "Bold stickers for people who think it, and stickers for people who say it."],
  ["Vibes that last", "Waterproof vinyl, so your good vibes survive the monsoon."],
  ["Aura farming, IRL", "Come pick your aura at our next stall. Students get the best prices in Goa."],
], [
  {
    title: "Soft Rebellion is here",
    scenes: [
      S("sr-01", undefined, "Meet Soft Rebellion. Bold stickers that talk back.", "zoom", 2),
      S("sr-02", undefined, "Some are pure sass."),
      S("sr-05", "Slay", "Slay. Masterpiece. Find your thing.", "quads", 4.5),
      S("sr-06", undefined, "Some are rebel meets self care."),
      S("sr-11", "You got this", "You got this. Good vibes. Main character energy.", "quads", 4.5),
      S("sr-14", undefined, "And some are just existential giggles."),
      S("sr-15", "Broke but cute", "Broke but cute. Same, honestly.", "quads", 4),
      END("Which one is you? Find the whole set at our stall."),
    ],
  },
  {
    title: "Stickers for your Monday",
    scenes: [
      TL(["Monday", "*mood*", "check"], "Monday mood check. Pick your fighter."),
      S("sr-08", "Always tired", "Always tired. Crying in a cool way. Trust the process.", "quads", 4.5),
      S("sr-07", "Stress less", "Stress less, smile more. Nap queen. Everything happens for a reason.", "quads", 4.8),
      F(["crowd2", "picker"], "Real ones pick fast", "At the stall, people find their Monday sticker in about four seconds."),
      S("sr-12", "Take it easy", "Take it easy. The best is yet to come."),
      END("Tag the friend who needs one of these today."),
    ],
  },
  {
    title: "Main character energy",
    scenes: [
      S("sr-10", undefined, "Motivation and main character energy. A whole mood on one sheet.", "zoom", 2.2),
      S("sr-11", "Main character", "You got this. You are awesome. Good vibes only.", "quads", 4.8),
      S("sr-12", "Shine like the stars", "Shine like the stars. Manifest it. Take it easy.", "quads", 4.8),
      S("sr-13", "Keep dreaming", "Anything is possible. You are so much stronger than you think.", "quads", 4.8),
      T(["Stick it", "where you", "*see it*"], "Stick one where you'll see it every morning. Laptop, mirror, bottle."),
      END("Save this for the day you need it."),
    ],
  },
  {
    title: "Delulu but make it cute",
    scenes: [
      T(["Me?", "*Delulu?*"], "Me? Delulu? Of course."),
      S("sr-09", "Delulu but of course", "Delulu but of course. Chase your dreams. Cries. Be kind to yourself.", "quads", 5),
      F(["hands", "sheets2"], "Peel. Stick. Believe.", "It's waterproof vinyl, so your delusions survive the rain."),
      D([16, 2, 1], "Dreamers' corner", "Pair it with something dreamy from our lo-fi set."),
      END("Comment delulu if this is you."),
    ],
  },
  {
    title: "Rate these 1 to 10",
    scenes: [
      TL(["Rate", "these", "*1 to 10*"], "Rate these from one to ten. Be honest."),
      S("sr-04", "Certified pagal", "Certified pagal. Shik shak shok. Pathological people pleaser.", "quads", 5),
      S("sr-05", "Designer", "Slay. Designer. Masterpiece.", "quads", 4.5),
      S("sr-15", "You're so golden", "You're so golden. Can I pet that dawg.", "quads", 4.5),
      F(["crowd4", "crowd7"], "Everyone has a favourite", "Everyone at the stall has a favourite. Nobody agrees."),
      END("Drop your ratings in the comments."),
    ],
  },
  {
    title: "Self-care, sticker edition",
    scenes: [
      S("sr-06", undefined, "Rebel meets self care. Our softest set.", "zoom", 2),
      S("sr-08", "You deserve to be happy", "You deserve to be happy. Trust the process.", "quads", 4.8),
      S("sr-07", "You're doing amazing", "You're doing amazing, sweetie. Seriously.", "quads", 4.5),
      L("Self-care, but stick it", ["Bottle: drink water", "Mirror: be kind", "Laptop: take breaks", "Diary: you got this"], "Bottle sticker reminds you to drink water. Mirror sticker says be kind. Laptop sticker says take a break. Diary sticker says you got this."),
      END("Little reminders. Big vibe."),
    ],
  },
  {
    title: "Which sticker is your bestie",
    scenes: [
      TL(["Which one", "is your", "*bestie?*"], "Which one of these is your best friend?"),
      S("sr-15", "Broke but cute", "Broke but cute. The one who always says one more chai.", "quads", 4.8),
      S("sr-04", "Certified pagal", "Certified pagal. The one with no filter.", "quads", 4.2),
      S("sr-09", "Chase your dreams", "Chase your dreams. The one with a five year plan.", "quads", 4.5),
      F(["crowd3", "crowd8"], "Buy them one", "Best friends buy each other stickers. That's the rule."),
      END("Tag them. You know who."),
    ],
  },
  {
    title: "Sass that sticks",
    scenes: [
      S("sr-02", undefined, "Rebellion and sass. Stickers with opinions.", "zoom", 2),
      S("sr-05", "Find your thing", "Slay. Find your thing. Masterpiece. Designer.", "quads", 4.8),
      S("sr-04", "She's a 10", "She's a ten, but so is her anxiety.", "quads", 4),
      V("Your laptop", ["Plain", "Silent. Boring. Lonely."], ["Stickered", "Says what you won't."], "A plain laptop says nothing. A stickered laptop says exactly what you won't."),
      END("Let your stuff talk back."),
    ],
  },
  {
    title: "Good vibes only",
    scenes: [
      S("sr-11", "Good vibes", "Good vibes only. That's the whole brief.", "zoom", 2.4),
      S("sr-12", "The best is yet to come", "Shine like the stars. The best is yet to come.", "quads", 4.5),
      S("sr-13", "You are strong", "You are strong. Keep dreaming.", "quads", 4.2),
      F(["crowd5", "crowd6", "crowd1"], "Good vibes, live", "And this is what good vibes look like at our stall."),
      D(undefined, undefined, undefined, "flash", 2),
      END("Share this with someone who needs it."),
    ],
  },
  {
    title: "Drop a heart for +1000 aura",
    scenes: [
      TL(["+1000", "*aura*"], "Plus one thousand aura, loading."),
      S("sr-01", undefined, "Soft Rebellion. Bold stickers that talk back.", "zoom", 2),
      S("sr-13", undefined, "Anything is possible. Keep dreaming.", "quads", 4),
      S("sr-09", undefined, "Chase your dreams. Be kind to yourself.", "quads", 4),
      S("sr-18", undefined, "Drop a heart for plus one thousand aura.", "zoom", 2.6),
      END("Find the full set at our next stall."),
    ],
  },
]);

// ---------------------------------------------------------------- 2. Journal Jotz

const journal = series("Journal Jotz", ["m3", "m5", "m1"], [
  ["Made for journals", "Journal Jotz is made for planners, scrapbooks and diaries. Peel, stick, done."],
  ["Planner, but honest", "Your planner should tell the truth. Sometimes the truth is a rain check."],
  ["Five minutes. That's it.", "You don't need talent for a nice page. You need five minutes and the right stickers."],
  ["Hide something sweet", "Your journal is the safest place for tiny secrets. Envelopes make it fun."],
  ["Small words, big days", "The right word on the right day can change the whole mood of a page."],
  ["Old soul pages", "Vintage pages look like they've lived a life. That's the whole charm."],
  ["Books on books", "Readers love these, because books deserve stickers too."],
  ["Remember everything", "One page per memory. In a year, you'll have a book of your own life."],
  ["Start today", "A journal starts with one page. Pick up the kit at our next stall."],
  ["Journal with us", "Grab the full Journal Jotz set at our stall, or DM us to order."],
], [
  {
    title: "Meet Journal Jotz",
    scenes: [
      S("jj-01", undefined, "Meet Journal Jotz. Our scrapbook and journal collection.", "zoom", 2.2),
      S("jj-05", "Florals", "Pressed florals and little memories.", "pan", 3),
      S("jj-04", "Envelopes", "Tiny envelopes. Wax seals. Old letters.", "pan", 3),
      S("jj-09", "Torn paper", "Torn paper, tape and notes.", "pan", 3),
      S("jj-07", "Little wins", "And little affirmations for the days you need them.", "pan", 3),
      END("Save this for your next journal spread."),
    ],
  },
  {
    title: "Cancelled plans, the sticker set",
    scenes: [
      TL(["Cancelled", "plans", "*club*"], "For everyone who loves cancelled plans."),
      S("jj-02", "Rain check", "Rain check. Postponed. Not today, planner.", "quads", 4.8),
      S("jj-02", "TV won", "Took a nap instead. TV won. Totally forgot.", "pan", 4),
      F(["sheets3", "hands"], "For your planner", "Stick them in your planner and make it official."),
      END("Comment rain check if this is your whole personality."),
    ],
  },
  {
    title: "5-minute journal spread",
    scenes: [
      T(["5 minute", "*journal*", "spread"], "A journal spread in five minutes. Watch."),
      L("You need", ["1 paper scrap", "1 envelope", "1 floral", "1 quote sticker"], "You need one paper scrap, one envelope, one floral and one quote sticker. That's it.", { numbered: true }),
      S("jj-03", "Step 1: base", "Start with a paper scrap as your base.", "pan", 2.8),
      S("jj-06", "Step 2: layer", "Layer an envelope on top, slightly tilted.", "quads", 3.4),
      S("jj-07", "Step 3: words", "Finish with one quote. Done.", "quads", 3.4),
      END("Try it tonight and tag us."),
    ],
  },
  {
    title: "The envelope trick",
    scenes: [
      TL(["The", "*envelope*", "trick"], "The envelope trick every journaler should know."),
      S("jj-04", "Mini envelopes", "Stick a mini envelope on the page, but leave the top open.", "quads", 4.5),
      T(["Hide a", "*note*", "inside"], "Then hide a tiny note inside. A ticket. A photo. A secret."),
      S("jj-06", "Flower envelopes", "Or use the flower ones, so your page looks like a bouquet.", "quads", 4.5),
      END("Your journal, but with secrets."),
    ],
  },
  {
    title: "Affirmation stickers",
    scenes: [
      S("jj-07", undefined, "Thirty five little affirmations on one sheet.", "zoom", 2.2),
      S("jj-07", "Yes you can", "Goals. Yes you can. Be grateful. Positivity is a choice.", "pan", 4.5),
      S("jj-07", "Let it be", "Stay gold. Let it be. Prove them wrong. Trust the process.", "quads", 4.8),
      L("Stick one on", ["Your planner's first page", "Your exam pad", "Your phone back"], "Put one on your planner's first page. One on your exam pad. One on your phone."),
      END("Which one are you picking?"),
    ],
  },
  {
    title: "Vintage scrapbook aesthetic",
    scenes: [
      T(["Vintage", "*scrapbook*"], "How to get that vintage scrapbook look."),
      S("jj-09", "1. Torn edges", "One. Torn edges, never straight cuts.", "pan", 3),
      S("jj-08", "2. Old text", "Two. Old book text behind everything.", "quads", 3.6),
      S("jj-05", "3. Dried florals", "Three. Dried florals on the corners.", "quads", 3.6),
      S("jj-10", "4. Something to remember", "Four. Something that reminds you of a day.", "quads", 3.6),
      END("Save this. Make it this weekend."),
    ],
  },
  {
    title: "For the book lovers",
    scenes: [
      TL(["For the", "*book*", "lovers"], "This one's for the book lovers."),
      S("jj-08", "Book lover", "Book lover. A person devoted to reading.", "quads", 4.2),
      S("jj-10", "Memories", "Stacks of books, memories, butterflies.", "quads", 4.2),
      D([5, 15, 16], "Reading buddies", "Pair them with our sleepy book cats from the lo-fi set."),
      F(["sheets2", "picker2"], "On your Kindle too", "They look great on a Kindle case too."),
      END("Tag your reading buddy."),
    ],
  },
  {
    title: "Memories page",
    scenes: [
      S("jj-10", "Memories", "Memories. Make me smile.", "zoom", 2.2),
      T(["One page", "per", "*memory*"], "One idea. One page per memory."),
      L("Add", ["Date in big letters", "A torn photo", "A florals corner", "One line about the day"], "Add the date in big letters. A torn photo. Florals on a corner. And one line about the day.", { numbered: true }),
      S("jj-05", undefined, "That's a page you'll read again in ten years.", "pan", 3),
      END("Start your memories journal this week."),
    ],
  },
  {
    title: "Journal starter kit",
    scenes: [
      TL(["Journal", "*starter*", "kit"], "Starting a journal? Here's your kit."),
      S("jj-03", "Paper notes", "Paper notes and grid tabs for lists.", "quads", 3.8),
      S("jj-04", "Envelopes", "Envelopes for things to keep.", "quads", 3.2),
      S("jj-09", "Washi scraps", "Torn scraps and labels for headings.", "quads", 3.2),
      S("jj-07", "Quotes", "Quotes for the bad days.", "pan", 3),
      F(["trays3", "sheets"], "All at our stall", "All of it at one stall."),
      END(),
    ],
  },
  {
    title: "Journal with me",
    scenes: [
      T(["Journal", "*with me*"], "Journal with me. Lo-fi, no pressure."),
      S("jj-01", undefined, undefined, "zoom", 1.8),
      S("jj-03", undefined, "Paper first.", "pan", 2.4),
      S("jj-05", undefined, "Then flowers.", "pan", 2.4),
      S("jj-06", undefined, "An envelope with a note.", "pan", 2.4),
      S("jj-02", undefined, "And one honest sticker. Rain check.", "quads", 3.6),
      END("Saving this one for Sunday?"),
    ],
  },
]);

// ---------------------------------------------------------------- 3. Retro Rewind

const retro = series("Retro Rewind", ["m1", "m3", "m4"], [
  ["Retro lives here", "Old school designs on new school vinyl. Waterproof, splash-proof, made to last."],
  ["Old soul? Same.", "If you were born in the wrong decade, our retro sheet is your home."],
  ["Analog heart", "Some things were better slow. Stick a reminder on your stuff."],
  ["Read more. Stick more.", "Bookworms, this one's on your Kindle case. Or your bookshelf. Or both."],
  ["Curated chaos", "A retro laptop looks best with a theme. Pick one and go all in."],
  ["Aged to perfection", "Vintage never goes out of style. It just waits for you to find it."],
  ["Soft and slow", "Butterflies and old paper make even a boring notebook feel special."],
  ["Then and now", "Whatever decade you live in, your stickers can live in another one."],
  ["Write it down", "Letters are coming back. Make yours look like it came from nineteen eighty."],
  ["Rewind with us", "Find the full retro collection at our next stall in Goa."],
], [
  {
    title: "Retro collection, part one",
    scenes: [
      S("rt-01", undefined, "Rewind. Our retro collection, part one.", "zoom", 2.2),
      S("rt-07", "Typewriter", "Typewriters. Butterflies. Old books.", "quads", 4.2),
      S("rt-09", "Cassette", "Film cameras and cassette tapes.", "quads", 4),
      S("rt-10", "Vinyl", "Vinyl records. Vintage nineteen eighty seven.", "quads", 4),
      END("Born in the wrong decade? Follow us."),
    ],
  },
  {
    title: "Born in the wrong decade",
    scenes: [
      TL(["Born in", "the wrong", "*decade?*"], "Were you born in the wrong decade?"),
      L("Signs", ["You own a film camera", "You still burn CDs", "Your playlist is 1987", "You write letters"], "You own a film camera. You still make mixtapes. Your playlist stopped in nineteen eighty seven. You write actual letters."),
      S("rt-09", "This one's yours", "Then this sheet is yours.", "quads", 4),
      END("Comment your decade."),
    ],
  },
  {
    title: "Analog things we miss",
    scenes: [
      T(["Analog", "things", "*we miss*"], "Analog things we miss."),
      S("rt-06", "Gramophone", "Gramophones.", "quads", 3),
      S("rt-07", "Typewriters", "Typewriters.", "quads", 3),
      S("rt-09", "Cassettes", "Cassettes and film cameras.", "quads", 3.2),
      S("rt-10", "Vinyl", "Vinyl that crackles.", "quads", 3),
      D([7, 11], "Lo-fi edition", "And our lo-fi versions, for the new old school."),
      END("What do you miss most?"),
    ],
  },
  {
    title: "Bibliophile corner",
    scenes: [
      S("rt-08", "The world belongs to those who read", "The world belongs to those who read.", "quads", 4.2),
      S("rt-10", "Bibliophile", "Bibliophile. Carpe librum. Seize the book.", "quads", 4.2),
      S("rt-07", "I've lived a thousand lives", "I've lived a thousand lives.", "quads", 3.6),
      S("jj-08", "Book lover", "And from Journal Jotz, book lover.", "quads", 3.6),
      END("Tag the bookworm."),
    ],
  },
  {
    title: "Retro laptop starter pack",
    scenes: [
      TL(["Retro", "laptop", "*starter pack*"], "Retro laptop starter pack."),
      L("Pick", ["1 vinyl", "1 camera", "1 butterfly", "1 typewriter", "1 lo-fi night scene"], "One vinyl. One camera. One butterfly. One typewriter. And one lo-fi night scene to tie it together.", { numbered: true }),
      S("rt-10", undefined, undefined, "quads", 3),
      D([8, 9], "Night scenes", undefined, "grid", 2.2),
      END("Pick yours at the stall."),
    ],
  },
  {
    title: "Vintage 1987",
    scenes: [
      S("rt-10", "Vintage 1987", "Vintage nineteen eighty seven. Original parts.", "quads", 4),
      T(["Aged to", "*perfection*"], "Some things get better with age."),
      S("rt-05", "Classics", "Old cars. Old bikes. Old labels.", "pan", 3),
      F(["crowd8", "crowd3"], "Retro fans at the stall", "And retro fans always find this sheet first."),
      END("Find it at our next stall."),
    ],
  },
  {
    title: "Butterflies and old paper",
    scenes: [
      S("rt-09", "Butterflies", "Butterflies on old paper. Our softest retro look.", "quads", 4),
      S("rt-07", "Old soul", "She's an old soul with young eyes.", "quads", 3.6),
      S("jj-10", "Paired", "Pairs perfectly with Journal Jotz.", "quads", 3.6),
      F(["hands"], "Into the diary", "Straight into the diary."),
      END(),
    ],
  },
  {
    title: "Keep it old school",
    scenes: [
      S("rt-06", "Keep it real", "Keep it real. Keep it old school.", "quads", 3.6),
      V("Old school vs new", ["Then", "Mixtapes. Letters. Film."], ["Now", "Playlists. Texts. Stories."], "Then: mixtapes, letters and film. Now: playlists, texts and stories. Stickers work for both."),
      S("rt-09", undefined, undefined, "quads", 3),
      END("Old soul? Follow."),
    ],
  },
  {
    title: "Love letters",
    scenes: [
      S("rt-08", "Love letters", "Envelopes, hearts and old love letters.", "quads", 4),
      S("jj-04", "Wax seals", "Wax seals from Journal Jotz.", "quads", 3.4),
      T(["Write", "*someone*", "a letter"], "Idea. Write someone a real letter. Seal it with a sticker."),
      END("Who are you writing to?"),
    ],
  },
  {
    title: "Retro rewind recap",
    scenes: [
      S("rt-01", undefined, "Retro rewind. The whole collection in ten seconds.", "zoom", 2),
      S("rt-05", undefined, undefined, "zoom", 1.4),
      S("rt-06", undefined, undefined, "zoom", 1.4),
      S("rt-07", undefined, undefined, "zoom", 1.4),
      S("rt-08", undefined, undefined, "zoom", 1.4),
      S("rt-09", undefined, undefined, "zoom", 1.4),
      S("rt-10", undefined, "Which slide was your favourite?", "zoom", 2.4),
      END("Part two is coming."),
    ],
  },
]);

// ---------------------------------------------------------------- 4. Stall Diaries

const stall = series("Stall Diaries", ["m3", "m1", "m2", "m4"], [
  ["Every stall, a new story", "No two stall days are the same. That's what we love about it."],
  ["Say hi next time", "Come say anything at our stall. We've probably heard it already."],
  ["One is never enough", "Nobody leaves with one sticker. We've stopped pretending they will."],
  ["Chaos, but make it cute", "Rush hour at a stall is loud, fast and the most fun part of our week."],
  ["Fests are our thing", "If your college has a fest, we want to be there. DM us."],
  ["Fast setup, faster sales", "Setup takes a while. Selling out the first tray takes ten minutes."],
  ["Dig in", "The trays are where the hidden gems live. Take your time."],
  ["Your design, our cut", "Bring any design to our stall and we'll cut it live."],
  ["Imperfect and proud", "Things go wrong at every stall. The vibe never does."],
  ["Goa, you're the best", "Thanks for every stop, every sticker and every hello."],
], [
  {
    title: "A day at the stall",
    scenes: [
      T(["A day at", "*our stall*"], "A day at our stall, start to finish."),
      F(["trays2", "trays"], "Setup", "Morning. Tables, trays and a lot of tape."),
      F(["sheets2", "sheets3"], "Sheets out", "Sheets out. Posters up."),
      F(["crowd1", "crowd5"], "Doors open", "Then the crowd hits."),
      F(["cricut"], "Live cutting", "Someone wants a custom one. The Cricut starts."),
      F(["crowd6", "crowd2"], "Peak hours", "By afternoon it's all hands."),
      END("See you at the next one."),
    ],
  },
  {
    title: "Things people say at our stall",
    scenes: [
      TL(["Things", "people say", "*at our stall*"], "Things people say at our stall."),
      F(["crowd1"], "\"I'm just looking\"", "I'm just looking.", 2),
      F(["picker"], "*picks 9*", undefined, 1.6),
      F(["crowd4"], "\"Is this waterproof?\"", "Is this waterproof? Yes. Splash-proof vinyl.", 2.4),
      F(["crowd7"], "\"Can you cut my design?\"", "Can you cut my design? Also yes.", 2.2),
      F(["crowd3"], "\"UPI?\"", "UPI? Of course. Cash too.", 2),
      END("What did you say at our stall?"),
    ],
  },
  {
    title: "POV: first sticker",
    scenes: [
      F(["crowd5"], "POV: your first sticker", undefined, 2),
      F(["picker2", "picker"], "Choosing...", "You come in for one sticker."),
      F(["sheets", "sheets4"], "Still choosing...", "You find five you like."),
      F(["hands"], "Okay, ten", "You leave with ten."),
      F(["crowd2"], "No regrets", "No regrets."),
      END(),
    ],
  },
  {
    title: "Rush hour",
    scenes: [
      TL(["*Rush*", "hour"], undefined, 1.2),
      F(["crowd1", "crowd4", "crowd6", "crowd8"], "This is rush hour", "This is rush hour at a college stall."),
      F(["crowd2", "crowd5", "crowd7"], "Every hand on a sheet", "Every hand on a sheet. Everyone asking for a different one."),
      F(["cricut2"], "Meanwhile", "Meanwhile the Cricut never stops."),
      F(["crowd3"], "We love it", "Chaotic. Loud. We love it."),
      END("Come be part of the chaos."),
    ],
  },
  {
    title: "Why college fests",
    scenes: [
      T(["Why we", "pop up at", "*college fests*"], "Why we pop up at college fests."),
      L("Because", ["You're there", "Your laptops need help", "Fests have the best energy", "We're students too"], "Because you're there. Because your laptops need help. Because fests have the best energy. And because we're students too.", { numbered: true }),
      F(["crowd6", "crowd2"], "See you at the next fest", "See you at the next one."),
      END("Want us at your fest? DM us."),
    ],
  },
  {
    title: "Setup in 30 seconds",
    scenes: [
      TL(["Setup", "in *30*", "seconds"], "Setting up a sticker stall, sped up."),
      F(["trays2"], "Table", undefined, 1.4),
      F(["trays"], "Trays", undefined, 1.4),
      F(["trays3"], "Sheets", undefined, 1.4),
      F(["sheets2"], "Posters", undefined, 1.4),
      F(["cricut"], "Cricut", undefined, 1.4),
      F(["crowd1", "crowd4"], "Open!", "And we're open."),
      END("Next stall is on our stories."),
    ],
  },
  {
    title: "The trays",
    scenes: [
      F(["trays", "trays3"], "The trays", "Let's talk about the trays."),
      F(["picker", "picker2"], "Dig in", "Every tray is a different vibe. Dig in."),
      F(["sheets3", "sheets"], "Sheets for the indecisive", "Can't pick one? Grab a whole sheet."),
      D(undefined, "A taste", undefined, "flash", 2),
      END("Come dig through them."),
    ],
  },
  {
    title: "Custom order live",
    scenes: [
      T(["A *custom*", "order", "live"], "A custom order, live at the stall."),
      F(["custom"], "Bring your design", "Someone shows us a design on their phone."),
      F(["cricut", "cricut2"], "Cut on the spot", "We print it and the Cricut cuts it on the spot."),
      F(["trishul"], "Done", "Peel. Hand over. Done."),
      F(["crowd7"], "Happy customer", "Happy customer. Happy us."),
      END("Custom orders open in our DMs too."),
    ],
  },
  {
    title: "Stall bloopers",
    scenes: [
      TL(["Stall", "*bloopers*"], "Stall life, unfiltered."),
      F(["trays2"], "Forgot the tape", "Forgot the tape. Twice."),
      F(["sheets4"], "Wind vs posters", "Wind versus posters. Wind won."),
      F(["crowd8"], "No change for 500", "Five hundred rupee note, no change. UPI saved us."),
      F(["crowd6"], "Still the best day", "Still the best day of the week."),
      END(),
    ],
  },
  {
    title: "Thank you, Goa",
    scenes: [
      T(["Thank you", "*Goa*"], "Thank you, Goa."),
      F(["crowd1", "crowd2", "crowd3", "crowd4"], undefined, "Every stall, every college, every person who stopped by."),
      F(["crowd5", "crowd6", "crowd7", "crowd8"], undefined, "You made a small sticker stall feel like a festival."),
      F(["picker"], "More stalls coming", "More stalls coming."),
      END("Follow so you know where we pop up next."),
    ],
  },
]);

// ---------------------------------------------------------------- 5. How It Works

const how = series("How It Works", ["m2", "m5", "m1"], [
  ["Print. Cut. Peel.", "Every sticker goes through the same three steps, right in front of you."],
  ["Precision, live", "The Cricut is the reason we can do custom shapes on the spot."],
  ["Made for real life", "Bottles, bags, laptops. Our vinyl is built for the stuff you carry every day."],
  ["Walls without damage", "Hostel friendly, landlord friendly, parent friendly."],
  ["A gift that stays", "Framez make the easiest gift. Pick the art, we'll do the rest."],
  ["Your idea, our sticker", "If you can screenshot it, we can probably make it a sticker."],
  ["Still confused?", "Ask us at the stall. We'll show you both cuts in your hand."],
  ["Easy pay", "UPI or cash at every stall. No minimum."],
  ["Anywhere in India", "Not at the stall? Order online and we dispatch in two days."],
  ["You decide what's next", "Every new set starts with what you ask for. Keep asking."],
], [
  {
    title: "From design to sticker",
    scenes: [
      T(["Design", "to *sticker*"], "How a design becomes a sticker."),
      F(["sheets"], "1. Print", "First, we print the design on vinyl.", undefined),
      F(["cricut"], "2. Cut", "Then the Cricut cuts around every shape."),
      F(["cricut2"], "3. Weed", "We pull away the extra vinyl."),
      F(["trishul"], "4. Peel", "And you peel and stick."),
      END("That's the whole magic."),
    ],
  },
  {
    title: "What's the Cricut",
    scenes: [
      TL(["What's", "the *Cricut?*"], "Everyone asks: what's that machine?"),
      F(["cricut"], "A cutting machine", "It's a Cricut. A cutting machine with a tiny blade."),
      F(["cricut2"], "Follows the outline", "It reads the outline and cuts the vinyl, not the backing."),
      F(["trishul", "custom"], "Any shape", "That's why we can cut almost any shape, live."),
      END("Come watch it at our stall."),
    ],
  },
  {
    title: "Why vinyl survives",
    scenes: [
      T(["Why vinyl", "*survives*"], "Why our stickers survive your life."),
      V("Paper vs vinyl", ["Paper", "Tears. Hates water."], ["Vinyl", "Bends. Splash-proof."], "Paper tears and hates water. Vinyl bends with the surface and handles splashes.", "paper"),
      L("Survives", ["Bottle splashes", "Rainy commutes", "Backpack scuffs", "Daily laptop use"], "Bottle splashes. Rainy commutes. Backpack scuffs. Daily laptop use.", { clip: "hands" }),
      END("Built for Goa monsoons."),
    ],
  },
  {
    title: "Peel-to-paste posters",
    scenes: [
      TL(["Posters", "that *peel*"], "Our posters peel and paste."),
      V("Pick your size", ["A4", "Desks and cupboards"], ["A3", "The statement wall"], "A four for desks and cupboards. A three for the wall everyone sees.", "size"),
      F(["sheets3"], "No tape. No pins.", "No tape, no pins, no landlord drama."),
      END("Find them at the stall or in the shop."),
    ],
  },
  {
    title: "What's a Framez",
    scenes: [
      T(["What's", "a *Framez?*"], "What's a Framez?"),
      F(["sheets2", "sheets4"], "Art, ready to hang", "It's your favourite art, framed and ready for your desk or wall."),
      L("Great for", ["Desks", "Hostel rooms", "Gifts", "Birthdays"], "Great for desks, hostel rooms, gifts and birthdays."),
      END("Ask for Framez at our stall."),
    ],
  },
  {
    title: "How to custom order",
    scenes: [
      TL(["How to", "*custom*", "order"], "How to get a custom sticker from us."),
      L("Steps", ["DM us on Instagram", "Send your design or idea", "Pick size and cut", "Pay by UPI", "We dispatch in 2 days"], "DM us on Instagram. Send your design or idea. Pick the size and cut. Pay by UPI. We dispatch in two days.", { numbered: true }),
      F(["custom", "cricut2"], "That's it", "That's it."),
      END("DM us your idea.", "DM @stixnvibes"),
    ],
  },
  {
    title: "Die cut or kiss cut",
    scenes: [
      T(["Which", "*cut?*"], "Die cut or kiss cut? Quick guide."),
      V("Two cuts", ["Die cut", "Shaped all the way through"], ["Kiss cut", "Square backing, easy peel"], "Die cut is shaped all the way through. Kiss cut sits on a square backing and peels easily.", "cut"),
      L("Pick", ["Laptop: die cut", "Gifting: kiss cut", "Bulk: sheets"], "For laptops, go die cut. For gifts, kiss cut. For bulk, get a sheet."),
      END(),
    ],
  },
  {
    title: "Paying at the stall",
    scenes: [
      TL(["Paying", "at the", "*stall*"], "Paying at our stall is easy."),
      F(["crowd3", "crowd8"], "UPI or cash", "UPI or cash. Both work."),
      F(["picker"], "Pick first", "Pick everything first, pay once."),
      F(["hands"], "Stick right away", "Then stick it right there if you want."),
      END("See you at the stall."),
    ],
  },
  {
    title: "Ordering online",
    scenes: [
      T(["Not in", "*Goa?*"], "Not near our stall? No problem."),
      L("Order", ["Browse shop.stixnvibes.com", "Or DM us on Instagram", "Dispatched in 2 days"], "Browse the shop at shop dot stixnvibes dot com. Or DM us on Instagram. We dispatch in two days.", { numbered: true }),
      F(["sheets", "sheets3"], "Packed with care", "Packed flat, so nothing bends."),
      END("Link in bio.", "shop.stixnvibes.com"),
    ],
  },
  {
    title: "Where our designs come from",
    scenes: [
      T(["Where", "designs", "*come from*"], "Where do our sticker sets come from?"),
      L("We look for", ["Things students love", "What sells out", "What you ask for"], "We look for things students love, what sells out at stalls, and what you ask for in our DMs."),
      D([3, 12, 17], "Lo-fi set", "Like this lo-fi set."),
      S("jj-01", undefined, "Or Journal Jotz.", "zoom", 2),
      END("Tell us what to make next."),
    ],
  },
]);

// ---------------------------------------------------------------- 6. Sticker Hacks

const hacks = series("Sticker Hacks", ["m5", "m2", "m4"], [
  ["Practice on a notebook", "Practise on a notebook first. Then go for the laptop."],
  ["Curated, not cluttered", "A few good stickers beat fifty random ones. Plan before you peel."],
  ["Hydrate in style", "A stickered bottle is a bottle you'll actually remember to carry."],
  ["Mistakes are fixable", "Almost any sticker can move once. Be gentle and quick."],
  ["Clean slate", "Removing old stickers is just making space for new ones."],
  ["Swap every season", "Change the stickers in your case whenever the mood changes."],
  ["Ride safe, ride loud", "Stickers on helmets look great. Just never block your view."],
  ["Thirty second glow up", "The fastest makeover in the world is one sticker on a cover."],
  ["Wrap it cute", "Stickers turn plain paper into a gift people don't want to open."],
  ["Morning reminders", "Stick it where you'll see it first thing. It actually helps."],
], [
  {
    title: "No bubbles, ever",
    scenes: [
      TL(["No", "*bubbles*", "ever"], "How to stick a sticker with zero bubbles."),
      L("Steps", ["Clean and dry", "Peel one edge", "Centre outwards", "Smooth with a card"], "Clean and dry the surface. Peel one edge. Press from the centre outwards. Smooth with a card.", { numbered: true, clip: "hands" }),
      F(["picker2"], "Perfect", "Perfect, every time."),
      END("Save this."),
    ],
  },
  {
    title: "Laptop layout rules",
    scenes: [
      T(["Laptop", "layout", "*rules*"], "Three rules for a laptop that looks curated, not chaotic."),
      L("Rules", ["Start with one big hero", "Then medium around it", "Fill gaps with tiny ones"], "Start with one big hero sticker. Add medium ones around it. Fill the gaps with tiny ones.", { numbered: true }),
      D([14, 6, 10], "Hero, medium, tiny", "Like this."),
      END("Show us your laptop."),
    ],
  },
  {
    title: "Stick a bottle",
    scenes: [
      TL(["Bottle", "*sticker*", "tips"], "Water bottle sticker tips."),
      L("Do", ["Stick on a dry bottle", "Avoid the curve's seam", "Hand wash only", "Let it set 24 hours"], "Stick it on a dry bottle. Avoid the seam. Hand wash only. And let it set for a day before washing.", { numbered: true }),
      F(["sheets4", "hands"], "Splash-proof vinyl", "Our vinyl handles splashes."),
      END(),
    ],
  },
  {
    title: "Move a sticker",
    scenes: [
      T(["Stuck it", "*wrong?*"], "Stuck it in the wrong spot? Don't panic."),
      L("Fix it", ["Peel slowly, low angle", "Warm it with a hairdryer", "Stick it right away"], "Peel it slowly at a low angle. Warm it with a hair dryer if it's stubborn. Stick it again right away.", { numbered: true }),
      T(["Tip:", "*plan first*"], "Pro tip. Lay them out before you peel."),
      END("Save for later."),
    ],
  },
  {
    title: "Remove without residue",
    scenes: [
      TL(["Zero", "*residue*"], "How to remove a sticker without leaving gunk."),
      L("Steps", ["Warm it up", "Peel at a low angle", "Wipe leftover with a little oil", "Clean with a damp cloth"], "Warm it up. Peel at a low angle. Wipe any leftover with a little oil. Finish with a damp cloth.", { numbered: true }),
      F(["sheets"], "Ready for the next one", "Now you've got space for new ones."),
      END(),
    ],
  },
  {
    title: "Phone case swap",
    scenes: [
      T(["Phone", "case", "*glow up*"], "Clear phone case? Free glow up."),
      L("How", ["Pick 2 or 3 stickers", "Stick them inside the case", "Swap whenever"], "Pick two or three stickers. Stick them inside the clear case. Swap whenever you want.", { numbered: true }),
      D([6, 16, 10], "Try these", "These three are perfect."),
      END("Try it tonight."),
    ],
  },
  {
    title: "Helmet stickers",
    scenes: [
      TL(["Helmet", "*stickers*"], "Goa rides, but make it yours. Helmet stickers."),
      L("Rules", ["Back or sides only", "Never on the visor", "Clean the shell first"], "Stick on the back or the sides. Never on the visor. Clean the shell first."),
      D([4, 14], "Ride vibes", "Coastal road or skate skeleton?"),
      END("Ride safe."),
    ],
  },
  {
    title: "Notebook covers",
    scenes: [
      T(["Boring", "notebook?", "*fixed*"], "Fix a boring notebook in thirty seconds."),
      F(["hands"], "One big sticker", "One big sticker in the centre."),
      S("jj-07", "Two small words", "Two small words in the corner.", "quads", 3.4),
      F(["picker2"], "Done", "Done. It's yours now."),
      END(),
    ],
  },
  {
    title: "Gift wrap with stickers",
    scenes: [
      TL(["Gift", "*wrap*", "hack"], "Gift wrapping hack."),
      L("Use stickers as", ["The seal", "The name tag", "The message"], "Use a sticker as the seal, the name tag, and the message."),
      S("jj-06", "Flower envelopes", "Flower envelopes from Journal Jotz are perfect for this.", "quads", 3.6),
      END("Gifting season is close."),
    ],
  },
  {
    title: "Mirror affirmations",
    scenes: [
      T(["Mirror", "*hack*"], "Mirror hack for better mornings."),
      S("sr-11", "You got this", "Stick one affirmation on the corner of your mirror.", "quads", 4),
      F(["hands"], "See it daily", "You see it every morning. It works more than you think."),
      S("sr-07", "You're doing amazing", "You're doing amazing.", "quads", 3.2),
      END(),
    ],
  },
]);

// ---------------------------------------------------------------- 7. Vibe Check

const vibe = series("Vibe Check", ["m4", "m1", "m3"], [
  ["No wrong answers", "Every vibe has a sticker at our stall. Even the chaotic ones."],
  ["Hard choices", "Can't choose? That's why we sell sheets."],
  ["Study vibe check", "Whatever your study style, your laptop deserves a mascot."],
  ["Know them all?", "If you got all three, you've definitely been to our stall."],
  ["Your stuff, your story", "Your stickers say more about you than your bio does."],
  ["Setup inspo", "Screenshot your favourite and build your desk around it."],
  ["Goa sunsets hit different", "We put Goa sunsets on stickers so you can carry them around."],
  ["Mood changes daily", "Good thing stickers are cheap enough to own every mood."],
  ["Your pack, your way", "Tell us your three numbers at the stall and we'll pack them for you."],
  ["Collector or minimalist", "Either way, there's a sticker for you at our next stall."],
], [
  {
    title: "Pick a sticker, get a vibe",
    scenes: [
      TL(["Pick one", "*get a vibe*"], "Pick a sticker. We'll tell you your vibe."),
      N([5, 4, 16, 14], "Pick a number", undefined, 4.5),
      T(["1: *cosy*", "2: *wanderer*"], "One, you're cosy. Two, you're a wanderer."),
      T(["3: *dreamer*", "4: *chaos*"], "Three, dreamer. Four, pure chaos."),
      END("Comment your number."),
    ],
  },
  {
    title: "This or that: lo-fi",
    scenes: [
      T(["This", "or *that?*"], "This or that. Go fast."),
      D([5, 15], "Sleepy cat or sleepy cat?", "Sleepy cat or sleepy cat?", "grid", 2.6),
      D([8, 9], "Moon or city?", "Moon rooftop or night shop?", "grid", 2.6),
      D([10, 11], "Pup or penguin?", "Golden pup or penguin coder?", "grid", 2.6),
      END("Comment your picks."),
    ],
  },
  {
    title: "Your study vibe",
    scenes: [
      TL(["Your", "*study*", "vibe"], "What's your study vibe?"),
      N([13, 17, 11], "Pick one", undefined, 4),
      T(["1: *lie down*", "and pray"], "One. Lie down and pray."),
      T(["2: *desk*", "setup era"], "Two. Desk setup era."),
      T(["3: *night owl*"], "Three. Night owl coder."),
      END("Which one's you?"),
    ],
  },
  {
    title: "Guess the set",
    scenes: [
      T(["Guess", "the *set*"], "Guess the set from one zoom."),
      S("rt-09", undefined, undefined, "pan", 2.6),
      T(["*Retro*", "pt 1"], "Retro, part one."),
      S("jj-04", undefined, undefined, "pan", 2.6),
      T(["*Journal*", "Jotz"], "Journal Jotz."),
      S("sr-12", undefined, undefined, "pan", 2.6),
      T(["*Soft*", "Rebellion"], "Soft Rebellion."),
      END("How many did you get?"),
    ],
  },
  {
    title: "Your laptop says",
    scenes: [
      TL(["What your", "laptop", "*says*"], "What your laptop stickers say about you."),
      L("If you have", ["Cats: soft, sleepy", "Space: big dreamer", "Skeletons: chaos", "Quotes: overthinker"], "Cats, you're soft and sleepy. Space, big dreamer. Skeletons, beautiful chaos. Quotes, a professional overthinker."),
      D([5, 16, 14], "Which one?", undefined, "grid", 2.4),
      END("Be honest in the comments."),
    ],
  },
  {
    title: "Rate this setup",
    scenes: [
      T(["Rate", "this *setup*"], "Rate this setup out of ten."),
      D([17], "Cosy desk", "Cosy desk, sleepy dog, city at night.", "grid", 3),
      D([11], "Retro coder", "Or retro computer with a penguin.", "grid", 3),
      D([12], "Balcony", "Or the balcony with all the cats.", "grid", 3),
      END("Drop your scores."),
    ],
  },
  {
    title: "Pick your Goa sunset",
    scenes: [
      TL(["Pick your", "*sunset*"], "Pick your sunset."),
      N([4, 3, 12], "Pick one", undefined, 4),
      T(["Road trip", "or *rooftop?*"], "Road trip, rooftop with a cat, or balcony with ten cats?"),
      F(["crowd2"], "Goa does all three", "Goa, honestly, does all three."),
      END("Comment your number."),
    ],
  },
  {
    title: "Which mood sticker today",
    scenes: [
      T(["Today's", "*mood*"], "Pick today's mood."),
      S("sr-08", undefined, undefined, "quads", 4),
      T(["Always", "*tired?*"], "Always tired?"),
      S("sr-11", undefined, undefined, "quads", 4),
      T(["Or *main*", "character?"], "Or main character?"),
      END("Tell us below."),
    ],
  },
  {
    title: "Build your sticker pack",
    scenes: [
      TL(["Build", "your", "*pack*"], "Build your sticker pack. Pick one from each."),
      N([1, 2, 4], "Pick a place", undefined, 3.2),
      N([5, 10, 15], "Pick a pet", undefined, 3.2),
      N([14, 16, 13], "Pick a you", undefined, 3.2),
      END("Comment your three numbers."),
    ],
  },
  {
    title: "Sticker personality test",
    scenes: [
      T(["Sticker", "*personality*", "test"], "Sticker personality test. Ten seconds."),
      V("Where do you stick?", ["Laptop", "Show the world"], ["Diary", "Keep it private"], "Laptop means you want the world to see. Diary means it's just for you."),
      V("How many?", ["One", "Minimalist"], ["Fifty", "Collector"], "One sticker? Minimalist. Fifty? Collector."),
      END("Which are you?"),
    ],
  },
]);

// ---------------------------------------------------------------- 8. Student Life

const student = series("Student Life", ["m2", "m3", "m5"], [
  ["You will survive", "Exams end. Stickers stay. Hang in there."],
  ["Make it home", "A hostel room feels like home with the right stuff on the walls."],
  ["Proxy not included", "We can't mark your attendance, but we can cheer you up."],
  ["Spot your laptop", "Never pick up the wrong laptop again."],
  ["Every group has these", "Group projects are chaos. At least your laptop can look calm."],
  ["Fest ready", "Your fest outfit is not complete without a stickered tote."],
  ["Student prices, always", "We're students too, so we price for pocket money."],
  ["The canteen knows", "Word travels fast in a canteen. That's how most people find us."],
  ["Fresh start", "New semester, new notebooks, new stickers."],
  ["You got this", "Little breaks help. So do little stickers."],
], [
  {
    title: "Exam week starter pack",
    scenes: [
      TL(["Exam week", "*starter*", "pack"], "Exam week starter pack."),
      L("You need", ["Chai", "One all-nighter", "Zero sleep", "A sticker that says you got this"], "Chai. One all-nighter. Zero sleep. And a sticker that says you got this."),
      S("sr-11", "You got this", undefined, "quads", 3.6),
      END("Good luck. Seriously."),
    ],
  },
  {
    title: "Hostel room makeover",
    scenes: [
      T(["Hostel", "room", "*glow up*"], "Hostel room glow up, zero damage."),
      F(["sheets3"], "Peel-to-paste posters", "Peel and paste posters. No nails, no fine."),
      D([17, 12], "Cosy vibes", "Add cosy stickers to your cupboard and mirror."),
      F(["sheets2"], "Framez on the desk", "And a Framez on the desk."),
      END("Show us your room."),
    ],
  },
  {
    title: "Attendance mood",
    scenes: [
      TL(["75%", "*attendance*"], "Seventy five percent attendance energy."),
      S("sr-08", "Always tired", "Always tired.", "quads", 3.2),
      S("jj-02", "Too sick to move", "Too sick to move. Rescheduled. Oops.", "quads", 4),
      S("sr-09", "Cries", "Cries.", "quads", 3),
      END("Tag your proxy partner."),
    ],
  },
  {
    title: "Laptop stickers in class",
    scenes: [
      T(["Your laptop", "in *class*"], "Your laptop in class, without stickers versus with."),
      V("Laptop in class", ["Without", "One of fifty silver laptops."], ["With", "Everyone knows it's yours."], "Without stickers, it's one of fifty silver laptops. With stickers, everyone knows it's yours."),
      D([13, 14, 11], "Make it yours", "Make it yours."),
      END(),
    ],
  },
  {
    title: "Group project roles",
    scenes: [
      TL(["Group", "*project*", "roles"], "Group project roles, as stickers."),
      D([11], "The one who does it all", "The one who does everything.", "grid", 2.6),
      D([5], "The sleeper", "The one who sleeps through it.", "grid", 2.6),
      D([14], "The chaos", "The one who adds chaos.", "grid", 2.6),
      D([16], "The dreamer", "The one with big ideas, no slides.", "grid", 2.6),
      END("Tag your group."),
    ],
  },
  {
    title: "Fest day fit check",
    scenes: [
      T(["Fest day", "*fit check*"], "Fest day fit check."),
      L("Fit", ["Outfit: done", "Tote: stickered", "Bottle: stickered", "Phone: stickered"], "Outfit, done. Tote, stickered. Bottle, stickered. Phone, stickered."),
      F(["crowd5", "crowd2"], "Then you find our stall", "Then you find our stall and buy more."),
      END("See you at the next fest."),
    ],
  },
  {
    title: "Pocket money math",
    scenes: [
      TL(["Pocket", "money", "*math*"], "Pocket money math."),
      L("Monthly", ["Food", "Travel", "Recharge", "Stickers (non-negotiable)"], "Food. Travel. Phone recharge. And stickers. Non-negotiable."),
      T(["Student", "*prices*"], "Good thing our prices are made for students."),
      F(["picker"], "Student prices", "Niche stickers, student prices."),
      END(),
    ],
  },
  {
    title: "Canteen conversations",
    scenes: [
      T(["Canteen", "*talk*"], "Canteen conversations."),
      F(["crowd3"], "\"Where'd you get that?\"", "Where did you get that sticker?"),
      F(["crowd4"], "\"Stix N Vibes stall\"", "Stix N Vibes stall."),
      F(["crowd6"], "\"When's the next one?\"", "When's the next one?"),
      END("Check our stories.", "Next stall on our stories"),
    ],
  },
  {
    title: "Back to college kit",
    scenes: [
      TL(["Back to", "*college*", "kit"], "Back to college kit."),
      L("Pack", ["Notebook with a cover sticker", "Bottle with a vibe", "Laptop with a story", "Planner with jotz"], "A notebook with a cover sticker. A bottle with a vibe. A laptop with a story. A planner full of jotz."),
      F(["sheets", "trays3"], "All in one stall", "All in one stall."),
      END(),
    ],
  },
  {
    title: "Study break",
    scenes: [
      T(["Study", "*break*"], "Take a study break with us. Ten seconds."),
      D([1], undefined, "Breathe in.", "grid", 2.4),
      D([2], undefined, "Breathe out.", "grid", 2.4),
      D([16], undefined, "Okay. Back to it. You got this.", "grid", 2.8),
      END("Save this for exam week."),
    ],
  },
]);

// ---------------------------------------------------------------- 9. Behind the Brand

const brand = series("Behind the Brand", ["m3", "m1", "m4"], [
  ["Nice to meet you", "Thanks for being here. We read every comment and every DM."],
  ["Simple idea", "Small stickers, big personality. That's the whole idea."],
  ["Different on purpose", "We pick niche designs on purpose, so your stuff doesn't look like everyone else's."],
  ["Where it started", "It started with one table. It keeps going because of you."],
  ["Best crowd ever", "If you were at WordsUp, thank you. You made our year."],
  ["Packed with care", "Every order is packed by hand and dispatched in two days."],
  ["Students building", "We're learning by doing. Every stall teaches us something."],
  ["You shape us", "Every new set starts with something you asked for."],
  ["Keep asking", "Your questions shape what we do next. Keep them coming."],
  ["This is just the start", "More stalls, more sets, more vibes. Stay close."],
], [
  {
    title: "Who we are",
    scenes: [
      T(["Who", "*we are*"], "Hi. We're Stix N Vibes."),
      F(["crowd2", "crowd6"], "Two Goan students", "Two students from Goa who started selling stickers at college stalls."),
      F(["trays", "sheets2"], "Stickers. Posters. Framez.", "Stickers, peel and paste posters, and Framez."),
      F(["cricut"], "Cut live", "And we cut them live."),
      END("Say hi in the comments."),
    ],
  },
  {
    title: "Why stickers",
    scenes: [
      TL(["Why", "*stickers?*"], "Why stickers?"),
      L("Because", ["They're small but say a lot", "Everyone can afford one", "They make stuff yours"], "Because they're small but say a lot. Because everyone can afford one. Because they make your stuff yours."),
      F(["picker", "hands"], "That's it", "That's it. That's the business plan."),
      END(),
    ],
  },
  {
    title: "Our edge",
    scenes: [
      T(["What", "makes us", "*different*"], "What makes us different."),
      L("Us", ["Niche designs", "Student prices", "Live cutting", "Waterproof vinyl"], "Niche designs you won't find elsewhere in Goa. Prices made for students. Live cutting at the stall. And waterproof vinyl.", { numbered: true }),
      F(["crowd1", "crowd7"], "Come see", "Come see for yourself."),
      END(),
    ],
  },
  {
    title: "Our first stall",
    scenes: [
      TL(["Our", "*first*", "stall"], "Our first stall."),
      F(["trays2"], "One table", "One table. A few trays."),
      F(["crowd1"], "Nervous", "Very nervous."),
      F(["crowd5"], "Then people came", "Then people came. And kept coming."),
      F(["crowd6"], "Now", "Now we do it every chance we get."),
      END("Thank you for showing up."),
    ],
  },
  {
    title: "Favourite event",
    scenes: [
      T(["Our", "*favourite*", "event"], "Our favourite event so far."),
      F(["crowd4", "crowd8"], "WordsUp at Xavier's", "WordsUp at Xavier's. The crowd, the energy, all of it."),
      F(["crowd2", "picker"], "Best day", "Best stall day we've had."),
      END("Where should we pop up next?"),
    ],
  },
  {
    title: "Packing an order",
    scenes: [
      TL(["Packing", "an *order*"], "Packing an online order."),
      F(["sheets"], "Pick", "Pick every sticker by hand."),
      F(["sheets4"], "Check", "Check every cut."),
      F(["hands"], "Pack flat", "Pack it flat so nothing bends."),
      T(["Out in", "*2 days*"], "Dispatched in two days."),
      END(undefined, "shop.stixnvibes.com"),
    ],
  },
  {
    title: "Student-led startup",
    scenes: [
      T(["Student", "*led*", "startup"], "We're a student led startup."),
      L("Means", ["We get what students like", "We price for students", "We show up where you are"], "That means we know what students like. We price for students. And we show up where you are."),
      F(["crowd3", "crowd6"], "Built by students", "Built by students, for students."),
      END(),
    ],
  },
  {
    title: "What we're working on",
    scenes: [
      TL(["Coming", "*soon*"], "What we're working on."),
      S("rt-01", "Retro pt 2?", "More retro.", "zoom", 2.2),
      S("jj-01", "More Jotz", "More Journal Jotz.", "zoom", 2.2),
      F(["custom"], "More custom", "More custom shapes."),
      END("What should we make next?"),
    ],
  },
  {
    title: "Ask us anything",
    scenes: [
      T(["Ask us", "*anything*"], "You asked. We answer."),
      F(["sheets"], "Are they waterproof?", "Are they waterproof? Splash-proof vinyl, yes."),
      F(["custom"], "Do you do custom?", "Do you do custom? Yes, DM us."),
      F(["sheets3"], "Do you ship?", "Do you ship? Yes, in two days."),
      F(["crowd1"], "Next stall?", "Next stall? Check our stories."),
      END("Drop more questions."),
    ],
  },
  {
    title: "Thank you",
    scenes: [
      TL(["*Thank*", "you"], "Thank you."),
      F(["crowd1", "crowd2", "crowd3"], undefined, "For every sticker on every laptop."),
      F(["crowd5", "crowd7", "crowd8"], undefined, "For every stall you visited."),
      D(undefined, undefined, undefined, "rain", 2.4),
      END("Lots more coming."),
    ],
  },
]);

// ---------------------------------------------------------------- 10. Lo-fi Nights

const lofi = series("Lo-fi Nights", ["m5", "m3"], [
  ["Slow nights, soft stickers", "Our lo-fi set is made for people who live at night."],
  ["Golden hour, forever", "Stick a sunset on your laptop and it's golden hour all day."],
  ["Cat people unite", "If you have a cat, or want one, this set is for you."],
  ["Escape, sticker sized", "Tiny worlds for when you need a break from this one."],
  ["Owls stay up", "For coders, readers and overthinkers who never sleep on time."],
  ["Three is the magic number", "Three lo-fi stickers is all you need for a calm laptop."],
  ["Monsoon proof", "Rainy days don't stand a chance against waterproof vinyl."],
  ["Chaos and calm", "Every set needs one chaotic one. That's our skeleton."],
  ["Keep the moment", "Some stickers are memories you can carry."],
  ["Lo-fi, live", "See the whole lo-fi set in person at our next stall."],
], [
  {
    title: "Lo-fi set, slow",
    scenes: [
      T(["Lo-fi", "*nights*"], "Lo-fi nights. Slow down for a second."),
      D([17], undefined, "A desk. A lamp. A sleepy dog.", "grid", 3),
      D([8], undefined, "A rooftop. The moon. A cat.", "grid", 3),
      D([9], undefined, "A night shop that never closes.", "grid", 3),
      END("Save for your late nights."),
    ],
  },
  {
    title: "Sunset drive",
    scenes: [
      D([4], "Sunset drive", "Sunset drive along the coast.", "grid", 3),
      D([3], undefined, "Headphones on. Cat beside you.", "grid", 3),
      D([12], undefined, "And a balcony waiting at home.", "grid", 3),
      D([4, 3, 12], undefined, undefined, "rain", 2.2),
      END(),
    ],
  },
  {
    title: "Cosy cats",
    scenes: [
      TL(["*Cosy*", "cats"], "The cosy cat collection."),
      D([5], undefined, "Asleep on books.", "grid", 2.6),
      D([6], undefined, "Inside a matcha.", "grid", 2.6),
      D([15], undefined, "On a stack, next to a mug.", "grid", 2.6),
      D([12], undefined, "And a whole balcony of them.", "grid", 2.8),
      END("Cat person? Follow."),
    ],
  },
  {
    title: "Dreamy worlds",
    scenes: [
      T(["Dreamy", "*worlds*"], "Little worlds to stick on your stuff."),
      D([1], undefined, "A cabin by the lake.", "grid", 2.8),
      D([2], undefined, "A floating island.", "grid", 2.8),
      D([16], undefined, "An astronaut reading on the moon.", "grid", 2.8),
      END("Which world would you live in?"),
    ],
  },
  {
    title: "Night owl club",
    scenes: [
      TL(["Night", "*owl*", "club"], "Night owl club, this one's for you."),
      D([11], undefined, "Coding at two am.", "grid", 2.6),
      D([13], undefined, "Lying down with a laptop.", "grid", 2.6),
      D([8], undefined, "Staring at the moon.", "grid", 2.6),
      END("Go to sleep. After this."),
    ],
  },
  {
    title: "Lo-fi on your laptop",
    scenes: [
      T(["Lo-fi", "*laptop*"], "A lo-fi laptop setup, three stickers."),
      D([17, 8, 6], "Pick three", "One big scene, one night sky, one small cute thing."),
      F(["hands"], "Stick", "Stick the big one first."),
      END("Find the lo-fi set at our stall."),
    ],
  },
  {
    title: "Rain sounds",
    scenes: [
      T(["*Rainy*", "Goa night"], "Rainy Goa night energy."),
      D([9], undefined, "Neon reflections.", "grid", 2.6),
      D([12], undefined, "Balcony, string lights.", "grid", 2.6),
      D([15], undefined, "Chai, a book, a cat.", "grid", 2.6),
      T(["Splash", "*proof*"], "And yes, they're splash-proof."),
      END(),
    ],
  },
  {
    title: "Skate night",
    scenes: [
      D([14], "Skate night", "Skeleton on a skateboard. Our chaotic one.", "grid", 3),
      D([4], undefined, "Coastal road.", "grid", 2.4),
      D([10], undefined, "Good boy waiting at home.", "grid", 2.4),
      END("Chaos or calm?"),
    ],
  },
  {
    title: "Instant memories",
    scenes: [
      D([7], "Instant memories", "An instant camera, wrapped in plants.", "grid", 3),
      S("rt-09", undefined, "Like the retro film camera.", "quads", 3.4),
      S("jj-10", undefined, "Like memories, kept.", "quads", 3.4),
      END("What's your favourite memory?"),
    ],
  },
  {
    title: "Lo-fi full set",
    scenes: [
      T(["The full", "*lo-fi*", "set"], "The full lo-fi set, all seventeen."),
      D(undefined, undefined, undefined, "flash", 3),
      D(undefined, "All 17", "Cabins, cats, moons and night shops.", "grid", 3.4),
      END("Find them at our next stall."),
    ],
  },
]);

export const SERIES_REELS: Reel[] = [...mood, ...journal, ...retro, ...stall, ...how, ...hacks, ...vibe, ...student, ...brand, ...lofi];
