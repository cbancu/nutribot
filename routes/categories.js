'use strict';

const express = require('express');
const router = express.Router();
const CrawlCategories = require('../app/CrawlCategories');

const categories = [
  "carne",
  "oua",
  "branzeturi",
  "lactate",
  "cereale",
  "legume",
  "peste",
  "seminte",
  "fructe",
  "grasimi",
  "dulciuri",
  "fast-food",
  "bauturi",
  "condimente",
  "sosuri",
  "snakuri",
  "mezeluri",
  "suplimente",
  "paine",
  "altele",
];

/* GET products for each category, serially */
router.get('/', async (req, res, next) => {
  const cc = new CrawlCategories();

  for(let categ in categories) { 
    console.log("getting data for " + categ);
    let parsedData = await cc.getProductsPerCategory(categ);
    console.assert(parsedData != null, "something went wrong when getting data for " + categ);
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
  
  res.send(parsedData);
});

module.exports = router;
