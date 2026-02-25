import { nextAuthConfig } from './../../../../lib/nextauth.config';
import NextAuth from "next-auth";


const nextHandler = NextAuth(nextAuthConfig);

export {nextHandler as GET, nextHandler as POST};
