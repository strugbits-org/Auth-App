import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signin } from "../../../redux/actions/authActions.js";
import axios from "../../../helpers/axiosConfig.js";

export default NextAuth({
  // Configure authentication provider (credentials)
  secret: "process.env.SECRET",
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      // authorization logic
      async authorize(credentials) {
        try {
          const res = await axios.post("/auth/login", credentials);
          if (res.data.user) {
            console.log(res.data, "res");
            return Promise.resolve(res.data);
          }
        } catch (error) {
          return Promise.reject(
            error.response.data.message || error.message || "error"
          );
        }
      },
    }),
  ],
  // custom pages
  pages: {
    signIn: "/",
  },

  // callbacks
  callbacks: {
    // jwt callback for storing user info in token
    async jwt(token, user, account, profile, isNewUser) {
      if (token?.token?.user) {
        token.user = token.token.user;
      }
      return token;
    },
    // session callback for storing user info in session
    async session(session, token) {
      session.user = session.token.user;
      return session;
    },
  },
});
