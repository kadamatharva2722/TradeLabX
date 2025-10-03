const mongoose = require('mongoose');

const TradeSchema=new mongoose.Schema({
    symbol:{
        type:String,
    },
    entry:{
        type:Number,
    },
    exit:{
        type:Number,
    },
    date:{
        type:String,
    },
    strategy:{
        type:String,
    },
    qty:{
        type:Number,
    },
    textArea:{
        type:String,
    },
    insertedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});

const tradeModel=mongoose.model('trade', TradeSchema);

module.exports=tradeModel
