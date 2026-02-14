import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Friendly error messages for common backend/Supabase errors.
 * Keys are matched case-insensitively against the raw error message.
 */
const ERROR_MAP: [RegExp, string][] = [
  [/rate limit/i,                 "Too many attempts. Please wait a few minutes and try again."],
  [/email not confirmed/i,       "Please check your inbox and verify your email before logging in."],
  [/invalid login credentials/i, "Incorrect email or password. Please try again."],
  [/invalid credentials/i,       "Incorrect email or password. Please try again."],
  [/email already in use/i,      "An account with this email already exists. Try logging in instead."],
  [/already registered/i,        "An account with this email already exists. Try logging in instead."],
  [/username already exists/i,   "An account with this email already exists. Try logging in instead."],
  [/password.*at least/i,        "Password must be at least 8 characters long."],
  [/invalid email/i,             "Please enter a valid email address."],
  [/user not found/i,            "No account found with that email. Please sign up first."],
  [/session retrieval failed/i,  "Something went wrong. Please try logging in again."],
  [/network/i,                   "Network error. Please check your internet connection."],
  [/fetch failed/i,              "Could not reach the server. Please check your connection and try again."],
  [/ECONNREFUSED/i,              "Could not reach the server. Please try again later."],
];

/**
 * Extracts a clean, user-friendly error message from any error object.
 * Works with graphql-request ClientError, NestJS HTTP exceptions, and plain errors.
 */
export function getErrorMessage(error: unknown): string {
  const raw = extractRawMessage(error);
  return mapToFriendly(raw);
}

/**
 * Digs into the error object to find the most specific message string.
 */
function extractRawMessage(error: unknown): string {
  if (!error) return "An unexpected error occurred.";

  // graphql-request ClientError: error.response.errors[0].message
  const gqlErrors = (error as any)?.response?.errors;
  if (Array.isArray(gqlErrors) && gqlErrors.length > 0 && gqlErrors[0]?.message) {
    return gqlErrors[0].message;
  }

  // Plain Error with message
  const msg = (error as any)?.message;
  if (typeof msg === "string" && msg.length > 0) {
    return msg;
  }

  // String error
  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred.";
}

/**
 * Maps a raw error string to a user-friendly message using the ERROR_MAP.
 * Falls back to the raw message if no mapping matches, cleaning up technical prefixes.
 */
function mapToFriendly(raw: string): string {
  for (const [pattern, friendly] of ERROR_MAP) {
    if (pattern.test(raw)) {
      return friendly;
    }
  }

  // Fallback: strip common technical prefixes for a cleaner display
  const cleaned = raw
    .replace(/^(Unauthorized|Conflict|BadRequest|Bad Request|Forbidden|Internal Server Error):\s*/i, "")
    .replace(/^GraphQL error:\s*/i, "")
    .trim();

  return cleaned || "An unexpected error occurred. Please try again.";
}
