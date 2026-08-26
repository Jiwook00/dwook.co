import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function dateRange(startDate: Date, endDate?: Date | string): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString("ko-KR", { year: "numeric", month: "short" });
  const start = fmt(startDate);
  let end = "";
  if (endDate) {
    end = typeof endDate === "string" ? endDate : fmt(endDate);
  }
  return `${start} - ${end}`;
}

export function duration(startDate: Date, endDate?: Date | string): string {
  if (!endDate || typeof endDate === "string") return "";
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1;
  if (months < 1) return "";
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest}개월`;
  if (rest === 0) return `${years}년`;
  return `${years}년 ${rest}개월`;
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}
