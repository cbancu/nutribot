const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({ 
    name        : { type : String, required : true}, 
    category    : { type : String, required : true}, 
    category_id : { type : Number, required : true}, 
    calories    : { type:Number, required : true },
    proteins    : { type:Number, required : true },
    lipids      : { type:Number, required : true },
    carbs       : { type:Number, required : true },
    fibers      : { type:Number, required : true }
});

productSchema.index({name : 1, category_id :1}, {unique : false});


var Product = mongoose.model('Product', productSchema);

module.exports = Product;