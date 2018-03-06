const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({ 
    name        : { type : String, required : true, unique : true }, 
    category    : String,
    category_id : Number,
    calories    : { type:Number, required : true },
    proteins    : { type:Number, required : true },
    lipids      : { type:Number, required : true },
    carbs       : { type:Number, required : true },
    fibers      : { type:Number, required : true }
});


var Product = mongoose.model('Product', productSchema);

module.exports = Product;