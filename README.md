![rater_logo](https://i.imgur.com/Pzv1yq7.png)

### Technology

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- Requires Node 14 (or higher) + Yarn as the package manager
- It's hosted on [Vercel](https://vercel.com/)
- It uses a [MongoDB Atlas](https://www.mongodb.com/) instance via Vercel Integration
- Real Time Communication is handled via [Ably](https://ably.com/)
- [Imgur](https://imgur.com/)'s public API for hosting pictures

## Getting Started

#### Setup Environment Variables

```bash
# from the root
touch .env
```

These values are required to run locally, and must also be filled in the Vercel dashboard:

```
ABLY_API_KEY=
MONGODB_URI=
IMGUR_CLIENT_ID=
```

Eun the development server:

```bash
yarn dev
```

> Note: Imgur blocks localhost visit the app at 0.0.0.0 to bypass the Imgur block

Open [http://0.0.0.0:3000](http://0.0.0.0:3000) with your browser to see the result.
