const service = require("../services/user.services");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
class AuthController {
  async login(ctx, next) {
    const { name, password } = ctx.user;
    // 公私钥方式形成jwt
    const token = jwt.sign({ name, password }, PRIVATE_KEY, {
      expiresIn: 30 * 24 * 3600,
      algorithm: "RS256",
    });
    ctx.body = {
      name,
      token,
    };
  }
}

module.exports = new AuthController();
