import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@lib/prisma";
import { logMessage } from "@lib/logger";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: "gcAccount", // signIn("my-provider") and will be part of the callback URL
      name: "GC Account", // optional, used on the default login page as the button text.
      type: "oidc",
      issuer: process.env.AUTH_PROVIDER,
      clientId: process.env.AUTH_CLIENT_ID,
      checks: ["pkce", "state"],
      client: { token_endpoint_auth_method: "none" },
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    },
  ],
  // When building the app use a random UUID as the token secret
  secret: process.env.AUTH_SECRET ?? crypto.randomUUID(),
  session: {
    strategy: "database",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 2 * 60 * 60, // 2 hours
    updateAge: 30 * 60, // 30 minutes
  },
  // Elastic Load Balancer safely sets the host header and ignores the incoming request headers
  trustHost: true,
  events: {
    async signIn({ profile, user }) {
      await prisma.profile
        .update({
          where: {
            id: user.id,
          },
          data: {
            avatarUrl: profile?.picture,
          },
        })
        .catch((e) => logMessage.error(e));
    },
  },
  callbacks: {
    async session(params) {
      const { session, user } = params;
      // Add info like 'role' to session object
      session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
      };
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
