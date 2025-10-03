const express=require('express');
const app=express();
const {connectToMongoDB}=require('./connect');
const cors=require('cors');
const path=require('path');
const cookieParser = require('cookie-parser');
const port=3000;

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
connectToMongoDB('mongodb://127.0.0.1:27017/TradeData');

//Routes
app.use('/', userRouter);
app.use('/trade', tradeRouter);

app.listen(port, ()=>{
    console.log(`server started at port: ${port}`);
})