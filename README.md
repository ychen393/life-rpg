# Life RPG · 人生技能书

Life RPG v0.1 turns learning, career, health, hobbies and life exploration into a personal RPG. The current release is a static, local-first React application: data is saved in the browser with `localStorage` and is not synchronized between devices.

## Local development

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run lint
npm run build
npm run preview
```

## Deploy to Vercel

### A. GitHub → Vercel (recommended)

1. Create a Git repository, commit this project, and push it to a GitHub repository.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Confirm these project settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Select **Deploy**.

Future pushes to the connected production branch will trigger new deployments automatically. `vercel.json` provides the SPA fallback required for direct visits and refreshes on `/skills`, `/quests`, and other client-side routes.

### B. Vercel CLI

After installing and signing in to the Vercel CLI:

```bash
vercel
vercel --prod
```

When prompted, use Vite as the framework, `npm run build` as the build command, and `dist` as the output directory.

## Privacy

Do not commit `.env` files, credentials, tokens, or private personal data. Version 0.1 stores progress only in the current browser. Clearing browser data or changing devices will not transfer progress automatically.
