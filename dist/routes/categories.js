'use strict';

var express = require('express');
var router = express.Router();
var CrawlCategories = require('../app/CrawlCategories');

var categories = ["carne", "oua", "branzeturi", "lactate", "cereale", "legume", "peste", "seminte", "fructe", "grasimi", "dulciuri", "fast-food", "bauturi", "condimente", "sosuri", "snakuri", "mezeluri", "suplimente", "paine", "altele"];

/* GET products for each category, serially */
router.get('/', async function (req, res, next) {
  var cc = new CrawlCategories();

  for (var categ in categories) {
    console.log("getting data for " + categ);
    var parsedData = await cc.getProductsPerCategory(categ);
    console.assert(parsedData != null, "something went wrong when getting data for " + categ);
  }

  res.send("OK - all categories");
});

/* get only 1 category */
router.get('/:category', async function (req, res, next) {
  var category = req.params.category;
  var cc = new CrawlCategories();
  console.log("getting data for " + category);
  var parsedData = await cc.getProductsPerCategory(category);
  console.assert(parsedData != null, "something went wrong when getting data for " + category);

  res.send(parsedData);
});

module.exports = router;