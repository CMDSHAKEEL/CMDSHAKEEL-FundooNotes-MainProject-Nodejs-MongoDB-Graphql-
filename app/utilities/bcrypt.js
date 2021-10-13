const bcrypt = require('bcrypt');
const saltRounds = 7;
class bcryptpass{
       hash = (details, callback) => {
        bcrypt.hash(details, saltRounds, function (error, hash) {
            if (error) {
                return callback(error, null);
            } else {
                return callback(null, hash);
            }
        })
    }
}
module.exports = new bcryptpass()