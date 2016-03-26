var _ = require("underscore");

module.exports = function(columns,preserveWhitespace) {

  var widths,
      fields;

  check(columns);

  if (Array.isArray(columns[0])) {
    fields = columns.map(function(c){
      return c[0];
    });
    widths = columns.map(function(c){
      return c[1];
    });
  } else {
    widths = columns;
  }

  return chopper(widths,fields,!!preserveWhitespace);

};

function chopper(widths,fields,preserveWhitespace) {

  var points = toPoints(widths);

  return function(line) {

    var values = points.map(function(p){

      var sliced = line.slice(p[0],p[1]);

      return preserveWhitespace ? sliced : sliced.trim();

    });

    return fields ? zip(values,fields) : values;

  };

}

function zip(values,fields) {

  var dict = {};

  values.forEach(function(v,i){
    dict[fields[i]] = v;
  });

  return dict;

}

// http://jsperf.com/converting-widths
function toPoints(widths) {

  var before = 0,
  		result = [];

  widths.forEach(function(w){

    // slice boundaries
  	result.push([before,before + w]);

  	before += w;

  });

  return result;

}

function check(columns) {

  if (!Array.isArray(columns) || !columns.length) {
    throw new Error("List of column widths must be an array.");
  }

  if (!columns.every(isNumber) && !columns.every(isPair)) {
    throw new Error("List of column widths must be an array of numbers or an array of [string,number] pairs.");
  }

}

function isNumber(d) {
  return typeof d === "number" && !isNaN(d);
}

function isPair(d) {
  return Array.isArray(d) && d.length == 2
  && isNumber(d[1]) && typeof d[0] === "string";
}
