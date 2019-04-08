'use strict';

var DNAModel = require('../model/dna').DNAModel;


module.exports = {
  checkMutation: checkMutation,
  stats: stats
};

function checkMutation(req, res) {

  var result = hasMutation(req.body.dna);
  res.json({ "mutation": result });
}


function hasMutation(dna) {

  var result = false;
  var lengthIndex = dna[0].length;
  var indices = [];
  var temDna = [...dna];

  for (var i = 0; i < lengthIndex; i++) {
    indices.push(i);
  }

  var dnaVerticalReverse = obliqueArray(temDna, true);
  var dnaVertical = obliqueArray(temDna, false);

  var converArray = [];
  indices.map(index => {
    let temArray = temDna.map(row => row[index]);
    converArray.push(temArray.join(''));
  });

  temDna.push(...converArray);
  temDna.push(...dnaVerticalReverse);
  temDna.push(...dnaVertical);


  temDna.forEach(element => {
    if (element.indexOf("AAAA") != -1 || element.indexOf("TTTT") != -1 || element.indexOf("CCCC") != -1 || element.indexOf("GGGG") != -1) {
      result = true;
    }
  });


  var dnaModel = new DNAModel({ dna: dna, mutation: result });

  dnaModel.save(function (err) {
    console.log("dna exists");
  });


  return result;

}


function obliqueArray(dna, reverse) {

  var v = dna.length;
  var h = dna[0].length;
  var maxLength = Math.max(h, v);
  var temp;
  var temArray = [];
  for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
    temp = [];
    for (var y = v - 1; y >= 0; --y) {
      var x = k - (reverse ? v - y : y);
      if (x >= 0 && x < h) {
        temp.push(dna[y][x]);
      }
    }
    if (temp.length > 0) {
      temArray.push(temp.join(''));
    }
  }
  return temArray;

}


function stats(req, res) {

  var countMutations = 0;

  DNAModel.count({ mutation: true }, function (err, countMutations) {

    DNAModel.count({ mutation: false }, function (err, countNotMutations) {

      var ratio = 0;
      var total = countMutations + countNotMutations;

      if (countNotMutations != 0) {
        ratio = countMutations / countNotMutations;
      }
      res.json({ "count_mutations": countMutations, "count_no_mutation": countNotMutations, "ratio": ratio });
    });

  });


}
