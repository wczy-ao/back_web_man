const Koa = require("koa");
const userRouter = require("../router/user.router");
const authRouter = require("../router/auth.router");
const errorHandle = require('./errorHandle')
const { bodyParser } = require("@koa/bodyparser");
const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.on("error", errorHandle);

module.exports = app;
