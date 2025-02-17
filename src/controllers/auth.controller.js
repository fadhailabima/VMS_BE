const authService = require("../services/authService");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const { accessToken, refreshToken } = await authService.login(
      identifier,
      password
    );
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const { id, email, username, role } = decodedAccessToken;

    res.status(200).json({
      user: { id, email, username, role },
      tokens: { accessToken, refreshToken },
      message: "Login berhasil",
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Bearer token is required in Authorization header");
    }

    const accessToken = authHeader.split(" ")[1];

    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const userId = decodedAccessToken.id;

    await authService.logout(userId);

    res.status(200).json({ message: "Berhasil Logout" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  const userData = req.body;

  try {
    const { accessToken, refreshToken } = await authService.register(userData);
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const { id, email, username, role } = decodedAccessToken;

    res.status(201).json({
      user: { id, email, username, role },
      tokens: { accessToken, refreshToken },
      message: "Register berhasil",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  refreshAccessToken,
  logout,
  register,
};
