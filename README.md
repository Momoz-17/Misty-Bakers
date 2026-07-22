# 🎂 The Misty Bakers — MERN + TypeScript + Tailwind + Firebase

A full-stack website for **The Misty Bakers**, a homemade cake shop. Customers
can browse cakes, sign in with Google, add cakes to a cart, and place orders.
Admins get a dashboard to manage the cake menu and update order status.

Instagram: [@mistybakers_66](https://www.instagram.com/mistybakers_66/)

## Stack
- **Frontend:** React + TypeScript (Vite), Tailwind CSS, Framer Motion (animations), React Router, Firebase Auth (Google Sign-In)
- **Backend:** Node.js + Express + TypeScript, MongoDB (Mongoose), Firebase Admin SDK (token verification)
- **Auth:** Google Sign-In only, via Firebase Authentication. Backend verifies the Firebase ID token on every protected request — no separate passwords to manage.

## Project structure
```
misty-bakers/
  backend/     Express + TypeScript API
  frontend/    React + TypeScript + Tailwind app
```

## 1. Firebase setup
1. Go to the [Firebase console](https://console.firebase.google.com/) → create a project.
2. **Authentication → Sign-in method → enable Google.**
3. **Project settings → General → Your apps → Add a Web app.** Copy the config
   values into `frontend/.env` (see below).
4. **Project settings → Service accounts → Generate new private key.** This
   downloads a JSON file — use its `project_id`, `client_email`, and
   `private_key` values in `backend/.env`.

## 2. Backend setup
```bash
cd backend
cp .env.example .env      # fill in MONGO_URI + Firebase Admin credentials
npm install
npm run dev                # starts on http://localhost:5000
```

You'll need a MongoDB instance — either local (`mongodb://localhost:27017/misty-bakers`)
or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

## 3. Frontend setup
```bash
cd frontend
cp .env.example .env       # fill in Firebase web config + VITE_API_URL
npm install
npm run dev                 # starts on http://localhost:5173
```

## 4. Making yourself an admin
By default every new Google sign-in becomes a `customer`. To promote an
account to `admin` (so you can access `/admin`), open your MongoDB `users`
collection and change that user's `role` field to `"admin"` — either via
MongoDB Compass, Atlas UI, or the mongo shell:

```js
db.users.updateOne({ email: "your@gmail.com" }, { $set: { role: "admin" } })
```

## 5. Adding your first cakes
Once you're an admin, log in on the site → your avatar menu → **Dashboard**
→ **Manage Cakes** → **Add Cake**. Paste an image URL (e.g. an Unsplash link,
or your own hosted image) along with name, price, category and weight
options.

## Key features
- 🍰 **Home page** — hero section, "About the baker" story, feature highlights, Instagram + contact links.
- 🔐 **Google Sign-In (Gmail)** via Firebase — no passwords, one-tap login/signup.
- ✨ **Animated auth modal** — the Login/Sign Up button in the navbar morphs into the auth panel using a Framer Motion shared-layout animation, then smoothly tabs between Login and Sign Up.
- 🛒 **Cart & checkout** — add cakes with a chosen weight, adjust quantities, place an order with delivery address/date/phone.
- 📦 **My Orders** — customers can track the status of their orders.
- 🛠️ **Admin dashboard** — overview stats, full CRUD for the cake menu, and order status management (pending → confirmed → preparing → out for delivery → delivered).
- 📱 **Fully responsive** — mobile hamburger nav, fluid grid layouts, and touch-friendly tap targets for phone / tablet / laptop.
- 🎬 **Animations throughout** — scroll-reveal sections on the home page, hover-lift product cards, staggered menu grid, spring-based modals, and page-load transitions via Framer Motion.

## Notes & next steps
- This is a solid, working starter — not a production deployment. Before going live you'd want to: add image upload (e.g. Cloudinary/Firebase Storage) instead of pasting URLs, add payment integration (Razorpay/Stripe), add email/SMS order notifications, and deploy (frontend → Vercel/Netlify, backend → Render/Railway, DB → MongoDB Atlas).
- `node_modules` are **not** included — run `npm install` in both `backend/` and `frontend/` before starting.
- Replace the Unsplash placeholder images in `Hero.tsx` and `Home.tsx` with real photos of your cakes whenever you have them.
