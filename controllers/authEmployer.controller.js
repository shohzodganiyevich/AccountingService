const { sendErrorResponse } = require("../helpers/send.error.response");
const Employer = require("../models/employer");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const config = require("config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employer = await Employer.findOne({ where: { email } });
    if (!employer) {
      return sendErrorResponse(
        { message: "Email yoki parol noto'g'ri" },
        res,
        401
      );
    }
    const verifyPassword = await bcrypt.compare(password, employer.password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Email yoki parol noto'g'ri" },
        res,
        401
      );
    }
    const payload = {
      id: employer.id,
      email: employer.email,
    };
    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    employer.token = hashedRefreshToken;
    await employer.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Employer logged in",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookie refresh token topilmadi" },
        res,
        400
      );
    }
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    const employer = await Employer.findByPk(verifiedRefreshToken.id);
    employer.token = null;
    await employer.save();

    res.clearCookie("refreshToken");
    res.send({
      message: "Employer logged out",
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookieda refresh token topilmadi" },
        res,
        400
      );
    }
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    const employer = await Employer.findByPk(verifiedRefreshToken.id);

    const compareRefreshToken = await bcrypt.compare(
      refreshToken,
      employer.token
    );

    if (!compareRefreshToken) {
      return sendErrorResponse(
        { message: "Refresh token noto'g'ri" },
        res,
        400
      );
    }

    const payload = {
      id: employer.id,
      email: employer.email,
    };
    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    employer.token = hashedRefreshToken;
    await employer.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Tokens refreshed",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      phone_number,
    } = req.body;

    const isHasEmployer = await Employer.findOne({ where: { email } });
    if (isHasEmployer) {
      return sendErrorResponse(
        { message: "Bunday employer mavjud!" },
        res,
        403
      );
    }

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 8);
    const newEmployer = await Employer.create({
      first_name,
      last_name,
      email,
      password: hashed_password,
      phone_number,
    });
    res.status(201).json({ message: "New Employer added", data: newEmployer });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
  register,
};
