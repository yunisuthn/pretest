const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    _id: {type:Number, required:true},
    nom: { type: String, required: true},
    email: { type: String, required: true},
    num: { type: Number, required: true },
    password: { type: String, required: true },
    argent: mongoose.Decimal128,
},
{
    timestamps: true
}
);

module.exports = mongoose.model('banque', UserSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);