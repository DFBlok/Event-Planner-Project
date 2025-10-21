import crypto from "crypto";

export const generatePassword = () => {
  return crypto.randomBytes(8).toString("hex"); // 16-char secure password
};
