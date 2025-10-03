const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const UserModel = require('../Models/user');
const tradeModel=require('../Models/trade');

router.post('/formData', async (req,res)=>{

    const {symbol, entry, exit, date, strategy, qty, textArea, insertedBy}=req.body;

    await tradeModel.create({
        symbol,
        entry,
        exit,
        date,
        strategy,
        qty,
        textArea,
        insertedBy,
    });
    const tradeCalc=(Number(exit)-Number(entry))*Number(qty);
    const userFound=await UserModel.findOne({_id:insertedBy});
    const userUpdate=await UserModel.findByIdAndUpdate({_id:insertedBy}, {amount:userFound.amount+tradeCalc, profit:userFound.profit+tradeCalc});
    const populatedTrade = await tradeModel.findById(insertedBy).populate('insertedBy');
    console.log(userUpdate);
    res.json({populatedTrade:populatedTrade, userUpdate:userUpdate});
});

router.get('/getTradeData/:id', async(req,res)=>{
    const id=req.params.id;
    const userFind=await UserModel.findOne({_id:id});
    const tradeData= await tradeModel.find({insertedBy: id});
    if(!tradeData) res.json({message:'Empty'});

    res.json({tradeData:tradeData, userFind:userFind});
});

router.get('/getFilterTrade', async (req,res)=>{
    try {
    const { user, assets, strategy } = req.query;

    const query = {
      insertedBy: new mongoose.Types.ObjectId(user)  // always required
    };

    if (assets) query.symbol = { $regex: new RegExp(`^${assets}$`, "i") };
    if (strategy) query.strategy = { $regex: new RegExp(`^${strategy}$`, "i") };

    const filterData = await tradeModel.find(query);
    res.json({ filterData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
})

module.exports=router
