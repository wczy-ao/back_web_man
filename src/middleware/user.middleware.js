const errorTypes = require("../constant/error.types");
const userService = require("../services/user.services")

async function verifyUser(ctx, next) {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    // 发射错误事件去处理
    return ctx.app.emit("error", error, ctx);
  }
  // 3、判断用户名是否是被注册过，是否重复注册
  const result = await userService.getUserName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  // 4、等待用户名检测是否重复完成后，执行handlePassword中间件
  await next();
}

module.exports = {
  verifyUser,
};
