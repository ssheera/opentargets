This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Inter](https://vercel.com/font).

## Technical Test

I chose Next.js for this project because of my familiarity with it and its integration with Apollo Client

Since [layout.tsx](src/app/layout.tsx) uses the server, I placed all ApolloClient related initialisation inside of [providers.tsx](src/app/providers.tsx)

The entire page exists inside of [page.tsx]('src/app/(index)/page.tsx') and uses components:
- [DiseaseTable.tsx](src/app/components/DiseaseTable.tsx) for querying the database and rendering the table
- [ErrorComponent.tsx](src/app/components/ErrorComponent.tsx) for displaying any errors (e.g. connectivity)
- [GraphMenu.tsx](src/app/components/GraphMenu.tsx) for the two tabs allowing you to select between bar chart and radar chart 

I've used useMemo to optimise any calculations, and I've also included the feature where you can simply change the disease id in the code and the displayed disease will update

You'll find everything related to GraphQL inside of [queries.ts](src/app/lib/queries.ts)