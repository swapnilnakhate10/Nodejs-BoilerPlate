
module.exports = {
    createUser : createUser
};

function createUser(req, res, next) {
    let username = req.body.username;
    if(username && username !== '') {
        next();
    } else {
        res.send({"message" : "Required field/s missing."});
    }
}