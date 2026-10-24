// Real reviews and customer photos for the "Stuck on you" wall on the home
// page. Add only reviews people actually gave us, with their OK to show them.
// `photo` is a path under public/, e.g. "/media/wall/riya-laptop.webp".
export type Review = { quote: string; name: string; where?: string; photo?: string };

export const reviews: Review[] = [];
