import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: { scope: "read:user user:email repo" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.githubId = profile?.id?.toString();
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.githubId = token.githubId;
      return session;
    },
    async signIn({ profile }: any) {
      if (!profile) return true;
      try {
        await prisma.user.upsert({
          where: { githubId: profile.id.toString() },
          update: {
            name: profile.name ?? profile.login,
            email: profile.email,
            image: profile.avatar_url,
          },
          create: {
            githubId: profile.id.toString(),
            name: profile.name ?? profile.login,
            email: profile.email,
            image: profile.avatar_url,
          },
        });
      } catch (e) {
        console.error("DB upsert failed:", e);
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};