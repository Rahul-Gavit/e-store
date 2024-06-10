import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        // Custom authentication logic
        const { email, password } = credentials;

        try {
          // Make a POST request to your external API for authentication
          const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            // If authentication is successful, return user data
            const user = await response.json();
            console.log(user);
            return Promise.resolve(user);
          } else {
            // If authentication fails, return null
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // JWT mein sirf chahiye fields ko add karna
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.userId = user.userId;
        token.address = user.address.default;
      }
      // Unwanted fields ko exclude karna
      return token;
    },

    async session({ session, token }) {
      // Session mein data ko set karna
      delete token.sub;
      delete token.exp;
      delete token.jti;
      delete token.iat;
      session.user = token;
      return session;
    },
  },

  // pages: {
  //   signIn: "/api/login",
  // signOut: '/auth/signout',
  // error: '/auth/error',
  // verifyRequest: '/auth/verify-request',
  // newUser: '/auth/new-user'
  // },
});
