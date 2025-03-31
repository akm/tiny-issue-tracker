# sv

## Setup

```
npm install
```

```
cp .env.example .env

$EDITOR .env
```

Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in .env

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run db:up

npm run db:push

npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run db:up
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
