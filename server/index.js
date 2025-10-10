require('dotenv').config();
const express=require('express');
const app=express();
const {connectToMongoDB}=require('./connect');
const cors=require('cors');
const path=require('path');
const cookieParser = require('cookie-parser');
const port=process.env.PORT;

//Routes
const userRouter=require('./Routes/user');
const tradeRouter=require('./Routes/trade');
const { checkForAuthentication, checkForAuth } = require('./middleware/user');

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(cookieParser());
app.use(checkForAuthentication("token"));


//ConnectToMongoDB
connectToMongoDB(process.env.MongoURL);

//Routes
app.use('/', userRouter);
app.use('/trade', tradeRouter);

/*app.listen(port || 3000, ()=>{
    console.log(`server started at port: ${port}`);
})*/

module.exports=app;
