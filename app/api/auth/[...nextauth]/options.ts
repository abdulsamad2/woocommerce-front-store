import loginUser from "@/actions/loginUser";

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const user = await loginUser({ ...credentials });
        if (user) {
          // Any object returned will be saved in `user` property of the JWT

          console.log("user", user);
          return { ...user };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("Invalid username or password");

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...user };
      }

      return token;
    },
    async session({ session, token }) {
      // Adding the token to the session object so it's available in the client
      if (token) {
        session.user = token;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/",
  },
};
