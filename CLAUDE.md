# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 13+ web application for visualizing time progress (year/month/week/lifetime). The app features customizable progress bars with multiple visualization styles (linear, circular, arc), dark mode support, and local storage persistence.

## Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
```

### Build & Production
```bash
npm run build        # Build for production
npm start            # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint
```

## Architecture

### Project Structure
- **app/** - Next.js App Router (Next.js 13+)
  - `page.tsx` - Main application page (client component with state management)
  - `layout.tsx` - Root layout with fonts and metadata
- **components/** - React components
  - `ProgressBar/` - Progress visualization components (LinearProgress, CircularProgress, ArcProgress)
  - `ui/` - Reusable UI components (Button, Card, Select, Switch, Input, Label, Slider)
  - Feature panels: `SettingsPanel.tsx`, `NotificationPanel.tsx`, `SharePanel.tsx`, `HistoryPanel.tsx`, `LanguageSwitcher.tsx`
- **lib/** - Core business logic and utilities
  - `progress.ts` - Progress calculation logic, milestone detection, motivational messages
  - `i18n.ts` - Internationalization support (Chinese/English)
  - `utils.ts` - Utility functions (cn for className merging)

### Key Patterns

**State Management**: Main page (`app/page.tsx`) manages all application state using React useState. Configuration persists to localStorage.

**Progress Calculation**: All date calculations use `date-fns`. Progress types include:
- `year` - Calendar year progress
- `month` - Current month progress
- `week` - Current week progress (week starts Monday)
- `lifetime` - Life progress based on birth date (80-year life expectancy assumed)

**Component Architecture**:
- Feature panels use collapsible UI with state stored in panel components
- UI components in `components/ui/` are built with class-variance-authority (CVA) for variant styling
- All UI components use forwardRef and support className composition via `cn()` utility

**Styling**:
- Tailwind CSS with dark mode via `darkMode: ["class"]`
- CSS custom properties for theming (defined in Tailwind config)
- Use `cn()` from `lib/utils.ts` to merge Tailwind classes

**Path Aliases**: `@/*` maps to project root (configured in `tsconfig.json`)

### Client vs Server Components
- `app/page.tsx` is a client component ('use client' directive) - manages all interactive state
- `app/layout.tsx` is a server component
- All feature components (SettingsPanel, etc.) are client components

## Development Notes

### Adding New UI Components
Use the existing pattern in `components/ui/`:
- Import and use `cn()` utility for className merging
- Use `forwardRef` for props forwarding
- Consider using `class-variance-authority` for variant-based styling

### Working with Progress Calculations
All progress logic lives in `lib/progress.ts`:
- `calculateProgress()` - Main calculation function
- `getMilestoneMessage()` - Returns milestone notifications at specific percentages (1, 10, 25, 50, 75, 90, 99, 100)
- `ProgressConfig` interface defines configuration options

### Internationalization
Translations are defined in `lib/i18n.ts`. The `t()` function retrieves translations by key. Currently supports Chinese (zh) and English (en).

### Local Storage Keys
- `progress-config` - User configuration
- `dark-mode` - Dark mode preference
- History data uses keys prefixed with `progress-history-`

### Static Export (Optional)
To deploy as static site:
1. Modify `next.config.js` to add `output: 'export'` and `images: { unoptimized: true }`
2. Run `npm run build`
3. Static files output to `out/` directory
