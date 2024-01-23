const config = require('./app/config')
require('./app/database')
const app = require('./app/index')
app.listen(config.APP_PORT, () => {
    console.log('服务开启～')
})