// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string; // Unique identifier for the user
  name: string; // User's full name
  email: string; // User's email address
  password: string; // Hashed password
  lock_until: string | null; // ISO string for when the account is locked until (null if not locked)
  failed_login_attempts: number; // Number of failed login attempts
  created_at: Date; // When the account was created
  updated_at: Date; // Last time the user’s data was updated
};
