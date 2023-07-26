import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function truncate(text: string, count: number): string {
  return text.length > count ? text.slice(0, count) + "..." : text;
}

export const defaultLabelColors = [
  "#fee2e2",
  "#fef9c3",
  "#dcfce7",
  "#ccfbf1",
  "#dbeafe",
  "#ede9fe",
  "#fce7f3",
  "#ffe4e6",
]
