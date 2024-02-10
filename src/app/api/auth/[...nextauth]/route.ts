import Credentials from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { unique, password } = credentials as Record<
          "unique" | "password",
          string
        >;
        let finder = parseInt(unique);
        if (finder) {
          return gateKeeper(password, finder, "scholarId");
        } else {
          return gateKeeper(password, unique, "email");
        }
      },
    }),
  ],
};

const gateKeeper = async (
  password: string,
  unique: string | number,
  field: string | number
): Promise<{ id: string; name: string, email: string } | null> => {
  let student;
  if (field === "email") {
    student = await prisma.student.findUnique({
      where: {
        email: unique as string
      }
    })
  } else {
    student = await prisma.student.findUnique({
      where: {
        scholarId: unique as number
      }
    })
  }
  if (student) {
    const isReal = await bcrypt.compare(password, student.password);
    if (isReal)
      return {
        id: "",
        name: student.name,
        email: student.email
      };
  }
  return null;
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
