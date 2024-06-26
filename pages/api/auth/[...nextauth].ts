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
        const user = await prisma.user.findUnique({
          where: { email: credentials.username },
        })
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return user
        } else {
          // If you return null, it will trigger an error on the client side "Credentials Sign In"
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }: any) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })
      session.user.id = user.id
      session.user.theme = user.theme
      session.user.company = user.company
      session.user.role = user.role
      session.user.document_type = user.document_type
      session.user.subscription_type = user.subscription_type
      session.user.period = user.period
      session.user.amount = user.amount
      session.user.pandadoc = user.pandadoc
      session.user.currency = user.currency
      session.user.first_log_in = user.first_log_in
      return session
    }
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
