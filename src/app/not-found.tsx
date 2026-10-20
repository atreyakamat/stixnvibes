import Link from "next/link";
import { Sticker } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80dvh] flex-col items-start justify-center pt-24">
      <Sticker id="sticker-14" rotate={-10} className="w-32" />
      <h1 className="display mt-8 text-[clamp(3rem,12vw,9rem)]">This page came unstuck.</h1>
      <p className="mt-4 text-lg text-paper/70">We could not find that page.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to home
      </Link>
    </section>
  );
}
