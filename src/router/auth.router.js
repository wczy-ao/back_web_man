const Router = require("koa-router");
const {login} = require("../controller/auth.controller")
const { verifyLogin ,verifyAuth} = require("../middleware/auth.middleware");
const userRouter = new Router();

userRouter.post("/login", verifyLogin,login);
userRouter.get("/test", verifyAuth);

module.exports = userRouter;
