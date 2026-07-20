# Biskora Website Rebuild Requirements

## Overview
This is a Vite + React + Express + tRPC project originally built with Manus AI platform dependencies. It needs to be rebuilt to be fully self-contained and deployable on Vercel/Render/Railway WITHOUT any Manus-specific dependencies.

## Current Tech Stack
- Frontend: React 19 + Vite + TailwindCSS + wouter (routing) + tRPC client + framer-motion
- Backend: Express + tRPC server + Drizzle ORM
- Database: Currently MySQL (mysql2) - MUST be changed to PostgreSQL for Railway/Render compatibility
- Auth: Currently uses Manus OAuth - MUST be replaced with simple admin login (username/password with JWT)

## CRITICAL CHANGES REQUIRED

### 1. Remove ALL Manus-specific files and dependencies:
- Remove `vite-plugin-manus-runtime` from package.json and vite.config.ts
- Remove `@builder.io/vite-plugin-jsx-loc` (jsxLocPlugin) from vite.config.ts  
- Remove the entire `vitePluginManusDebugCollector` plugin from vite.config.ts
- Remove `server/_core/sdk.ts` (Manus SDK)
- Remove `server/_core/oauth.ts` (Manus OAuth)
- Remove `server/_core/heartbeat.ts` (Manus heartbeat)
- Remove `server/_core/notification.ts` (Manus notifications)
- Remove `server/_core/imageGeneration.ts` (Manus image gen)
- Remove `server/_core/voiceTranscription.ts` (Manus voice)
- Remove `server/_core/map.ts` (Manus maps)
- Remove `server/_core/dataApi.ts` (Manus data API)
- Remove `server/_core/storageProxy.ts` (Manus storage)
- Remove `client/src/_core/` directory (Manus auth hooks)
- Remove `client/src/components/ManusDialog.tsx`
- Remove `client/src/components/AIChatBox.tsx`
- Remove `client/public/__manus__/` directory
- Remove `template.json` (Manus template file)
- Remove `patches/` directory (wouter patch for Manus)
- Remove `server/auth.logout.test.ts` and `server/contact.submit.test.ts` (use Manus context)
- Remove references to `VITE_APP_ID`, `OAUTH_SERVER_URL`, `OWNER_OPEN_ID`, `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` from env
- Remove `streamdown` dependency
- Remove `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner` (Manus storage)
- Remove the analytics script from index.html (`VITE_ANALYTICS_ENDPOINT`)
- Remove `manus-cookie` sessionStorage references from main.tsx
- Remove `allowedHosts` with manus domains from vite.config.ts

### 2. Switch Database from MySQL to PostgreSQL:
- Replace `mysql2` with `pg` (or `postgres`) in package.json
- Update `drizzle.config.ts` to use `dialect: "postgresql"`
- Rewrite `drizzle/schema.ts` using PostgreSQL types (pgTable, serial, text, timestamp, etc.)
- Update `server/db.ts` to use `drizzle-orm/node-postgres` or `drizzle-orm/postgres-js`
- Replace `onDuplicateKeyUpdate` with PostgreSQL `onConflictDoUpdate`
- Update all migrations for PostgreSQL syntax

### 3. Logo/Branding Update:
The logo text "BisKora" should be styled as follows:
- "Bis" in dark brown color (#5C3317 or similar dark brown)
- "K" in pink color (#D4578A or similar pink)
- "ora" in dark brown color (#5C3317 or similar dark brown)
- Small pink cookie crumb decorations (dots) near the top-right of the text
- Tagline underneath: "YOUR TASTY BITES." in dark brown, smaller font
- The "B" should have a slightly playful/serif style, the "K" is tall and prominent
- Apply this styling in Navigation, Hero section, and Footer consistently
- Use a TM superscript (™) after "BisKora" like in the reference image

### 4. Home Page Auto-Selected:
- The "/" route should render the Hero page (which it already does)
- Make sure Navigation highlights "Home" as active when on "/"
- When user opens the website, they should always see the Home/Hero page first

### 5. Admin Login & Dashboard:
Add a complete admin system:
- Add "Admin Login" button/link in the Navigation bar
- Route: `/admin/login` - Simple login form (email + password)
- Route: `/admin/dashboard` - Protected admin dashboard
- Admin credentials stored in database (hashed password with bcrypt)
- JWT-based session management (stored in httpOnly cookie)
- Admin Dashboard features:
  - View all contact inquiries/orders with status management
  - Products/Ingredients management (add, edit, mark as out-of-stock)
  - Simple analytics (total orders, new orders count)
- Create a `products` table in the database schema with fields:
  - id, name, description, category, price, highlights (text array or JSON), inStock (boolean), createdAt, updatedAt
- Create an `admin_users` table:
  - id, email, passwordHash, name, role, createdAt, updatedAt
- Seed a default admin user (email: admin@biskora.com, password: biskora2024)
- tRPC routes for admin:
  - `admin.login` (public) - authenticate and set JWT cookie
  - `admin.me` (protected) - get current admin user
  - `admin.logout` (protected) - clear cookie
  - `admin.getInquiries` (protected) - list all contact inquiries
  - `admin.updateInquiryStatus` (protected) - update inquiry status
  - `admin.getProducts` (protected) - list all products
  - `admin.createProduct` (protected) - add new product
  - `admin.updateProduct` (protected) - edit product (including stock status)
  - `admin.deleteProduct` (protected) - remove product
- Products page should fetch from the database (public route) and show "Out of Stock" badge

### 6. Deployment Ready for Vercel/Render/Railway:
- Add proper `Dockerfile` for containerized deployment
- Add `render.yaml` for Render deployment
- Ensure `pnpm build` and `pnpm start` work correctly
- Environment variables needed:
  - `DATABASE_URL` - PostgreSQL connection string
  - `JWT_SECRET` - Secret for JWT signing
  - `PORT` - Server port (default 3000)
- Remove the `pnpm.patchedDependencies` section (wouter patch)
- Make sure the build output structure works: `dist/index.js` for server, `dist/public/` for static files
- The server should serve static files in production and handle SPA routing (already does this)

### 7. Clean up package.json:
- Remove unused Manus dependencies
- Keep all UI/frontend dependencies that are actually used
- Add `bcryptjs` for password hashing
- Add `pg` or `postgres` for PostgreSQL
- Remove `mysql2`
- Remove `vite-plugin-manus-runtime`
- Remove `@builder.io/vite-plugin-jsx-loc`
- Keep the `wouter` package but remove the patch

### 8. File Structure (final):
```
biskora-project/
├── client/
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       ├── const.ts (simplified, no Manus OAuth)
│       ├── lib/
│       │   ├── trpc.ts
│       │   └── utils.ts
│       ├── hooks/
│       │   └── useMobile.tsx
│       ├── contexts/
│       │   └── ThemeContext.tsx
│       ├── components/
│       │   ├── Navigation.tsx (with BisKora logo + Admin Login)
│       │   ├── Footer.tsx (with BisKora logo)
│       │   ├── ErrorBoundary.tsx
│       │   └── ui/ (keep all shadcn components)
│       └── pages/
│           ├── Hero.tsx (with BisKora logo)
│           ├── Products.tsx (fetches from DB, shows stock status)
│           ├── About.tsx
│           ├── Services.tsx
│           ├── Contact.tsx
│           ├── NotFound.tsx
│           ├── AdminLogin.tsx (new)
│           └── AdminDashboard.tsx (new)
├── server/
│   ├── index.ts (simplified server entry)
│   ├── db.ts (PostgreSQL)
│   ├── routers.ts (all tRPC routes including admin)
│   ├── auth.ts (JWT auth utilities)
│   └── seed.ts (seed admin user)
├── drizzle/
│   ├── schema.ts (PostgreSQL schema)
│   ├── migrations/ (PostgreSQL migrations)
│   └── relations.ts
├── shared/
│   ├── const.ts (simplified)
│   └── types.ts
├── .env.example
├── .gitignore
├── Dockerfile
├── render.yaml
├── drizzle.config.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md (deployment instructions)
```

## Important Notes:
- DO NOT include any file or code that references Manus, manus.computer, or Manus OAuth
- The website must work standalone with just a PostgreSQL database
- All images in the current site are emoji-based or CSS-based (no external image files to worry about)
- Keep all the existing page content (Products, About, Services, Contact) intact
- The Products page should be updated to fetch from the database instead of hardcoded data
- Make sure `pnpm install && pnpm build && pnpm start` works without errors
- The admin dashboard should be clean and functional with Tailwind + shadcn components
