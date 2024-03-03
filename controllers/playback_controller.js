const db = require('../config/db')
const { executeQuery, executeInsert } = require('../config/db')


async function updatePlayback(req, res, next){
    try{
        console.log(req.user.email)
        const email = req.user.email
        if(req.body.contentId && req.body.position){
            console.log('updatePlayback request -', req.body)
            let query =  "SELECT * FROM playback where email = '"+email+"' and  content_id = '"+req.body.contentId+"'";
            const result = await executeQuery(query);
            if(result.length>0){
                console.log(`Existing elements ${result[0].contents} for email ${req.user.email}`);
                const updateValues = { param1: email, param2: req.body.contentId, param3: req.body.position };
                console.log(updateValues)
                let updateQuery = "Update playback set position = @param3 where email = @param1 and content_id = @param2"
                let updateResult = await executeInsert(updateQuery,updateValues);
                if(updateResult){
                    res.send("PlayBack updated")
                }else{
                    res.send("-1")
                }
            }else{
                console.log('Going to insert' + req.user.email +' --- '+ req.body)
                const email = req.user.email
                const insertValues = { param1: email, param2: req.body.contentId, param3: req.body.position };
                console.log(insertValues)
                let insertQuery = "insert into playback (email, content_id, position) values (@param1, @param2, @param3)"
                let insertResult = await executeInsert(insertQuery,insertValues);
                if(insertResult){
                    res.send("Playback inserted")
                }else{
                    res.send("-1")
                }
            }
        }else{
            res.send("Invalid request")
        }
    }catch(err){
        console.error('updatePlayback function error:', err);
        next(err)
    }
}

async function getPlayback(req, res, next){
    try{
        console.log(req.user)
        let query =  "SELECT content_id, position  FROM playback where email = '"+req.user.email+"'";
        const result = await executeQuery(query);
        console.log("query result"+result)
        res.send(result)
    }catch(err){
        console.error('getMySubscription function error:', err);
        next(err)
    }
}

async function removePlayback(req, res, next){
    try{
        if(req.body.contentId){
            const email = req.user.email
            let query =  "SELECT * FROM playback where email = '"+email+"' and  content_id = '"+req.body.contentId+"'";
            const result = await executeQuery(query);
            if(result.length>0){ 
                let query =  "DELETE FROM playback where email = '"+email+"' and  content_id = '"+req.body.contentId+"'";
                await executeQuery(query);
                res.send("Playback updated")
            } else {
                res.send(" No record found")
            }
        }else{
            res.send("Invalid request")
        }
    }catch(err){
        console.error('getMySubscription function error:', err);
        next(err)
    }
}
module.exports = {
    getPlayback,
    updatePlayback,
    removePlayback
  };