const bcrypt = require("bcrypt");

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword
  } catch (error) {
    return error;
  }
};

export const verifyPassword = async (
  password: string,
  savedPassword: string
) => {
  try {
    const match = await bcrypt.compare(password, savedPassword);
    if (match) {
      return true;
    } else {
      return false;
    }
    return match;
  } catch (error) {
    return error;
  }
};

