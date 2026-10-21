"use client";

import { useEffect, useId, useRef, useState, type DragEvent, type FormEvent } from "react";
import { CUTS, hasTransparency, renderPreview, type CutType } from "@/lib/cut-preview";
import { site } from "@/content/site";

const MAX_BYTES = 8 * 1024 * 1024; // Netlify Forms upload limit per submission
const TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

type Source = { img: HTMLImageElement; transparent: boolean; demo: boolean };
type Errors = Partial<Record<"file" | "name" | "email" | "rights", string>>;
type State = "idle" | "sending" | "sent" | "failed";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image"));
    img.src = src;
  });
}

/**
 * Try your artwork as a sticker. The preview is drawn in the browser; the
 * file only leaves the device if the visitor presses send.
 */
export function StickerLab() {
  const uid = useId();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const urlRef = useRef<string | null>(null);
  const [cut, setCut] = useState<CutType>("die");
  const [source, setSource] = useState<Source | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>("idle");
  const [over, setOver] = useState(false);

  // Start with a sample sticker so the preview is never empty.
  useEffect(() => {
    let live = true;
    loadImage("/stickers/sticker-12.webp").then((img) => {
      if (live) setSource({ img, transparent: true, demo: true });
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !source) return;
    renderPreview(canvas, source.img, cut, source.transparent);
  }, [source, cut]);

  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  async function accept(f: File | undefined) {
    if (!f) return;
    if (!TYPES.includes(f.type)) {
      setFileError("Use a PNG, JPG, WebP or SVG file.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setFileError("That file is over 8 MB. Send a smaller one.");
      return;
    }
    try {
      const url = URL.createObjectURL(f);
      const img = await loadImage(url);
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      const transparent = hasTransparency(img, img.naturalWidth || 512, img.naturalHeight || 512);
      setSource({ img, transparent, demo: false });
      setFile(f);
      setFileError(null);
      setErrors((e) => ({ ...e, file: undefined }));
      if (!transparent && (cut === "die" || cut === "kiss")) setCut("square");
    } catch {
      setFileError("We could not read that image. Try another file.");
    }
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setOver(false);
    void accept(e.dataTransfer.files[0]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found: Errors = {};
    if (!file) found.file = "Add your artwork first.";
    if (!String(data.get("name") ?? "").trim()) found.name = "Enter your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) found.email = "Enter an email like name@example.com.";
    if (!data.get("rights")) found.rights = "Confirm that you own the artwork or have permission to use it.";
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.querySelector<HTMLElement>(`[name="${first === "file" ? "artwork-button" : first}"]`)?.focus();
      return;
    }

    setState("sending");
    const body = new FormData();
    body.set("form-name", "sticker-upload");
    body.set("cut", CUTS.find((c) => c.id === cut)?.name ?? cut);
    for (const key of ["name", "email", "details", "bot-field"]) body.set(key, String(data.get(key) ?? ""));
    body.set("rights", "confirmed");
    body.set("artwork", file as File);
    try {
      const res = await fetch("/__forms.html", { method: "POST", body });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setFile(null);
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  const current = CUTS.find((c) => c.id === cut);
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-error`} className="mt-2 text-sm text-[#ff9a80]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Preview */}
      <div className="lg:col-span-6">
        <div className="ice relative aspect-square overflow-hidden rounded-[1.75rem]">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Preview of your design as a ${current?.name.toLowerCase()} sticker`}
            className="size-full"
          />
          <p className="label absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1.5 text-paper/80 backdrop-blur">
            {source?.demo ? "Sample sticker" : "Your artwork"}
          </p>
        </div>
        <p className="mt-4 text-sm text-mute">
          This is an illustration of the cut, not a print proof. We check your file with you before
          anything is printed.
        </p>
      </div>

      {/* Controls */}
      <div className="lg:col-span-6">
        <fieldset>
          <legend className="label text-mute">1 · Choose a cut</legend>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {CUTS.map((c) => (
              <label key={c.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="cut-choice"
                  value={c.id}
                  checked={cut === c.id}
                  onChange={() => setCut(c.id)}
                  className="peer sr-only"
                />
                <span className="block rounded-2xl p-4 ring-1 ring-paper/15 transition-colors peer-checked:bg-lemon peer-checked:text-ink peer-checked:ring-lemon peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lemon">
                  <span className="block font-semibold">{c.name}</span>
                </span>
              </label>
            ))}
          </div>
          <p className="mt-3 text-paper/70" aria-live="polite">
            {current?.blurb}
          </p>
          <p className="mt-1 text-sm text-mute">Want another shape? We cut any shape, so mention it in the details.</p>
        </fieldset>

        <div className="mt-8">
          <p className="label text-mute">2 · Add your artwork</p>
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={onDrop}
            className={`mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-8 text-center transition-colors focus-within:border-lemon ${
              over ? "border-lemon bg-lemon/10" : "border-paper/25 hover:border-lemon"
            }`}
          >
            <input
              name="artwork-button"
              type="file"
              accept={TYPES.join(",")}
              className="sr-only"
              onChange={(e) => void accept(e.target.files?.[0])}
              aria-describedby={`${uid}-file-help`}
            />
            <span className="font-medium">{file ? file.name : "Drop a file here, or choose one"}</span>
            <span id={`${uid}-file-help`} className="text-sm text-mute">
              PNG, JPG, WebP or SVG, up to 8 MB. A PNG with a transparent background gives the best die cut.
            </span>
          </label>
          {(fileError || errors.file) && (
            <p role="alert" className="mt-2 text-sm text-[#ff9a80]">
              {fileError ?? errors.file}
            </p>
          )}
          {source && !source.demo && !source.transparent && (
            <p className="mt-2 text-sm text-paper/70">
              This image has no transparent background, so there is no outline to follow. Circle and
              square show it best. Send a PNG with a transparent background for a die cut.
            </p>
          )}
        </div>

        {state === "sent" ? (
          <div role="status" className="ice mt-8 rounded-[1.5rem] p-6">
            <p className="display text-4xl text-lemon">Got it.</p>
            <p className="mt-3 text-paper/80">
              We received your artwork. We reply by email or WhatsApp.
            </p>
            <button type="button" className="btn btn-ghost mt-5" onClick={() => setState("idle")}>
              Send another
            </button>
          </div>
        ) : (
          <form name="sticker-upload" onSubmit={onSubmit} noValidate className="mt-8 grid gap-4">
            <p className="label text-mute">3 · Send it to us</p>
            <p className="hidden">
              <label>
                Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="mb-2 block text-sm text-paper/80">
                  Your name
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="field"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                />
                {err("name")}
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="mb-2 block text-sm text-paper/80">
                  Email
                </label>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="field"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                />
                {err("email")}
              </div>
            </div>
            <div>
              <label htmlFor={`${uid}-details`} className="mb-2 block text-sm text-paper/80">
                Size and quantity <span className="text-mute">(optional)</span>
              </label>
              <input
                id={`${uid}-details`}
                name="details"
                type="text"
                placeholder="e.g. about 5 cm, a pack of 10"
                className="field"
              />
            </div>
            <div>
              <label className="flex items-start gap-3 text-sm text-paper/80">
                <input
                  type="checkbox"
                  name="rights"
                  className="mt-1 size-4 accent-[var(--color-lemon)]"
                  aria-invalid={errors.rights ? true : undefined}
                  aria-describedby={errors.rights ? `${uid}-rights-error` : undefined}
                />
                I own this artwork or have permission to use it.
              </label>
              {err("rights")}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : "Send my sticker idea"}
              </button>
              <a href={site.contact.instagramDm} target="_blank" rel="noopener" className="btn btn-ghost">
                Or DM us on Instagram
              </a>
            </div>
            {state === "failed" && (
              <p role="alert" className="text-sm text-[#ff9a80]">
                That did not send. Try again, or message us on{" "}
                <a className="underline" href={site.contact.whatsapp}>
                  WhatsApp
                </a>
                .
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
