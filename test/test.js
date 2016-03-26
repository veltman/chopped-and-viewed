var cav = require("../"),
    fs = require("fs"),
    path = require("path"),
    assert = require("assert"),
    source = path.join(__dirname,"test.txt");

fs.readFile(source,"utf8",function(err,data){

  var lines = data.split("\n");

  var arrayParser = cav([12,13,8,6]),
      noTrimParser = cav([12,13,8,6],true),
      objectParser = cav([[12,"name"],[13,"description"],[8,"weapon"],[6,"color"]]);

  assert.deepStrictEqual(
    lines.map(arrayParser),
    [["LEONARDO","LEADS","KATANA","BLUE"],["DONATELLO","DOES MACHINES","BO STAFF","PURPLE"],["RAPHAEL","COOL BUT RUDE","SAI","RED"],["MICHELANGELO","PARTY DUDE","NUNCHUKS","ORANGE"]],
    "Failed basic parse"
  );

  assert.deepStrictEqual(
    lines.map(noTrimParser),
    [["LEONARDO    ","LEADS        ","KATANA  ","BLUE  "],["DONATELLO   ","DOES MACHINES","BO STAFF","PURPLE"],["RAPHAEL     ","COOL BUT RUDE","SAI     ","RED   "],["MICHELANGELO","PARTY DUDE   ","NUNCHUKS","ORANGE"]],
    "Failed no-trim parse"
  );

  assert.deepStrictEqual(
    lines.map(objectParser),
    [{name:"LEONARDO",description:"LEADS",weapon:"KATANA",color:"BLUE"},{name:"DONATELLO",description:"DOES MACHINES",weapon:"BO STAFF",color:"PURPLE"},{name:"RAPHAEL",description:"COOL BUT RUDE",weapon:"SAI",color:"RED"},{name:"MICHELANGELO",description:"PARTY DUDE",weapon:"NUNCHUKS",color:"ORANGE"}],
    "Failed object parse"
  );

});

// Invalid inputs
[
  NaN,
  1,
  {},
  [],
  ["a",1,2],
  [1,2,[3,4]],
  [[1,"a"],[2,"b"],[3]]
  [[1,"a"],[2,"b"],["c",3]],
  [[1,2,3],["a","b","c"]]
].forEach(function(badInput){
  console.log(test);
  assert.throws(function(){ cav(badInput); });
});
