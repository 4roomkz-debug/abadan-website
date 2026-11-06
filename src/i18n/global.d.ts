import type { routing } from "@/i18n/routing";
import type ru from "@/messages/ru";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof ru;
  }
}
