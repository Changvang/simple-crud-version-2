import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PERSON = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullname: {type: String, required: true},
    address: {type: String},
    age: {type: Number, required: true}
}).pre('save', (next) => {
    console.log('SAVE PERSON');
    next();
});

export default mongoose.model('Person', PERSON);