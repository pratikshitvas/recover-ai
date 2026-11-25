# RecoverAI

**Every movement matters.** RecoverAI is an assistive rehabilitation companion for tracking therapist-approved exercises and patient-reported progress. It is not a diagnostic or treatment system.

## Current implementation

This first repository milestone contains a responsive React dashboard and an Express/PostgreSQL API foundation. It includes a Prisma schema for patient/therapist accounts, clinic membership, exercise assignments, rehabilitation sessions, assessments, consent, audit history, billing records, and speech recordings; registration/login with hashed passwords and short-lived JWTs; role checks on patient routes; and endpoints for assigned exercises and the two-check allowance.

The dashboard intentionally displays no fabricated measurements or progress. Camera assessment UI and native computer-vision integration are not yet implemented. The listed mobile, desktop, payments, clinic workflows, speech tools, and notification features remain follow-on milestones. Do not use this scaffold with real patient data.

## Requirements

- Node.js 20+
- PostgreSQL 14+
- Windows 10/11, macOS, or Linux

## Run locally

1. Install Node.js and start a local PostgreSQL server.
2. Copy `apps/api/.env.example` to `apps/api/.env`; set `DATABASE_URL` and a random `JWT_SECRET` of at least 32 characters.
3. From the repository root run `npm install`.
4. Initialize the database: `npm run db:generate`, then `npm run db:migrate --workspace @recoverai/api`.
5. In one terminal run `npm run dev:api`; in another run `npm run dev:web`.
6. Open http://localhost:5173. API health check: http://localhost:4000/health.

## Scripts

- `npm run dev` / `npm run dev:web`: web app
- `npm run dev:api`: API server
- `npm run build:web`: production web build
- `npm run db:generate`: Prisma client generation
- `npm run db:migrate --workspace @recoverai/api`: local development migration

## Safety and privacy

No camera or microphone recordings are uploaded by this initial milestone. Camera-estimated angles, when implemented, must be labelled approximate observations and withheld below the confidence threshold. Never use these values as a clinical goniometer measurement. Patient-specific exercise plans belong to qualified therapists. Urgent or newly worsening symptoms require prompt professional assessment. Security scaffolding does not establish HIPAA, GDPR, or Indian DPDP compliance; clinical validation and privacy/legal review are required before commercial or clinical launch.

## Roadmap

1. Harden authentication, verification, reset flows, scoped permissions, and audit coverage.
2. Therapist-authorized exercise plans and patient session logging.
3. On-device pose detection with confidence-based rejection and synthetic-data unit tests.
4. Assessment-credit ledger with transactional idempotency and verified payment webhooks.
5. Native mobile and Electron desktop clients, followed by clinic, speech, accessibility, and security validation.

## License

All rights reserved pending project licensing decision.
