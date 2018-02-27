'use strict';

const cheerio = require("cheerio");
const axios = require("axios");
const { URL } = require('url');
const $ = require('jquery');
const tabletojson = require('tabletojson');

const NUTRITION_URL = "http://nutritie.fitness-education.ro/";

 class CrawlCategorries { 

   async getProductsPerCategory(category)  {
    try {
      const myURL = NUTRITION_URL  + category + '/';
      const response = await axios.get(myURL);
      const data = response.data;

      var $ = cheerio.load(data); 
      var tableToBeParsed = $('#product_div').find('table').parent().html();
      var tableData = tabletojson.convert(tableToBeParsed, { useFirstRowForHeadings: false });

      return tableData;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CrawlCategorries
