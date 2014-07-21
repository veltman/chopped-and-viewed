var _ = require("underscore");

module.exports = function(p,f) {
  return new Chopper(p,f);
};

var Chopper = function(p,f) {

  var points,
      fields = false;
  
  if (!Array.isArray(p)) {

    throw new Error("List of column widths must be an array.");

  }

  if (f) {

    if (!Array.isArray(f)) {
      throw new Error("List of field names must be an array.");
    }

    if (f.length != p.length) {
      throw new Error("List of column widths and list of field names are different lengths.");
    }

    fields = f;

  }

  p.forEach(function(d){

    if (!_.isNumber(d) || _.isNaN(d) || d <= 0) {
      throw new Error(d.toString()+" is not a valid number.");
    }

  });

  points = p.map(function(d,i){

    return {
      "length": d,
      "start": i ? p.slice(0,i).reduce(function(a, b) {
        return a + b;
      }) : 0
    }

  });

  if (f) {

    return function(line) {

      var dict = {};

      points.forEach(function(d,i){
        dict[fields[i]] = line.slice(d.start,d.start+d.length).trim();
      });

      return dict;

    }

  }

  return function(line) {

    return points.map(function(d){
      return line.slice(d.start,d.start+d.length).trim();
    });

  }

}