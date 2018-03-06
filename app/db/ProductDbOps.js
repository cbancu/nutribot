const Product = require('./Product');
const DbErrorHandler = require('./DbErrorHandler')

class ProductDbOps { 

    static createNewProduct(blob,category, category_id /* blob : { name,calories, proteins, lipids, carbs, fibers } */) { 
        var prod = new Product({
            name        : blob.name,
            category    : category, 
            category_id : category_id,
            calories    : blob.calories, 
            proteins    : blob.proteins, 
            lipids      : blob.lipids, 
            carbs       : blob.carbs, 
            fibers      : blob.fibers}) ;
        
        return prod; 
    }

    static async insertManyProducts(blobArr, category, category_id/* array of : { name, calories, proteins, lipids, carbs, fibers } */) { 
        let prods = [];
        blobArr.forEach(blob => {
            const product = this.createNewProduct(blob, category, category_id);
            prods.push(product);
        });

        await Product.insertMany(prods, (error, docs) => { 
            if(error) {
                DbErrorHandler.handle(error);
            }
            else { 
                console.info('%d products were successfully stored.', docs.length);
            }
        });
    }
}

module.exports = ProductDbOps;