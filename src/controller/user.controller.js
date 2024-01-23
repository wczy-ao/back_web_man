const service = require("../services/user.services")
class UserController {
    async create(ctx,next) {
        const userinfo = ctx.request.body
        // 参数判断
        // 数据库处理
        const result = await service.create(userinfo)
        //返回
        ctx.body = result
    }
}

module.exports = new UserController()