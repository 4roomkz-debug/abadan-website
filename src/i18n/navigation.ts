import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Link, usePathname и useRouter, которые знают про префикс языка.
// Внутренние ссылки в компонентах берём отсюда, а не из next/link.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
