'use strict';

const express = require('express');
const router = express.Router();
const CrawlCategories = require('../app/CrawlCategories');
const Categories = require('../app/Categories');
const ProductDbOps = require('../app/db/ProductDbOps');


/* GET products for each category, serially */
router.get('/', async (req, res, next) => {
  const cc = new CrawlCategories();
  const categories = Categories;
  for(let categ in categories) { 
    console.log("getting data for " + categ.name);
    let parsedData = await cc.getProductsPerCategory(categ);
    console.assert(parsedData != null, "something went wrong when getting data for " + categ.name);
  }
  
  res.send("OK - all categories");
});

/* get only 1 category */
router.get('/:category', async (req, res, next) => {
  const category  = req.params.category;
  const cc = new CrawlCategories();
  console.log("getting data for " + category);
  let parsedData = await cc.getProductsPerCategory(category);
  console.assert(parsedData != null, "something went wrong when getting data for " + category);
  
  const categories = Categories;

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


  console.info("INSERTING %d products for category %s", parsedData.length, category); 
  await ProductDbOps.insertManyProducts(parsedData, category, cat_id);

  res.send( { 
   result :  "OK",
   category : category, 
   category_id : cat_id });
});

module.exports = router;
