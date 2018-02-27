'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cheerio = require("cheerio");
var axios = require("axios");

var _require = require('url'),
    URL = _require.URL;

var $ = require('jquery');
var tabletojson = require('tabletojson');

var NUTRITION_URL = "http://nutritie.fitness-education.ro/";

var CrawlCategorries = function () {
  function CrawlCategorries() {
    _classCallCheck(this, CrawlCategorries);
  }

  _createClass(CrawlCategorries, [{
    key: "getProductsPerCategory",
    value: async function getProductsPerCategory(category) {
      try {
        var myURL = NUTRITION_URL + category + '/';
        var response = await axios.get(myURL);
        var data = response.data;

        var $ = cheerio.load(data);
        var tableToBeParsed = $('#product_div').find('table').parent().html();
        var tableData = tabletojson.convert(tableToBeParsed, { useFirstRowForHeadings: false });

        return tableData;
      } catch (error) {
        console.log(error);
      }
    }
  }]);

  return CrawlCategorries;
}();

module.exports = CrawlCategorries;