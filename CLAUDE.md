# The Drawing Company — Architecture & Design Website

## Project Overview
Static SPA for an architecture/design company based in Yerevan, Armenia. No backend — all data is hardcoded.

## Tech Stack
- **React 19** + **TypeScript 5.9** + **Vite 7**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, configured in `src/index.css` `@theme` block)
- **React Router DOM v7** with locale-prefixed routes (`/:lang/...`)
- **Lucide React** for icons
- No state management library — React Context for i18n only

## Commands
- `npm run dev` — start dev server
- `npm run build` — typecheck (`tsc -b`) then build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Architecture
- Routes defined in `src/App.tsx`. All routes nested under `/:lang` with `LanguageRoute` guard.
- Default locale is `hy` (Armenian). Supported: `hy`, `en`, `ru`.
- `src/i18n/context.tsx` provides `useT()` (key-based dictionary lookup) and `useL()` (locale field selector for data objects).
- All content data lives in `src/data/*.ts` — no API calls.
- Path alias: `@/` maps to `src/`.

## Key Conventions
- All links use `<LocaleLink>` (not `<Link>`) to auto-prefix the current locale.
- Translation keys use dot notation: `section.subsection.key`.
- Data fields that vary by language use `L<T>` type (`Record<Locale, T>`).
- Components use Tailwind utility classes exclusively — no CSS modules or styled-components.
- Custom theme tokens: `charcoal`, `charcoal-dark`, `charcoal-darker`, `offwhite`, `accent`.
- Fonts: `font-heading` (Montserrat), `font-body` (Open Sans).
- UI pattern: `SectionHeading` for section titles, `ScrollReveal` for scroll animations, `PageHero` for page banners.

## File Structure
- `src/pages/` — one component per route
- `src/components/layout/` — Header, Footer, MobileMenu, Layout shell
- `src/components/ui/` — reusable UI primitives
- `src/components/calculator/` — calculator feature components
- `src/data/` — static data (services, projects, team, calculator pricing)
- `src/i18n/translations/` — per-locale dictionaries
