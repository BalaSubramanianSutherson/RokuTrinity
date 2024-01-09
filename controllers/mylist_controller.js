const db = require('../config/db')
const { executeQuery, executeInsert } = require('../config/db')

async function getMyList(req, res, next){
    try{
        console.log(req.user)
        let query =  "SELECT * FROM mylist where email = '"+req.user.email+"'";
        const result = await executeQuery(query);
        console.log("query result"+result)
        res.send(result)
    }catch(err){
        console.error('getMyList function error:', err);
        next(err)
    }
}

async function updateMyList(req, res, next){
    try{
        console.log(req.user)
        console.log(req.body)
        let query =  "SELECT * FROM mylist where email = '"+req.user.email+"'";
        const result = await executeQuery(query);
        var contents = [];
        if(result.length>0){
            console.log(`Existing elements ${contents} for email ${req.user.email}`);
            if(req.body.add && req.body.add.length >1){
                contents.push(req.body.add)
                contents.push(result[0].contents.split(','))
            }else if(req.body.remove && req.body.remove.length >1){
                let elementToRemove = req.body.remove
                contents = result[0].contents.split(',')
                let indexToRemove = contents.indexOf(elementToRemove);
                console.log('indexToRemove -> '+ indexToRemove)
                if (indexToRemove !== -1) {
                    contents.splice(indexToRemove, 1);
                    console.log(`Removed element ${elementToRemove}. Updated array:`, contents);
                } else {
                    console.log(`Element ${elementToRemove} not found in the array.`);
                }
            }
            console.log('Going to update' + req.user.email +' --- '+ contents.toString())
            const email = req.user.email
            const updateValues = { param1: email, param2: contents.toString() };
            let updateQuery = "Update mylist set contents = @param2 where email = @param1"
            let updateResult = await executeInsert(updateQuery,updateValues);
            if(updateResult){
                res.send("Mylist updated")
            }else{
                res.send("-1")
            }
        }else{
            contents.push(req.body.add)
            console.log('Going to insert' + req.user.email +' --- '+ contents.toString())
            const email = req.user.email
            const insertValues = { param1: email, param2: contents.toString() };
            console.log(insertValues)
            let insertQuery = "insert into mylist (email, contents) values (@param1, @param2)"
            let insertResult = await executeInsert(insertQuery,insertValues);
            if(insertResult){
                res.send("Mylist updated")
            }else{
                res.send("-1")
            }
        }
        
    }catch(err){
        console.error('updateMyList function error:', err);
        next(err)
    }
}

module.exports = {
    getMyList,
    updateMyList
  };