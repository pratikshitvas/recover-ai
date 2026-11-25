# RecoverAI

**Every movement matters.** RecoverAI is an assistive rehabilitation companion for patients and therapists. It is not a diagnostic or treatment system.

## Working web MVP

This repository currently provides a runnable responsive web application and PostgreSQL API with:

- Patient and therapist registration/sign-in with password hashing and JWT sessions.
- Therapist connection requests that patients must accept before records are shared.
- Therapist-managed exercise library, exercise assignment, and appointment scheduling.
- Patient exercise plan, self-reported completed-session log, appointment list, progress history, patient-approved therapist connections, data export, account deletion, and camera consent management.
- Optional browser camera movement check using MediaPipe Pose Landmarker. Pose is processed locally; video is not uploaded or saved. The angle calculations use visible landmarks and reject low-confidence observations. Successful checks use a backend-owned allowance of two, with transaction locking and idempotency.
- Optional browser-only microphone recording and playback. Audio is not uploaded, scored, or saved to an account.
- Expo Android/iOS patient companion with SecureStore sessions, assigned exercises, session logging, progress, and appointments. Therapist accounts remain on the web dashboard. Native movement assessment is not enabled; the camera pose check is currently web-only.
- Deterministic synthetic landmark math tests and CI checks for tests, Prisma schema, and web build.

The camera module uses the CPU delegate. On first use the browser downloads the pose model and WASM files from configured public CDNs; camera frames remain on the device. A browser camera generally requires localhost or HTTPS. These measurements are approximate observations and can be inaccurate due to perspective, framing, lighting, or occlusion. They are not clinical goniometer results.

## Run on Windows 10/11

Requirements: Node.js 22.13 or newer and PostgreSQL 14 or newer. Docker is not required.

1. Create a PostgreSQL database named recoverai.
2. Copy apps/api/.env.example to apps/api/.env. Set DATABASE_URL, a random JWT_SECRET with at least 32 characters, and WEB_ORIGIN=http://localhost:5173.
3. From PowerShell in the repository root, run npm install.
4. Generate the Prisma client and initialize the schema:
   - npm run db:generate
   - npm run db:migrate --workspace @recoverai/api
5. In separate terminals, run npm run dev:api and npm run dev:web.
6. Open http://localhost:5173; the API health endpoint is http://localhost:4000/health.

Set VITE_API_URL in apps/web/.env.local if the API is hosted elsewhere.

## Scripts

- npm run dev:web — Vite web client
- npm run dev:api — Express API
- npm run build:web — production web build
- npm test — pose engine math and confidence tests
- npm run db:generate — generate Prisma client
- npm run db:migrate --workspace @recoverai/api — local Prisma migration
- npm run dev:desktop — Electron development client
- npm run build:desktop — Windows NSIS installer (Windows host)
- npm run build:desktop:mac — macOS DMG (macOS host)

## Data and safety

Use synthetic accounts only while developing. The current MVP is not ready for real patient data or clinical use. It does not yet include email verification, password recovery, encryption-at-rest configuration, external storage, notifications, payment providers, speech transcription, AI chat, clinic administration, native movement assessment, or an Electron desktop shell using the shared web interface. Some database models describe future areas, but a schema model alone is not a complete feature.

Do not use camera estimates to diagnose, assess strength or muscle tone, change exercises, or make recovery predictions. Exercise instructions and patient-specific plans should come from a qualified therapist. Stop if movement hurts or feels unsafe. Seek urgent medical help for severe pain, sudden weakness, new neurological symptoms, breathing difficulty, or another acute change.

Security controls in this repository do not establish HIPAA, GDPR, or Indian DPDP compliance. A privacy and security review, clinical validation, and legal review are needed before commercial or clinical launch.

## Android and iOS patient app

Install workspaces from the repository root, configure EXPO_PUBLIC_API_URL in apps/mobile/.env (use your computer's LAN IP for a physical phone; use 10.0.2.2 for an Android emulator), then run npm run dev:mobile. Build JavaScript bundles with npm run build:android or npm run build:ios. The eas.json file includes internal preview and production build profiles. These export commands do not create signed store installers; EAS credentials, signing, and developer accounts are still required. A macOS/Xcode environment is required for local iOS native builds. The mobile camera pose feature is not implemented; use the web client for movement checks.

## Windows and macOS desktop app

The Electron client loads the same React app and API, uses context isolation and a sandboxed renderer, and prompts before camera/microphone access. In development, start PostgreSQL and the API, then start the web client and run npm run dev:desktop. Build a Windows installer with npm run build:desktop on Windows. On macOS, run npm run build:desktop:mac. A macOS developer certificate and notarization are required for signed distribution. The CI job also creates a Linux unpacked desktop build as a packaging smoke check; it does not produce signed Windows/macOS installers.
