const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema =new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:100,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    category:{
        type:String,
        required:true,
        enum: ['Electronics', 'Books', 'Clothing', 'Home', 'Sports',],
    },
    brand:{
        type:String,
        required:true,
        trim:true,
    },
    stock:{
        type:Number,
        required:true,
        min:0,
    },
    images:[
        {
            type:String,
            required:true,
        }
    ],
    reviews: [
        {
            user:{
                type: Schema.Types.ObjectId, 
                ref:'User',
                required:true
            },
            rating:{
                type:Number,
                required:true,
                min:1,
                max:5
            },
            comment:{
                type:String,
                required:true,
            },
            date:{
                type:Date,
                default:Date.now
            },
        },
    ],
    averageRating:{
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

productSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next()
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;