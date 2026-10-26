// Single source for site copy and facts. Anything marked `confirm` came from
// the previous site and still needs a final check before launch.

export const site = {
  name: "Stix N Vibes",
  // Netlify serves the site on www; the bare domain redirects here.
  url: "https://www.stixnvibes.com",
  tagline: "Your stickers. Your vibe.",
  campaign: "Make it stick. Literally.",
  description:
    "Stix N Vibes is a student-led sticker and print brand from Goa. Waterproof stickers, custom stickers, peel-to-paste posters and Framez, dispatched the next day.",
  origin: "From Goa, for everywhere.",
  // confirm: carried over from the previous site
  shop: "https://shop.stixnvibes.com",
  // Behold JSON feed of the Instagram account (feeds.behold.so/<id>). Empty
  // hides the "Latest on Instagram" strip.
  instagramFeed: "https://feeds.behold.so/KvgXwivRlCDgbWJhgv9T",
  contact: {
    email: "stixnvibes@gmail.com",
    instagram: "https://instagram.com/stixnvibes",
    instagramHandle: "@stixnvibes",
    instagramDm: "https://ig.me/m/stixnvibes",
  },
} as const;

export const nav: readonly { href: string; label: string; external?: boolean }[] = [
  { href: "/#products", label: "Products" },
  { href: "/custom/", label: "Custom" },
  { href: "/brands/", label: "For Brands" },
  { href: "/book/", label: "Book a stall" },
  { href: "/about/", label: "About" },
  { href: site.shop, label: "Shop", external: true },
];

export type ProductStatus = "available" | "coming-soon";

export type Product = {
  id: string;
  name: string;
  line: string;
  status: ProductStatus;
  // Real sticker art for live products. Coming-soon items use a drawn outline,
  // never invented product art.
  stickers?: string[];
  shape: "pack" | "large" | "poster" | "frame" | "cards" | "music";
};

export const products: Product[] = [
  {
    id: "packs",
    name: "Sticker packs",
    line: "Curated sets built around one mood. Pick a pack. Set your vibe.",
    status: "available",
    stickers: ["lofi-09", "lofi-12", "lofi-07"],
    shape: "pack",
  },
  {
    id: "custom",
    name: "Custom stickers",
    line: "Your artwork, your logo or your inside joke, cut into a sticker.",
    status: "available",
    stickers: ["lofi-02", "lofi-04"],
    shape: "large",
  },
  {
    id: "posters",
    name: "Peel-to-paste posters",
    line: "A4 and A3 posters that peel and paste onto your wall. No frame, no nails.",
    status: "available",
    shape: "poster",
  },
  {
    id: "framez",
    name: "Framez",
    line: "Wall decor for a wall that feels like you.",
    status: "available",
    shape: "frame",
  },
  {
    id: "cards",
    name: "Cards",
    line: "Art cards to collect, gift or pin above your desk.",
    status: "available",
    shape: "cards",
  },
  {
    id: "music",
    name: "Music cards",
    line: "A card for the song that means something.",
    status: "available",
    shape: "music",
  },
];

export const customServices = [
  {
    title: "Stickers from your artwork",
    body: "Send a drawing, a design file or a photo. We turn it into die-cut stickers.",
  },
  {
    title: "Custom sticker packs",
    body: "A set built around a theme, a friend group, a club or an event.",
  },
  {
    title: "Logo and brand stickers",
    body: "Stickers for packaging, merch tables, laptops and giveaways.",
  },
  {
    title: "Event and pop-up stickers",
    body: "Limited runs for fests, college events, launches and gigs.",
  },
] as const;

export const process = [
  {
    title: "Send your idea",
    body: "Tell us what you want. Add artwork if you have it, or describe the vibe.",
  },
  {
    title: "We shape it",
    body: "We prepare the design for print and send it back for your approval.",
  },
  {
    title: "We print it",
    body: "Once you approve the design, we print and cut it.",
  },
  {
    title: "You stick it",
    body: "Collect it or get it delivered. Then put it somewhere that matters.",
  },
] as const;

export const brandUseCases = [
  { title: "Packaging", body: "Seal boxes, label bags and add a thank-you sticker to every order." },
  { title: "Events and fests", body: "Give people something they keep after the event ends." },
  { title: "Cafés and shops", body: "Put your logo on cups, counters and takeaway bags." },
  { title: "Creators and bands", body: "Merch that fans can afford and actually use." },
  { title: "Colleges and clubs", body: "Stickers for societies, teams, fests and freshers." },
  { title: "Launches and campaigns", body: "A small physical object that carries your message." },
] as const;

// Bulk prices for custom stickers (waterproof vinyl, any cut shape, up to
// about 5 cm). Draft numbers from the growth plan: Atreya sets the final ones.
export const bulkTiers = [
  { qty: "100–299", min: 100, each: 12 },
  { qty: "300–699", min: 300, each: 9 },
  { qty: "700–1,499", min: 700, each: 8 },
  { qty: "1,500+", min: 1500, each: 7 },
] as const;

export const bulkTerms = [
  "Bigger than 5 cm: +₹3 a sticker. Mix designs in one order, priced on the total.",
  "Send a ready logo and design is free. If we design it, it is ₹300, free on 700+.",
  "A free proof before we cut anything.",
  "50% advance on UPI to confirm, the rest on delivery or pickup.",
  "Ready 2–3 days after you approve the proof. Free shipping above ₹250.",
] as const;

export const bulkSteps = [
  { title: "Send your logo", body: "DM us on Instagram or fill the form below. A PNG, PDF or even a photo of your logo is fine." },
  { title: "Get a free proof", body: "We send a mock-up of the sticker within a day. Change it as many times as you need." },
  { title: "Confirm with 50%", body: "Pay half on UPI to lock your order. No hidden costs after the quote." },
  { title: "We cut and deliver", body: "Ready 2–3 days after you approve. Pickup in Goa, delivery, or shipping anywhere in India." },
] as const;

export const bulkUses = [
  { title: "Packaging", body: "Seal boxes and bags, and drop a thank-you sticker in every order." },
  { title: "Counter freebies", body: "A sticker with the bill. People put it on laptops and bottles, and your logo travels." },
  { title: "Events and launches", body: "Something people keep after the event ends." },
  { title: "Merch", body: "Sticker packs your fans can afford, sold at your counter or online." },
] as const;

export const bulkFaqs = [
  { q: "What is the minimum order?", a: "100 stickers. You can mix designs, and the price is set by the total." },
  { q: "Are they waterproof?", a: "Yes. Waterproof vinyl that handles bottles, bags and laptops, with a clean cut around any shape." },
  { q: "Can I see a sample first?", a: "Yes. DM us and we can drop a few test stickers with your logo, or send you photos of past work." },
  { q: "Do I need a designer?", a: "No. Send what you have. If your logo needs cleaning up or you want a new design, we do it for ₹300, free on 700+ stickers." },
  { q: "Do you ship outside Goa?", a: "Yes, anywhere in India. Shipping is free above ₹250." },
  { q: "How do I pay?", a: "50% on UPI to confirm, the rest when you collect or before we ship." },
] as const;

export const brandBrief = [
  "Your name and brand",
  "What the stickers are for",
  "Your logo or artwork, if you have it",
  "Rough quantity and size",
  "When you need them",
] as const;

export const faqs = [
  {
    q: "Where can I buy Stix N Vibes stickers?",
    a: "Order from our shop at shop.stixnvibes.com, or find us at pop-up stalls around Goa where you can pay by cash or UPI. For custom orders, message us on Instagram.",
  },
  {
    q: "Are the stickers waterproof?",
    a: "Yes. We print on waterproof paper vinyl, so they handle splashes, bottles and bags. Our splash-proof paper is made for everyday use.",
  },
  {
    q: "How fast do you dispatch?",
    a: "We dispatch the next day.",
  },
  {
    q: "What is live sticker cutting?",
    a: "At our stalls we cut stickers live, right in front of you. Come watch and take one home.",
  },
  {
    q: "Can you make stickers from my own design?",
    a: "Yes. Send us your artwork or your idea through the contact form. Only send artwork that you own or have permission to use.",
  },
  {
    q: "What shapes and cuts can you do?",
    a: "Any. We cut on a Cricut, so die cut, kiss cut and custom shapes are all fine. Tell us what you have in mind.",
  },
  {
    q: "Do you take sponsorships or stall invites?",
    a: "Yes. If you run an event, a market or a college fest and want us there, see the Book a stall page or DM us on Instagram. Sponsors can use the same form.",
  },
  {
    q: "Do you take bulk and brand orders?",
    a: "Yes. Bulk custom stickers start at ₹7 each, with a free proof before we cut. See stixnvibes.com/bulk for prices, then send a brief or DM us on Instagram.",
  },
] as const;

export const stickerCount = 17;
export const stickerSrc = (id: string) => `/lofi/${id}.webp`;
export const allStickers = Array.from(
  { length: stickerCount },
  (_, i) => `lofi-${String(i + 1).padStart(2, "0")}`,
);
