# SENTINEL Dashboard - Refactored Next.js Project

## Project Structure

```
senti/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page (renders AppShell)
│   └── globals.css              # Global styles
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx    # Dashboard overview view
│   │   ├── employees/
│   │   │   ├── EmployeeList.tsx          # Employee table with filters
│   │   │   ├── EmployeeDetail.tsx        # Employee detail view
│   │   │   └── CredentialVerifier.tsx    # Credential verification tool
│   │   ├── layout/
│   │   │   └── AppShell.tsx     # Main app shell with sidebar & navigation
│   │   └── shared/
│   │       ├── Card.tsx         # Reusable card component
│   │       ├── StatCard.tsx     # Statistics card with icon
│   │       ├── ScoreRing.tsx    # Circular score visualization
│   │       ├── STSBar.tsx       # STS score progress bar
│   │       └── index.ts         # Barrel export
│   ├── constants/
│   │   ├── colors.ts            # Color palette
│   │   └── data.ts              # Employee & department data
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   └── utils/
│       ├── helpers.ts           # Verdict colors, actions, icons
│       └── formatters.ts        # Currency & formatting utilities
├── package.json
├── tsconfig.json
└── next.config.js
```

## Key Features

✅ **Full Next.js 14 App Router** - Using modern server/client components
✅ **Modular Components** - Split across dashboard, employees, layout, and shared
✅ **Type-Safe** - Comprehensive TypeScript interfaces
✅ **Responsive UI** - Grid-based responsive layout
✅ **Dark Theme** - Squad-inspired color palette
✅ **Interactive Features** - Search, filtering, verification simulation
✅ **Charts & Visualizations** - Recharts for data visualization

## Component Breakdown

### Layout Components
- **AppShell** - Main container with sidebar navigation, topbar, and content area
- **Dashboard** - KPI cards, verdict distribution pie chart, department risk bar chart, recent alerts

### Feature Components
- **EmployeeList** - Searchable/filterable employee table with verdict badges
- **EmployeeDetail** - Detailed view with STS score, breakdown, flags, verification engine
- **CredentialVerifier** - Multi-stage credential verification pipeline

### Shared Components
- **Card** - Base container with styling
- **StatCard** - Icon + metric display
- **ScoreRing** - SVG circular progress indicator
- **STSBar** - Linear progress bar with score

### Utilities
- **helpers.ts** - Verdict color mapping, squad actions, icons
- **formatters.ts** - Currency formatting, STS percentage calculation

## Running the Project

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Navigation

- **Dashboard** - Overview with KPIs and alerts
- **Employees** - Full employee roster with search/filter
- **Credentials** - Verify educational credentials
- **Analytics** - Coming in v0.2

## Data Flow

1. Employee data lives in `constants/data.ts`
2. Components import and display data
3. Navigation state managed in `AppShell`
4. Colors/styling centralized in `constants/colors.ts`
