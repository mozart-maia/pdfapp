import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import firebase from "firebase/app";
import "firebase/firestore";
import db from "../../../../firebase/initFirebase";

const firestore = db;

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  // adapter: FirebaseAdapter(firestore),
};

export default NextAuth(authOptions);
