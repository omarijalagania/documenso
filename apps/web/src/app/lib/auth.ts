/* eslint-disable @typescript-eslint/require-await */
import type { NextAuthOptions, RequestInternal, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    maxAge: 2 * 60 * 60, // Max age for the session, in seconds
  },

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',

      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(
        credentials: Record<'email' | 'password', string> | undefined,
        req: Pick<RequestInternal, 'body' | 'method' | 'headers' | 'query'>,
      ): Promise<User | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/login?email=${email}&password=${password}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          const user: User = (await res.json()) as User;
          if (res.ok && user) {
            user.id = 324324242; // Add the 'id' property to the 'user' object
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    jwt: async ({ token, user }) => {
      (await user) && (token.user = user);

      return token;
    },

    session: async ({ session, token }) => {
      session.user = {
        ...(token.user as {
          name?: string | null | undefined;
          email?: string | undefined; // Change the type of 'email' property to 'string | undefined'
          image?: string | null | undefined;
        }),
        id: 23423423432,
      };

      return session;
    },
  },
};
