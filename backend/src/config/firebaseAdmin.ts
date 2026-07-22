import admin from "firebase-admin";

// Initialize Firebase Admin using service account credentials from env vars.
// This lets the backend verify the ID token that Firebase Auth (Google Sign-In)
// issues on the frontend.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export default admin;
