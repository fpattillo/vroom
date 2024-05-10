import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'

const bcrypt = require('bcrypt')

/*
* As we do not have backend server, the refresh token feature has not been incorporated into the template.
* Please refer https://next-auth.js.org/tutorials/refresh-token-rotation link for a reference.
 */

async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Correo electrónico", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        const user = await prisma.user.findUnique({
          where: { email: credentials.username },
        })
        console.log("user", user);
        /* const hashedPassword = await encryptPassword(credentials.password)
        console.log("hashedPassword", hashedPassword, user.password);
        if (hashedPassword === user.password) {
          return user
        } */
        if (user && await bcrypt.compare(credentials.password, user.password, encryptPassword)) {
          return user
        } else {
          // If you return null, it will trigger an error on the client side "Credentials Sign In"
          return null
        }
      }
    })
  ],
});
