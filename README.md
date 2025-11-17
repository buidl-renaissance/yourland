This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18+ and Yarn
- SQLite (via `better-sqlite3`)

### Database Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Set up the database:**
   ```bash
   # Generate migration files from schema
   yarn db:generate
   
   # Push schema to database (creates tables)
   yarn db:push
   ```

   The database file will be created at `./data/yourland.db` (or the path specified in `DATABASE_URL`).

3. **Optional: View database in Drizzle Studio:**
   ```bash
   yarn db:studio
   ```
   This opens a web interface at `http://localhost:4983` to browse and edit your database.

### Running the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

### Database Configuration

The database uses SQLite with Drizzle ORM. The database file location can be configured via the `DATABASE_URL` environment variable (defaults to `./data/yourland.db`).

**Schema files:** `src/server/schema/`
- `accounts.ts` - User accounts (ephemeral and permanent)
- `referrals.ts` - Referral relationships and milestones
- `landClaims.ts` - Land claim records

**Database scripts:**
- `yarn db:generate` - Generate migration files from schema changes
- `yarn db:push` - Push schema changes directly to database (development)
- `yarn db:studio` - Open Drizzle Studio to browse/edit database

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
