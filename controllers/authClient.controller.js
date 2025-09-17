const { sendErrorResponse } = require("../helpers/send.error.response");
const Client = require("../models/client");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const config = require("config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return sendErrorResponse(
        { message: "Email yoki parol noto'g'ri" },
        res,
        401
      );
    }
    const verifyPassword = await bcrypt.compare(password, client.password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Email yoki parol noto'g'ri" },
        res,
        401
      );
    }
    const payload = {
      id: client.id,
      email: client.email,
    };
    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    client.token = hashedRefreshToken;
    await client.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Client logged in",
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
    const client = await Client.findByPk(verifiedRefreshToken.id);
    client.token = null;
    await client.save();

    res.clearCookie("refreshToken");
    res.send({
      message: "Client logged out",
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

    const client = await Client.findByPk(verifiedRefreshToken.id);

    const compareRefreshToken = await bcrypt.compare(
      refreshToken,
      client.token
    );

    if (!compareRefreshToken) {
      return sendErrorResponse(
        { message: "Refresh token noto'g'ri" },
        res,
        400
      );
    }

    const payload = {
      id: client.id,
      email: client.email,
    };
    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    client.token = hashedRefreshToken;
    await client.save();

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
      phone_number,
      address,
      email,
      passport_ser,
      passport_number,
      password,
      confirm_password,
    } = req.body;

    const isHasClient = await Client.findOne({ where: { email } });
    if (isHasClient) {
      return sendErrorResponse({ message: "Bunday mijoz mavjud!" }, res, 403);
    }

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 8);
    const newClient = await Client.create({
      first_name,
      last_name,
      phone_number,
      address,
      email,
      passport_ser,
      passport_number,
      password: hashed_password,
    });
    res.status(201).json({ message: "New Client added", data: newClient });
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
