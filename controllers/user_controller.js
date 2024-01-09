const jwt = require("jsonwebtoken");
const db = require('../config/db')
const { executeQuery, executeInsert } = require('../config/db')

  async function login (req, res, next){
    try {
      const email = req.body.email;
      const password = req.body.password;
      let query =  "SELECT * FROM users where email = '"+email+"' AND password ='"+password+"'";
      const result = await executeQuery(query);
      console.log("query result"+result)
      if(result && result.length == 1){
        let token = jwt.sign(
          { username: "name", email: email },
          "rokusecretkey",
          { expiresIn: "1h" }
        );
        res.send({ email: result[0].email, token: token})
      }else{
        res.send({messag: "Invalid credentials"})
      }
    } catch (err) {
      console.error('login function error:', err);
      next(err)
    }
  }


  async function signup(req, res, next){
    try{
      console.log(req.body)
      const email = req.body.email
      const name = req.body.name
      const password = req.body.password
      const insertValues = { param1: email, param2: name, param3: password };
      console.log(insertValues)
      let query = "insert into users (email, name, password) values (@param1, @param2, @param3)"
      let result = await executeInsert(query,insertValues);
      if(result){
        let token = jwt.sign(
          { username: name, email: email },
          "rokusecretkey",
          { expiresIn: "1h" }
        );
        res.send({ name: name, token: token})
      }else{
        res.send("-1")
      }
      
    }catch (err) {
      console.error('signup function error:', err);
      next(err)
    }
  }

  module.exports = {
    login,
    signup
  };