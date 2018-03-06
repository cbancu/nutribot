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

      const prodData = this.converTableDataToSchmaObj(tableData);
      return prodData;

    } catch (error) {
      console.log(error);
    }
  };


  /**
   * 
   * @param {Object[]} data looks like 'public/docs/lactate.json'
   * @returns a collection of json objects (mangoose schema) ready to be inserted into DB  
   */
  converTableDataToSchmaObj(data) { 
    if(!data) { 
      throw new Error('data is null');
    }

    var actualData = data[0];

    if(!actualData) { 
      throw new Error('data[0] is null');
    }

    var returnData = [] ;
    // skip the 1st line as its the header , skip the last line as its a note about 'per 100g values' 
    // a line looks like this {"0":"Ayran","1":"51.6","2":"2.9","3":"2.8","4":"2","5":"0","6":"+"}
    // skip the 7th column, '+' its just for some styling (we don't need it)
    for(let i = 1 ; i < actualData.length - 1 ; i++) {
        
      const blob = { 
        name : actualData[i][0],
        calories : parseFloat(actualData[i][1]),
        proteins : parseFloat(actualData[i][2]),
        lipids   : parseFloat(actualData[i][3]),
        carbs    : parseFloat(actualData[i][4]), 
        fibers   : parseFloat(actualData[i][5])
      };

      returnData.push(blob);
    }

      return returnData;
  }


}

module.exports = CrawlCategorries
