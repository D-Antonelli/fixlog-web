import NextAuth, {NextAuthResult} from "next-auth";
import {authConfig} from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import {sql} from "@vercel/postgres";
import type {User} from "./app/lib/definitions";
import bcrypt from "bcrypt";

// Maximum allowed failed login attempts
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME_MINUTES = 15;

async function incrementFailedAttempts(email: string) {
  try {
    await sql`UPDATE users SET failed_login_attempts = failed_login_attempts + 1 WHERE email = ${email}`;
  } catch (error) {
    console.error("Failed to increment login attempts:", error);
  }
}

async function resetFailedAttempts(email: string) {
  try {
    await sql`UPDATE users SET failed_login_attempts = 0 WHERE email = ${email}`;
  } catch (error) {
    console.error("Failed to reset login attempts:", error);
  }
}

async function lockUserAccount(email: string) {
  const lockUntil = new Date();
  lockUntil.setMinutes(lockUntil.getMinutes() + LOCK_TIME_MINUTES);

  try {
    // Convert Date to ISO string
    await sql`UPDATE users SET lock_until = ${lockUntil.toISOString()}, failed_login_attempts = 0 WHERE email = ${email}`;
  } catch (error) {
    console.error("Failed to lock account:", error);
  }
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const {auth, signIn, signOut} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: any) {
        const parsedCredentials = z.object({email: z.string().email(), password: z.string().min(6)}).safeParse(credentials);

        if (parsedCredentials.success) {
          const {email, password} = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) return null;

          // Check if the user has exceeded the max failed login attempts
          if (user.failed_login_attempts >= MAX_FAILED_ATTEMPTS) {
            await lockUserAccount(email);
            throw new Error("Too many failed attempts. Your account has been locked.");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            await resetFailedAttempts(email);
            return user;
          } else {
            await incrementFailedAttempts(email);

            if (user.failed_login_attempts + 1 >= MAX_FAILED_ATTEMPTS) {
              await lockUserAccount(email);
              throw new Error("Too many failed attempts. Your account has been locked.");
            }

            console.log("Invalid credentials");
            return null;
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
