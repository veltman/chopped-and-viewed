var _ = require("underscore");

module.exports = function(p,f,t) {
  if (t === undefined) {
    t = true;
  }
  return new Chopper(p,f,t);
};

var Chopper = function(p,f,t) {

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

  if (t) {

    if (typeof t !== 'boolean') {

      throw new Error("Trim parameter must be a boolean.");
    }

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

  var getValue = function(line,d) {
    var value = line.slice(d.start,d.start+d.length);
    if (t === true) {
      value = value.trim();
    }
    return value;
  };

  if (f) {

    return function(line) {

      var dict = {};

      points.forEach(function(d,i){
        dict[fields[i]] = getValue(line,d);
      });

      return dict;

    }

  }

  return function(line) {

    return points.map(function(d){
      return getValue(line,d);
    });

  }

}