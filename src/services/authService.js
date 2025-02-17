const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  getUserByEmailOrUsername,
  updateUserTokens,
  createUser,
} = require("../models/User");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id_user,
      email: user.email,
      username: user.username,
      role: user.id_role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id_user,
      email: user.email,
      username: user.username,
      role: user.id_role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
};

const login = async (identifier, password) => {
  const user = await getUserByEmailOrUsername(identifier);
  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  // Assuming user levels are managed through user roles
  if (![1, 2, 3, 4].includes(user.id_role)) {
    throw new Error("User role not allowed to login");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await updateUserTokens(user.id_user, accessToken, refreshToken);

  return { accessToken, refreshToken };
};

const register = async (data) => {
  const user = await getUserByEmailOrUsername(data.email);
  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await createUser({
    ...data,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);
  await updateUserTokens(newUser.id_user, accessToken, refreshToken);

  return { accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await getUserById(payload.id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(user);
    await updateUserTokens(user.id_user, newAccessToken, refreshToken);

    return newAccessToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

const logout = async (userId) => {
  await updateUserTokens(userId, null, null);
};

module.exports = {
  login,
  refreshAccessToken,
  logout,
  register,
};
