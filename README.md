# Rinzo App

Rinzo is an Expo React Native laundry service app. The current app flow starts with a splash screen, moves through onboarding and location access, and then presents login/signup screens. The repository also contains screen folders for the wider laundry ordering experience, including pickup scheduling, cart, orders, payments, profile, support, offers, and address management.

## Tech Stack

- Expo SDK 56
- React Native 0.85
- React 19
- TypeScript with strict mode
- React Navigation packages for navigation-ready screens
- Expo modules for status bar, fonts, images, location, and gradients
- Zustand, TanStack Query, Axios, React Hook Form, and Zod for app state, data, forms, and validation

## Requirements

Expo SDK 56 expects Node.js 22.13.x or newer. Install dependencies with npm because this project includes a `package-lock.json`.

## Getting Started

```bash
npm install
npm start
```

Run on a target platform:

```bash
npm run android
npm run ios
npm run web
```

The Expo CLI will open a development server. Use Expo Go, an emulator, or a simulator to preview the app.

## Available Scripts

- `npm start` - start the Expo development server
- `npm run android` - start Expo and open the Android target
- `npm run ios` - start Expo and open the iOS target
- `npm run web` - start Expo for web


## Project Structure

```text
.
|-- App.tsx                 # Current screen-state based app flow
|-- index.ts                # Expo root registration
|-- app.json                # Expo app configuration
|-- assets/                 # Expo app icons and image assets
|-- src/
|   |-- assets/             # App-level images, fonts, icons, animations
|   |-- components/         # Reusable UI components
|   |-- constants/          # Shared constants such as theme colors
|   |-- data/               # Static or mock data
|   |-- hooks/              # Reusable hooks
|   |-- navigation/         # Navigation setup
|   |-- screens/            # App screens
|   |-- services/           # API and integration services
|   |-- store/              # Client state stores
|   |-- theme/              # Theme primitives
|   |-- types/              # Shared TypeScript types
|   `-- utils/              # Utility helpers
`-- tsconfig.json           # TypeScript configuration
```

## Current App Flow

`App.tsx` currently uses local state to move through:

1. Splash
2. Onboarding
3. Location access
4. Login
5. Signup

`SchedulePickupScreen` is implemented as a standalone screen with selectable pickup dates and time slots. It uses React Navigation's `useNavigation`, so it should be mounted inside a navigator before being used in the main app flow.

## Expo Notes

This project is configured for Expo SDK 56 in `package.json` and `app.json`. Before changing Expo APIs or adding Expo packages, check the versioned SDK documentation:

https://docs.expo.dev/versions/v56.0.0/

Use Expo's installer for Expo SDK packages so compatible versions are selected:

```bash
npx expo install <package-name>
```

## Development Notes

- Keep new screen code under `src/screens/<ScreenName>/`.
- Put shared UI in `src/components/`.
- Reuse shared brand colors from `src/constants/theme.ts`.
- Keep TypeScript strict-mode compatible.
- Add assets to the root `assets/` folder when Expo config references them, and to `src/assets/` when they are imported by application code.

## License

This project includes an MIT license in `LICENSE`.
