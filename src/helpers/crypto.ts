import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.ENCRYPTION_KEY || "secret-key";

/**
 * Encrypt a message using AES encryption.
 * @param message - The message to encrypt.
 * @returns The encrypted message as a string.
 */
export function encryptMessage(message: string) {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
}

/**
 * Decrypt an encrypted message using AES decryption.
 * @param encryptedMessage - The encrypted message to decrypt.
 * @returns The decrypted message as a string.
 */
export function decryptMessage(encryptedMessage: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}