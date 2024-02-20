const errorTypes = require("../constant/error.types");
const userService = require("../services/user.services")
const jwt = require("jsonwebtoken");
const md5password = require('../utils/passwordHandle');
const { PUBLIC_KEY } = require("../app/config");



async function verifyLogin(ctx, next) {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    // 发射错误事件去处理
    return ctx.app.emit("error", error, ctx);
  }
  
  // 3、判断用户是否存在的
  const result = await userService.getUserName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.CURRENT_USER_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 4、验证密码是否相等
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.CURRENT_USER_PASSWORD_ERROR);
    return ctx.app.emit('error', error, ctx);
  }

  ctx.user = user

  await next();
}


const verifyAuth = async (ctx, next) => {
  console.log('验证授权的middleware~');
  // 1、获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '');
  try {
    // 2、验证token(id/name/iat/exp)
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
};


module.exports = {
  verifyLogin,
  verifyAuth
};
