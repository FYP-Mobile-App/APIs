const sequelize = require('./utils/database')
	
const User = require('./models/user')

sequelize.sync()

sequelize.sync({force:true})
