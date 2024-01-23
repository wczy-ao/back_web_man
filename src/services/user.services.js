const connections = require("../app/database")

class UserService {
    async create(user){
        const {name, password} = user
        try {
            const statement =  `INSERT INTO users (name,password) VALUES(?,?);`;
            const results = await connections.execute(statement, [name, password]);
            return results[0]
        } catch (error) {
            console.log(error)
        }
        
    }

    // 获取用户名称
  async getUserName(name) {
    try {
      const statement = `SELECT * FROM users WHERE name = ?`;
      const results = await connections.execute(statement, [name]);
      console.log(results)
      return results[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService()