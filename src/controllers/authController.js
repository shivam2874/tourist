export const register = async (req, res, next) => {
  res.send("hello from Register");
};

export const login = async (req, res, next) => {
  res.send("Hello from Login");
};

export const logout = async (req, res, next) => {
  res.send("Heelo from Logout");
};

export const refreshToken = async (req, res, next) => {
  res.send("Heelo from RefreshToken");
};
