const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require('../service/authentication');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    createdAt:{
        type:Date,
    },
    profileImg:{
        type:String,
        default:'http://localhost:3000/assets/Profile.png',
    },
    amount:{
        type:Number,
        default:0,
    },
    profit:{
        type:Number,
        default:0,
    }
})

UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
    next();
});

UserSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest("hex");

    if (hashedPassword !== userProvidedHash) throw new Error('Incorrect password');

    const token = createTokenForUser(user);
    return token;
});


const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel
