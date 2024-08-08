// src/types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      isAdmin?: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    isAdmin?: boolean;
  }
}
