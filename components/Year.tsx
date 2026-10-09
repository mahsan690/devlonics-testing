"use client";

import { useSyncExternalStore } from "react";

// The static build renders a fixed year (server snapshot); the browser shows
// the real one. No clock read during prerender, no setState in an effect.
const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
const getBuildYear = () => 2026;

export function Year() {
  const year = useSyncExternalStore(subscribe, getYear, getBuildYear);
  return <>{year}</>;
}
