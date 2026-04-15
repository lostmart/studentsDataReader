# Students Filtering System

A full-stack tool for filtering and comparing student grades across groups to detect inconsistencies between groups, teachers, or evaluation methods. When inconsistencies are found, the relevant teacher can be contacted to address the situation.

## Purpose

This system processes grade data for Bachelor of Computer Science students split across two groups (G1 and G2). It identifies grading discrepancies that may indicate inconsistencies in evaluation methods or teacher grading practices.

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Frontend:** React, Tailwind CSS, TypeScript *(not yet initialized)*

## Project Structure

```
studentsFilteringSystem/
├── back/               # Node.js REST API
│   ├── src/
│   │   └── index.ts    # Server entry point
│   ├── studentsData/   # CSV data files (gitignored)
│   └── tsconfig.json
├── front/              # React frontend (pending)
└── docs/
    └── spec.md         # Project specification
```

## Data Sources

Place the following CSV files in `back/studentsData/`:

1. **Grades file** — All student grades by performance
2. **Group files** — Student rosters for G1 and G2

> These files are gitignored. Do not commit student data.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Backend

```bash
cd back
npm install
```

Create a `.env` file in `back/`:

```
PORT=3000
```

**Run in development:**

```bash
npm run dev
```

**Build and run in production:**

```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`.

### Frontend

*(Not yet initialized — will use React + Tailwind CSS + TypeScript)*

## API Endpoints

| Method | Path      | Description  |
|--------|-----------|--------------|
| GET    | `/health` | Health check |

More endpoints will be added as the project evolves.

## Development Guidelines

- MVP-first: keep solutions simple and minimal
- Avoid over-engineering — complexity grows only as the project requires it

## License

ISC — Author: m pedraza
