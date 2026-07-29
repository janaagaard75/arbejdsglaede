import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** ClassName helper function used like clsx, but with tailwind-merge so that later classes override earlier ones. */
export const cn = (...classValues: Array<ClassValue>) =>
  twMerge(clsx(classValues));
