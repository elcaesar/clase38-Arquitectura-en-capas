const bcrypt = require('bcrypt')

const createHash = userpass => bcrypt.hashSync(userpass, bcrypt.genSaltSync(10))
const isValidPassword = (username, userpass) => bcrypt.compareSync(userpass, username.userpass)


module.exports = {
    createHash,
    isValidPassword,
}
