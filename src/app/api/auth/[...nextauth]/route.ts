import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/oauth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: "google",
              email: user.email,
              name: user.name,
              oauth_id: account.providerAccountId,
              avatar: user.image,
            }),
          });

          if (!response.ok) {
            console.error("Backend auth failed:", response.status);
            return false;
          }

          const json = await response.json();
          const data = json.data ?? json;

          user.id = data.user.id;
          user.username = data.user.username;
          user.email = data.user.email;
          user.role = data.user.role;
          user.backendToken = data.token;

          return true;
        } catch (error) {
          console.error("Failed to sync with backend:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email ?? "";
        token.image = user.image ?? "";
        token.role = user.role as "user" | "creator" | "admin";
        token.backendToken = user.backendToken ?? "";
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        username: token.username,
        email: token.email ?? "",
        image: token.image,
        role: token.role,
      };
      session.backendToken = token.backendToken;

      if (token.error) {
        session.error = token.error;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
