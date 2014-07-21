chopped-and-viewed
==================

A small node module for parsing fixed-width text.

Supply an array of column widths and get back an array of values.

Supply an optional second array of column names to get back a hash/dictionary instead.

# Usage

## Option 1: Array

    var cav = require("chopped-and-viewed");

    var parser = cav([3,3,3,4]);

    console.log(parser("A  BCDEF GHIJ"));
    //['A','BCD','EF','GHIJ']

    console.log(parser("NPMIS THEBEST"));
    //['NPM','IS','THE','BEST']

## Option 2: Hash

    var cav = require("chopped-and-viewed");

    var parser = cav([5,3,5],["first","second","third"]);

    console.log(parser("FOO  BARSTUFF"));
    //{ 'first': 'FOO', 'second': 'BAR', 'third': 'STUFF' }