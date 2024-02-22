const db = require('../config/db')
const { executeQuery, executeInsert } = require('../config/db')
const { v4: uuidv4 } = require('uuid');

async function getMySubscription(req, res, next){
    try{
        console.log(req.user)
        let query =  "SELECT order_id,transaction_id,expire_in  FROM subscription where email = '"+req.user.email+"'";
        const result = await executeQuery(query);
        console.log("query result"+result)
        res.send(result)
    }catch(err){
        console.error('getMySubscription function error:', err);
        next(err)
    }
}

async function updateMySubscription(req, res, next){
    try{
        console.log(req.user.email)
        const email = req.user.email
        if(req.body.orderId && req.body.transactionId && req.body.expireIn){
            const id = uuidv4();
            const insertValues = { param: id, param1: email, param2: req.body.orderId, param3: req.body.transactionId, param4: req.body.expireIn };
            console.log(insertValues)
            let insertQuery = "insert into subscription (id, email, order_id, transaction_id, expire_in) values (@param, @param1, @param2, @param3, @param4)"
            let insertResult = await executeInsert(insertQuery,insertValues);
            if(insertResult){
                res.send("MySubscription updated")
            }else{
                res.send("-1")
            }
        }else{
            res.send("Invalid request")
        }
    }catch(err){
        console.error('updateMySubscription function error:', err);
        next(err)
    }

}

module.exports = {
    getMySubscription,
    updateMySubscription
  };
