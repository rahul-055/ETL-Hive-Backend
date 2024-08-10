// const jwt = require('jsonwebtoken');
// const DB = require('./db');
// const config = require('../config/db');


// function verifyToken(req, res, next) {
//     const bearerToken = req.headers['authorization'];
//     jwt.verify(bearerToken, config.jwtSecret, (err, data) => {
//         if (err) res.sendStatus(403);
//         else {
//             const project = {
//                 createdAt: 0,
//                 updatedAt: 0,
//             }
//             DB.GetOneDocument('users', { _id: data.userId }, project, {}, async function (err, result) {
//                 if (err) res.sendStatus(400);
//                 else {
//                     if (result) {
//                         req.ID = result._id;
//                         req.userInfo = result;
//                         next();
//                     } else {
//                         res.sendStatus(403);
//                     }
//                 }
//             })
//         }
//     })
// }

// module.exports = verifyToken;