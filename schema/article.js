const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    _id: {type:Number, required:true},
    user: {type:Number, required:true},
    nom: { type: String, required: true},
    prix: { type: Number, required: true },
    description: { type: String, required: true },
    photo_profil:String
},
{
    timestamps: true
}
);

module.exports = mongoose.model('article', UserSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);