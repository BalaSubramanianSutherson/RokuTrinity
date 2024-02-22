const express = require("express");
const app = express();
const cors = require("cors");
const auth = require('./middlewares/auth')


app.use(cors());
app.use(express.json());
app.use(auth)

const errorHandler = (err, req, res, next) =>{
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
}
app.use(errorHandler)

const userRouter = require('./routes/user_router');
const mylistRouter = require('./routes/mylist_router');
const contentRouter = require('./routes/content_router');
const subscriptionRouter = require('./routes/subscription_router');


app.get('/', (req, res) => {
    res.send('Welcome to my server!');
  });

app.use('/user', userRouter)
app.use('/mylist', mylistRouter)
app.use('/content', contentRouter)
app.use('/subscription', subscriptionRouter)

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });
