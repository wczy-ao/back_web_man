const Koa = require("koa");
const userRouter = require("../router/user.router");
const errorHandle = require('./errorHandle')
const { bodyParser } = require("@koa/bodyparser");
const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.on("error", errorHandle);

module.exports = app;
