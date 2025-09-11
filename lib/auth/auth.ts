import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@lib/prisma";

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
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 2 * 60 * 60, // 2 hours
    updateAge: 30 * 60, // 30 minutes
  },
  // Elastic Load Balancer safely sets the host header and ignores the incoming request headers
  trustHost: true,
  callbacks: {
    async jwt({ token, user, profile, account }) {
      // account is only available on the first call to the JWT function
      if (account?.provider) {
        const gcProfile = await prisma.profile.findUnique({
          where: {
            id: user.id,
          },
        });

        // update profile photo
        if (gcProfile !== null) {
          await prisma.profile.update({
            where: {
              id: user.id,
            },
            data: {
              avatarUrl: profile?.avatarUrl as string,
            },
          });
        }
      }

      return token;
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
