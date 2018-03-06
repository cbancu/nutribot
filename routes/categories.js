const express = require('express');
const router = express.Router();
const CrawlCategories = require('../app/CrawlCategories');
const Categories = require('../app/Categories');
const ProductDbOps = require('../app/db/ProductDbOps');
const Promise = require('promise');


/* GET products for each category, serially */
router.get('/', async (req, res, next) => {
  const categories = Categories;

  let results = await Promise.all(
    categories.map( async (categ) => { 
      console.log("getting data for :  " + categ.name);
      await insertPerCategory(categ.name);
      console.log("data inserted for : " + categ.name);
    })
  );
  // for(let categ in categories) { 
  //   console.log("getting data for " + categ.name);
  //   let parsedData = await cc.getProductsPerCategory(categ);
  //   console.assert(parsedData != null, "something went wrong when getting data for " + categ.name);
  // }
  
  res.send("OK - for all categories");
});

/* get only 1 category */
router.get('/:category', async (req, res, next) => {
  const category  = req.params.category;

  await insertPerCategory(category);

  res.send( { 
   result :  "OK",
   category : category, 
   category_id : cat_id });
});

var insertPerCategory = async function(category) { 
  const categories = Categories;
  const cc = new CrawlCategories();

  console.log("getting data for " + category);
  
  let parsedData = await cc.getProductsPerCategory(category);
  
  console.assert(parsedData != null, "something went wrong when getting data for " + category);

   // try to find the category id 
   let cat_id = -1; 
   categories.forEach(e => {
     if(e.name === category) { 
       cat_id = e.id;
     }
   });
 
   if(cat_id  == -1) { 
     console.error('could not found category id for category ' + category);
   }

   await ProductDbOps.insertManyProducts(parsedData, category, cat_id);
}

module.exports = router;
