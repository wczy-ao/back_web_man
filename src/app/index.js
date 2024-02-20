const Koa = require("koa");
const userRouter = require("../router/user.router");
const authRouter = require("../router/auth.router");
const errorHandle = require('./errorHandle')
const { bodyParser } = require("@koa/bodyparser");
const useRouters = require('../router/index')


const app = new Koa();

app.use(bodyParser());
useRouters(app)
app.on("error", errorHandle);

module.exports = app;
