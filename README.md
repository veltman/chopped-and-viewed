[![Build Status](https://travis-ci.org/veltman/chopped-and-viewed.svg?branch=master)](https://travis-ci.org/veltman/chopped-and-viewed)

chopped-and-viewed
==================

A small node module for parsing fixed-width text.

Supply an array of column widths and get back an array of values.

Supply an array of `[name,width]` pairs to get back a hash/dictionary instead.

An optional second argument preserves whitespace on the ends of a value (by default, values are trimmed).

## Installation

```
npm install chopped-and-viewed
```

## Usage

`choppedAndViewed(columnWidths[,preserveWhitespace])`

Returns a function that will parse a line of text according to the column widths supplied.

If `columnWidths` is an array of character widths, like `[5,2,3]`, the parser will produce arrays of strings.

If `columnWidths` is an array of two-item arrays with a column name and a character width, like `[["firstName",10],["lastName",12]]`, the parser will produce hashes/maps/dictionaries.

By default, each value in the resulting array or hashmaptionary will have whitespace trimmed from the beginning and end.  If you want to preserve it, pass `true` as a second argument.

### Option 1: Array

```js
var cav = require("chopped-and-viewed");

var parser = cav([3,3,3,4]);

console.log(parser("A  BCDEF GHIJ"));
// ['A','BCD','EF','GHIJ']

console.log(parser("NPMIS THEBEST"));
// ['NPM','IS','THE','BEST']
```

### Option 2: Hashmaptionary

```js
var cav = require("chopped-and-viewed");

var parser = cav([["do",5],["re",3],["mi",5]]);

console.log(parser("FOO  BARSTUFF"));
// { do: 'FOO', re: 'BAR', mi: 'STUFF' }
```

### Preserving Whitespace

```js
var cav = require("chopped-and-viewed");

var trimWhitespace = cav([8,8,8]);

console.log(trimWhitespace("PEOPLE   PLACES   THINGS"));
// ['PEOPLE','PLACES','THINGS']

var keepWhitespace = cav([8,8,8],true);

console.log(keepWhitespace("PEOPLE   PLACES   THINGS"));
// ['PEOPLE  ',' PLACES ','  THINGS']
```
