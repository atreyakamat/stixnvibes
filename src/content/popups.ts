// Pop-up stalls we have confirmed. Add a row here and redeploy; past dates
// drop off the list on the next build. Leave empty until a stall is booked:
// an empty list shows the "always up for a pop-up" invite instead.
export type PopUp = {
  date: string; // ISO date, e.g. "2026-11-08"
  name: string;
  place: string;
  note?: string;
};

export const popUps: PopUp[] = [];
