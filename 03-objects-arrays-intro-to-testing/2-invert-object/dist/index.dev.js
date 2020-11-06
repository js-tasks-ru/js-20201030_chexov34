"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invertObj = invertObj;

/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
function invertObj(obj) {
  if (!obj) return;
  var arr = Object.entries(obj);
  return Object.fromEntries(arr.map(function (innerArr) {
    return innerArr.reverse();
  }));
}