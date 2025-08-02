import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines Tailwind classes and conditionally applies others
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
