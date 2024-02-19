const errorTypes = require("../constant/error.types");
const userService = require("../services/user.services")
const md5password = require('../utils/passwordHandle');


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

  ctx.body = 'dddd'

  // await next();
}


module.exports = {
  verifyLogin
};
