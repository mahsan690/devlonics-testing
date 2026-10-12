// Generates a featured image for every blog post that doesn't have one yet:
// public/blog/<slug>.webp, 1600x900, flat illustrations in the brand colours.
//
// Pick the illustration in the post's frontmatter:
//   cover: phone        (motif, see MOTIFS below)
//   coverTone: dark     (dark | light | signal; optional, alternates if left out)
//
// Run:  node scripts/make-covers.mjs          (only missing images)
//       node scripts/make-covers.mjs --force  (redraw all)
// The images are committed to the repo; builds don't run this.

import { readdir, readFile, mkdir, access } from "node:fs/promises";
import { join, basename } from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const contentDir = join(root, "content", "blog");
const outDir = join(root, "public", "blog");
const W = 1600;
const H = 900;

// Brand colours (app/globals.css).
const INK = "#000000", PAPER = "#ffffff", SIGNAL = "#e94b27", SIGNAL_INK = "#c23a18";
const FOG = "#f0f0ef", LINE = "#dcdcda", ASH = "#a3a3a3", COAL = "#1c1c1c";

const TONES = {
  dark: { bg: INK, deco: COAL, card: COAL, cardAlt: "#2a2a2a", fg: PAPER, soft: "#3a3a3a", muted: "#5c5c5c", accent: SIGNAL, accentAlt: "#ff7a57", shadow: "#000000", shadowOpacity: 0.55 },
  light: { bg: FOG, deco: PAPER, card: PAPER, cardAlt: "#fafaf9", fg: INK, soft: LINE, muted: ASH, accent: SIGNAL, accentAlt: SIGNAL_INK, shadow: INK, shadowOpacity: 0.09 },
  signal: { bg: SIGNAL, deco: "#f0623f", card: PAPER, cardAlt: "#fff4f0", fg: INK, soft: "#f6c3b5", muted: "#f39a83", accent: INK, accentAlt: COAL, shadow: "#7a1d07", shadowOpacity: 0.28 },
};

// Material Design icon paths (Apache 2.0), drawn on a 24x24 grid.
const ICON = {
  call: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  dollar: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
  shield: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
  cart: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z",
  person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  cloud: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z",
  bolt: "M7 2v11h3v9l7-12h-4l4-8z",
  megaphone: "M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z",
  access: "M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z",
  leaf: "M6.05 8.05c-2.73 2.73-2.73 7.15-.02 9.88 1.47-3.4 4.09-6.24 7.36-7.93-2.77 2.34-4.71 5.61-5.39 9.32 2.6 1.23 5.8.78 7.95-1.37C19.43 14.47 20 4 20 4S9.53 4.57 6.05 8.05z",
  broom: "M16 11h-1V3c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v8H8c-2.76 0-5 2.24-5 5v7h18v-7c0-2.76-2.24-5-5-5zm3 10h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3H9v-3c0-.55-.45-1-1-1s-1 .45-1 1v3H5v-5c0-1.65 1.35-3 3-3h8c1.65 0 3 1.35 3 3v5z",
  heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  drop: "M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z",
  flame: "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z",
  snow: "M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z",
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  sparkle: "M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z",
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
  arrow: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
  gear: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
  hammer: "M2 19.63L13.43 8.2l-.71-.71 1.42-1.42-2.13-2.12 1.41-1.42c1.17-1.17 3.07-1.17 4.24 0l3.54 3.54-1.41 1.41-1.42-1.41-1.41 1.41-.71-.71L4.83 22.06z",
  bag: "M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z",
  thumb: "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z",
};

// ---------- drawing helpers ----------
const icon = (name, x, y, size, fill) =>
  `<path d="${ICON[name]}" fill="${fill}" transform="translate(${x} ${y}) scale(${size / 24})"/>`;

function card(t, x, y, w, h, { r = 28, fill = t.card, shadow = true, stroke } = {}) {
  const s = shadow ? `<rect x="${x + 16}" y="${y + 20}" width="${w}" height="${h}" rx="${r}" fill="${t.shadow}" opacity="${t.shadowOpacity}"/>` : "";
  const st = stroke ? ` stroke="${stroke}" stroke-width="3"` : "";
  return `${s}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${st}/>`;
}

// Placeholder text: a column of rounded bars.
function lines(x, y, widths, color, { h = 16, gap = 28 } = {}) {
  return widths.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="${h}" rx="${h / 2}" fill="${color}"/>`).join("");
}

function circle(cx, cy, r, fill, extra = "") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`;
}

function ring(cx, cy, r, stroke, w = 4, opacity = 1) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${w}" opacity="${opacity}"/>`;
}

// Browser window with three dots in the top bar.
function browser(t, x, y, w, h, body = "", fill = t.card) {
  return (
    card(t, x, y, w, h, { fill }) +
    `<rect x="${x}" y="${y}" width="${w}" height="56" rx="28" fill="${t.soft}" opacity="0.6"/>` +
    `<rect x="${x}" y="${y + 30}" width="${w}" height="26" fill="${fill}"/>` +
    [0, 1, 2].map((i) => circle(x + 34 + i * 26, y + 28, 8, i === 0 ? t.accent : t.muted)).join("") +
    body
  );
}

function stars(x, y, size, n, fill, empty) {
  return Array.from({ length: 5 }, (_, i) => icon("star", x + i * (size + 8), y, size, i < n ? fill : empty)).join("");
}

// Background: a big soft circle, a dot grid and a thin arc.
function backdrop(t, seed) {
  const flip = seed % 2 === 0;
  const cx = flip ? 1360 : 240;
  const dots = [];
  const gx = flip ? 90 : 1180;
  for (let i = 0; i < 7; i++) for (let j = 0; j < 5; j++) dots.push(circle(gx + i * 40, 90 + j * 40, 4, t.muted, 'opacity="0.55"'));
  return (
    `<rect width="${W}" height="${H}" fill="${t.bg}"/>` +
    circle(cx, flip ? 760 : 120, 430, t.deco) +
    `<path d="M ${flip ? -40 : 1640} 640 Q 800 ${flip ? 300 : 980} ${flip ? 1640 : -40} 520" fill="none" stroke="${t.soft}" stroke-width="3" opacity="0.7"/>` +
    dots.join("")
  );
}

// ---------- motifs: each draws the main scene ----------
const MOTIFS = {
  phone(t) {
    return (
      card(t, 640, 150, 320, 600, { r: 48 }) +
      `<rect x="664" y="196" width="272" height="470" rx="18" fill="${t.cardAlt === t.card ? t.bg : t.cardAlt}" opacity="0.9"/>` +
      lines(696, 236, [180, 120, 200, 150], t.soft) +
      card(t, 696, 400, 208, 120, { r: 18, fill: t.bg === INK ? "#2a2a2a" : FOG, shadow: false }) +
      circle(800, 604, 44, t.accent) + icon("call", 776, 580, 48, PAPER) +
      [90, 150, 210].map((r, i) => `<path d="M ${1000 + i * 4} ${450 - r} A ${r} ${r} 0 0 1 ${1000 + i * 4} ${450 + r}" fill="none" stroke="${t.accent}" stroke-width="10" stroke-linecap="round" opacity="${1 - i * 0.28}"/>`).join("") +
      card(t, 330, 300, 250, 150, { r: 24 }) + circle(390, 375, 34, t.accent) + icon("person", 368, 353, 44, PAPER) + lines(442, 350, [100, 70], t.soft)
    );
  },
  missed(t) {
    return (
      MOTIFS.phone(t) +
      card(t, 1080, 230, 230, 110, { r: 22, fill: t.accent, shadow: true }) +
      icon("call", 1104, 262, 46, PAPER) + lines(1166, 268, [110, 70], PAPER, { h: 14, gap: 26 }) +
      card(t, 1110, 560, 210, 100, { r: 22 }) + icon("clock", 1130, 586, 48, t.accent) + lines(1192, 596, [100, 60], t.soft, { h: 14, gap: 26 })
    );
  },
  map(t) {
    const grid = [];
    for (let i = 0; i < 6; i++) grid.push(`<rect x="${500 + i * 110}" y="180" width="18" height="540" fill="${t.soft}" opacity="0.8"/>`);
    for (let j = 0; j < 5; j++) grid.push(`<rect x="440" y="${220 + j * 110}" width="720" height="18" fill="${t.soft}" opacity="0.8"/>`);
    return (
      card(t, 440, 160, 720, 580, { r: 40 }) +
      `<clipPath id="m"><rect x="440" y="160" width="720" height="580" rx="40"/></clipPath><g clip-path="url(#m)">${grid.join("")}` +
      `<path d="M 440 600 C 620 520 760 700 1160 470" fill="none" stroke="${t.accent}" stroke-width="22" opacity="0.25"/></g>` +
      ring(800, 520, 90, t.accent, 6, 0.5) + ring(800, 520, 160, t.accent, 4, 0.3) + ring(800, 520, 230, t.accent, 3, 0.18) +
      icon("pin", 704, 300, 192, t.accent) +
      card(t, 1120, 300, 250, 120, { r: 22 }) + stars(1145, 330, 30, 5, t.accent, t.soft) + lines(1145, 382, [160], t.soft, { h: 14 })
    );
  },
  stars(t) {
    return (
      card(t, 470, 200, 660, 430, { r: 36 }) +
      circle(560, 290, 46, t.accent) + icon("person", 532, 262, 56, PAPER) +
      lines(630, 268, [220, 150], t.soft) +
      stars(520, 380, 72, 5, t.accent, t.soft) +
      lines(520, 500, [520, 460, 380], t.soft) +
      card(t, 1010, 560, 300, 140, { r: 26, fill: t.accent }) + icon("thumb", 1040, 596, 64, PAPER) + lines(1124, 610, [140, 90], PAPER, { h: 14, gap: 28 }) +
      `<text x="1060" y="300" font-family="Georgia,serif" font-size="220" fill="${t.accent}" opacity="0.22">&#8221;</text>`
    );
  },
  chart(t) {
    const bars = [140, 210, 180, 290, 360].map((h, i) => `<rect x="${560 + i * 100}" y="${680 - h}" width="64" height="${h}" rx="12" fill="${i === 4 ? t.accent : t.soft}"/>`).join("");
    return (
      browser(t, 460, 150, 700, 600, bars + `<polyline points="592,520 692,450 792,480 892,380 992,290" fill="none" stroke="${t.fg}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>` + circle(992, 290, 16, t.accent)) +
      card(t, 1100, 230, 250, 130, { r: 24 }) + `<g transform="rotate(-45 1160 295)">${icon("arrow", 1124, 259, 72, t.accent)}</g>` + lines(1214, 270, [100, 70], t.soft)
    );
  },
  ai(t) {
    return (
      card(t, 420, 210, 760, 110, { r: 55 }) + icon("search", 456, 237, 56, t.accent) + lines(540, 256, [380], t.soft, { h: 18 }) +
      card(t, 420, 380, 560, 190, { r: 32 }) + icon("sparkle", 452, 410, 56, t.accent) + lines(530, 420, [380, 320, 260], t.soft) +
      card(t, 760, 600, 420, 120, { r: 32, fill: t.accent }) + lines(800, 636, [300, 220], PAPER) +
      icon("sparkle", 1220, 250, 120, t.accent) + icon("sparkle", 1300, 420, 56, t.muted)
    );
  },
  pricing(t) {
    const tier = (x, y, h, hl) =>
      card(t, x, y, 230, h, { r: 28, fill: hl ? t.accent : t.card }) +
      icon("dollar", x + 85, y + 40, 60, hl ? PAPER : t.accent) +
      lines(x + 40, y + 130, [150, 120, 140, 100], hl ? PAPER : t.soft, { gap: 34 }) +
      `<rect x="${x + 40}" y="${y + h - 80}" width="150" height="44" rx="22" fill="${hl ? PAPER : t.soft}"/>`;
    return tier(470, 260, 440, false) + tier(730, 200, 500, true) + tier(990, 260, 440, false);
  },
  shield(t) {
    return (
      browser(t, 400, 180, 560, 520, lines(440, 290, [380, 300, 340, 260, 320], t.soft, { gap: 40 })) +
      card(t, 860, 250, 360, 400, { r: 44, fill: t.accent }) + icon("shield", 920, 300, 240, PAPER)
    );
  },
  access(t) {
    return (
      browser(t, 420, 170, 620, 560, lines(470, 290, [420, 360, 400, 300], t.soft, { gap: 42 }) + `<rect x="470" y="480" width="200" height="64" rx="32" fill="${t.accent}"/>`) +
      circle(1150, 430, 190, t.accent) + ring(1150, 430, 230, t.accent, 6, 0.35) + icon("access", 1050, 330, 200, PAPER)
    );
  },
  calendar(t) {
    const cells = [];
    const on = new Set([3, 9, 10, 16, 17, 18, 24]);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
      const i = r * 7 + c;
      cells.push(`<rect x="${500 + c * 88}" y="${330 + r * 88}" width="70" height="70" rx="16" fill="${on.has(i) ? t.accent : t.soft}" opacity="${on.has(i) ? 1 : 0.7}"/>`);
    }
    return (
      card(t, 460, 180, 680, 560, { r: 40 }) +
      `<rect x="460" y="180" width="680" height="110" rx="40" fill="${t.fg}"/><rect x="460" y="250" width="680" height="40" fill="${t.fg}"/>` +
      circle(560, 180, 18, t.muted) + circle(1040, 180, 18, t.muted) + lines(510, 225, [200], t.bg === INK ? INK : PAPER, { h: 20 }) +
      cells.join("") +
      circle(1210, 300, 74, t.accent) + icon("check", 1170, 260, 80, PAPER)
    );
  },
  cart(t) {
    const product = (x, y, hl) => card(t, x, y, 220, 280, { r: 28 }) + `<rect x="${x + 24}" y="${y + 24}" width="172" height="140" rx="18" fill="${hl ? t.accent : t.soft}"/>` + lines(x + 24, y + 186, [150, 90], t.soft);
    return product(420, 220, false) + product(680, 170, true) + product(940, 220, false) +
      circle(1250, 560, 120, t.accent) + icon("cart", 1180, 490, 140, PAPER) +
      card(t, 520, 560, 300, 120, { r: 24 }) + icon("bag", 548, 590, 60, t.accent) + lines(630, 600, [150, 100], t.soft);
  },
  hiring(t) {
    return (
      card(t, 520, 150, 400, 600, { r: 40 }) +
      `<rect x="660" y="130" width="120" height="40" rx="14" fill="${t.muted}"/>` +
      circle(720, 330, 100, t.accent) + icon("person", 660, 270, 120, PAPER) +
      lines(600, 480, [240, 180, 220], t.soft, { gap: 40 }) +
      card(t, 980, 260, 300, 120, { r: 24 }) + icon("hammer", 1004, 290, 60, t.accent) + lines(1084, 300, [150, 100], t.soft) +
      card(t, 1010, 450, 300, 120, { r: 24, fill: t.accent }) + icon("check", 1034, 480, 60, PAPER) + lines(1114, 490, [150, 100], PAPER)
    );
  },
  speed(t) {
    const cx = 800, cy = 560, r = 300;
    const arc = (a0, a1, color, w) => {
      const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      const [x0, y0] = p(a0), [x1, y1] = p(a1);
      return `<path d="M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
    };
    return (
      arc(Math.PI, Math.PI * 1.45, t.soft, 46) + arc(Math.PI * 1.5, Math.PI * 1.75, t.muted, 46) + arc(Math.PI * 1.8, Math.PI * 2, t.accent, 46) +
      `<line x1="${cx}" y1="${cy}" x2="${cx + 230 * Math.cos(Math.PI * 1.88)}" y2="${cy + 230 * Math.sin(Math.PI * 1.88)}" stroke="${t.fg}" stroke-width="16" stroke-linecap="round"/>` +
      circle(cx, cy, 34, t.fg) + circle(cx, cy, 14, t.accent) +
      card(t, 1110, 230, 240, 120, { r: 24 }) + icon("bolt", 1136, 258, 64, t.accent) + lines(1214, 270, [100, 70], t.soft)
    );
  },
  home(t) {
    return (
      card(t, 500, 200, 600, 500, { r: 40 }) + icon("home", 560, 230, 380, t.accent) +
      card(t, 1040, 470, 260, 130, { r: 24 }) + icon("gear", 1064, 503, 64, t.fg) + lines(1146, 512, [110, 80], t.soft) +
      card(t, 330, 300, 240, 120, { r: 24 }) + stars(352, 330, 30, 5, t.accent, t.soft) + lines(352, 380, [150], t.soft, { h: 14 })
    );
  },
  storm(t) {
    return (
      icon("cloud", 520, 80, 560, t.fg === PAPER ? "#3a3a3a" : t.soft) +
      icon("bolt", 760, 330, 220, t.accent) +
      card(t, 560, 520, 480, 230, { r: 32 }) +
      `<path d="M 600 600 L 800 470 L 1000 600 Z" fill="${t.fg}"/>` + `<rect x="760" y="640" width="80" height="110" rx="10" fill="${t.accent}"/>` +
      card(t, 1110, 520, 250, 130, { r: 24, fill: t.accent }) + icon("check", 1134, 552, 64, PAPER) + lines(1214, 562, [110, 80], PAPER)
    );
  },
  megaphone(t) {
    const post = (x, y, hl) => card(t, x, y, 260, 300, { r: 28 }) + `<rect x="${x + 22}" y="${y + 22}" width="216" height="150" rx="18" fill="${hl ? t.accent : t.soft}"/>` + icon("heart", x + 22, y + 196, 40, t.accent) + icon("thumb", x + 74, y + 196, 40, t.muted) + lines(x + 22, y + 254, [180], t.soft, { h: 14 });
    return circle(560, 450, 170, t.accent) + icon("megaphone", 448, 338, 224, PAPER) + post(800, 170, true) + post(1100, 300, false) + post(830, 520, false);
  },
  migrate(t) {
    return (
      browser(t, 300, 230, 440, 380, lines(340, 330, [300, 240, 280, 200], t.soft, { gap: 40 }), t.cardAlt) +
      browser(t, 900, 200, 460, 420, lines(940, 300, [320, 260, 300, 220], t.soft, { gap: 40 }) + `<rect x="940" y="500" width="180" height="56" rx="28" fill="${t.accent}"/>`) +
      circle(820, 420, 70, t.accent) + icon("arrow", 780, 380, 80, PAPER)
    );
  },
  leaf(t) {
    return (
      circle(1180, 260, 110, t.accent) +
      card(t, 460, 280, 560, 440, { r: 40 }) + icon("leaf", 540, 300, 400, t.accent) +
      [0, 1, 2, 3].map((i) => `<rect x="${1080 + i * 70}" y="${480 + (i % 2) * 30}" width="50" height="${180 - (i % 2) * 30}" rx="12" fill="${i === 2 ? t.accent : t.soft}"/>`).join("")
    );
  },
  clean(t) {
    return (
      card(t, 520, 200, 500, 500, { r: 40 }) + icon("broom", 570, 250, 400, t.accent) +
      icon("sparkle", 1080, 220, 110, t.accent) + icon("sparkle", 1200, 380, 64, t.muted) + icon("sparkle", 440, 600, 70, t.accent) +
      card(t, 1080, 520, 260, 130, { r: 24 }) + icon("check", 1104, 552, 64, t.accent) + lines(1186, 562, [110, 80], t.soft)
    );
  },
  care(t) {
    return (
      card(t, 460, 220, 520, 460, { r: 40 }) + circle(720, 400, 120, t.accent) + icon("heart", 640, 320, 160, PAPER) + lines(560, 560, [320, 260], t.soft, { gap: 40 }) +
      card(t, 1020, 260, 300, 130, { r: 24 }) + circle(1080, 325, 36, t.accent) + icon("person", 1056, 301, 48, PAPER) + lines(1136, 306, [140, 90], t.soft) +
      card(t, 1040, 450, 300, 130, { r: 24 }) + icon("shield", 1064, 482, 64, t.accent) + lines(1146, 492, [140, 90], t.soft)
    );
  },
  build(t) {
    return (
      card(t, 360, 220, 420, 460, { r: 36, fill: t.cardAlt }) + icon("home", 420, 280, 300, t.soft) + lines(400, 610, [200], t.soft) +
      card(t, 820, 180, 460, 520, { r: 36 }) + icon("home", 880, 240, 340, t.accent) + lines(860, 630, [240], t.soft) +
      circle(800, 450, 54, t.fg) + icon("arrow", 772, 422, 56, t.bg === INK ? INK : PAPER) +
      icon("hammer", 1240, 140, 110, t.accent)
    );
  },
  drop(t) {
    return (
      `<rect x="380" y="560" width="840" height="70" rx="35" fill="${t.soft}"/><rect x="760" y="300" width="70" height="300" rx="35" fill="${t.soft}"/>` +
      icon("drop", 650, 150, 300, t.accent) +
      card(t, 1040, 220, 280, 280, { r: 140 }) + icon("clock", 1080, 260, 200, t.fg) +
      card(t, 380, 250, 240, 130, { r: 24, fill: t.accent }) + icon("call", 404, 284, 60, PAPER) + lines(484, 292, [110, 80], PAPER)
    );
  },
  hvac(t) {
    return (
      card(t, 560, 190, 480, 520, { r: 44 }) + ring(800, 420, 150, t.soft, 22) +
      `<path d="M 800 270 A 150 150 0 0 1 950 420" fill="none" stroke="${t.accent}" stroke-width="22" stroke-linecap="round"/>` +
      icon("flame", 740, 360, 120, t.accent) + lines(680, 620, [240], t.soft) +
      circle(1170, 300, 100, t.fg) + icon("snow", 1110, 240, 120, t.bg === INK ? INK : PAPER) +
      circle(430, 560, 90, t.accent) + icon("flame", 380, 510, 100, PAPER)
    );
  },
  money(t) {
    const stack = (x, n, hl) => Array.from({ length: n }, (_, i) => `<ellipse cx="${x}" cy="${690 - i * 34}" rx="90" ry="28" fill="${hl ? (i % 2 ? t.accentAlt : t.accent) : i % 2 ? t.muted : t.soft}"/>`).join("");
    return stack(560, 5, false) + stack(780, 8, false) + stack(1000, 11, true) +
      card(t, 1120, 220, 250, 130, { r: 24 }) + icon("dollar", 1144, 252, 64, t.accent) + lines(1224, 262, [110, 80], t.soft) +
      `<polyline points="480,380 640,330 820,350 1060,190" fill="none" stroke="${t.fg}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>` + circle(1060, 190, 18, t.accent);
  },
  tools(t) {
    return (
      card(t, 440, 200, 340, 460, { r: 36 }) + icon("sparkle", 500, 250, 220, t.accent) + lines(480, 520, [240, 180], t.soft, { gap: 40 }) +
      card(t, 820, 160, 360, 230, { r: 32 }) + icon("gear", 850, 190, 100, t.fg) + lines(980, 220, [160, 120, 140], t.soft, { gap: 34 }) +
      card(t, 820, 430, 360, 230, { r: 32, fill: t.accent }) + icon("check", 850, 470, 100, PAPER) + lines(980, 490, [160, 120, 140], PAPER, { gap: 34 })
    );
  },
};

// Illustrations for the service landing pages: public/services/<slug>.webp
const SERVICE_COVERS = {
  "lead-generation-websites": ["missed", "light"],
  "small-business-websites": ["home", "light"],
  "online-stores": ["cart", "light"],
  "app-development": ["phone", "light"],
  "custom-software": ["tools", "light"],
  "seo-and-marketing": ["map", "light"],
};

const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

function svgFor(slug, motif, toneName) {
  const t = TONES[toneName];
  const draw = MOTIFS[motif];
  if (!draw) throw new Error(`Unknown cover motif "${motif}" (choose from: ${Object.keys(MOTIFS).join(", ")})`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${backdrop(t, hash(slug))}<g transform="translate(800 450) scale(1.12) translate(-800 -450)">${draw(t)}</g></svg>`;
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function main() {
  // --preview=<dir>: draw every motif in every tone into <dir>, for review.
  const preview = process.argv.find((a) => a.startsWith("--preview="))?.slice(10);
  if (preview) {
    await mkdir(preview, { recursive: true });
    for (const motif of Object.keys(MOTIFS)) for (const tone of Object.keys(TONES)) {
      await sharp(Buffer.from(svgFor(motif + tone, motif, tone))).resize(800).png().toFile(join(preview, `${motif}-${tone}.png`));
    }
    console.log(`preview: ${Object.keys(MOTIFS).length * 3} images in ${preview}`);
    return;
  }
  const force = process.argv.includes("--force");
  const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(contentDir)).filter((f) => f.endsWith(".md")).sort();
  const order = Object.keys(TONES);
  let made = 0;
  for (const [i, file] of files.entries()) {
    const slug = basename(file, ".md");
    if (only && slug !== only) continue;
    const out = join(outDir, `${slug}.webp`);
    if (!force && (await exists(out))) continue;
    const { data } = matter(await readFile(join(contentDir, file), "utf8"));
    const motif = data.cover || "home";
    const tone = data.coverTone || order[i % order.length];
    await sharp(Buffer.from(svgFor(slug, motif, tone))).webp({ quality: 86 }).toFile(out);
    made++;
    console.log(`cover: ${slug}.webp (${motif}, ${tone})`);
  }
  const svcDir = join(root, "public", "services");
  await mkdir(svcDir, { recursive: true });
  for (const [slug, [motif, tone]] of Object.entries(SERVICE_COVERS)) {
    const out = join(svcDir, `${slug}.webp`);
    if (!force && (await exists(out))) continue;
    await sharp(Buffer.from(svgFor(slug, motif, tone))).webp({ quality: 86 }).toFile(out);
    made++;
    console.log(`service image: ${slug}.webp (${motif}, ${tone})`);
  }
  console.log(`covers: ${made} made`);
}

main();
