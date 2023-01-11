/*
 * @Doc https://github.com/zhanhb/stable-sort/blob/master/stable-sort.js
 * @Author: czy0729
 * @Date: 2021-11-22 03:08:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:06:55
 */

// stable sort
;(function (Object, Array) {
  var proto = Array.prototype,
    origin_sort = proto.sort,
    call = newCmp.call,
    apply = newCmp.apply

  function wrap(obj) {
    obj = Object(obj)
    var len = obj.length >>> 0
    var A = new Array(len)
    for (var k = 0; k < len; ++k) {
      if (k in obj) {
        A[k] = [obj[k], k]
      }
    }
    return A
  }

  function defaultCmp(x, y) {
    // FIXED [Symbol(),Symbol()].sort()
    var xString = '' + x[0],
      yString = '' + y[0]
    if (xString < yString) return -1
    if (yString < xString) return 1
    return x[1] - y[1]
  }

  function newCmp(fn) {
    // https://tc39.github.io/ecma262/#sec-sortcompare
    return fn
      ? function (x, y) {
          return +call.call(fn, void 0, x[0], y[0]) || x[1] - y[1]
        }
      : defaultCmp
  }

  function sort(cmp) {
    if (
      (typeof cmp !== 'function' && typeof cmp !== 'undefined') ||
      typeof this === 'undefined' ||
      this === null
    ) {
      // usually a TypeError is thrown
      return apply.call(origin_sort, this, arguments)
    }
    var obj = Object(this),
      tmp,
      sorted
    // FIXED Array.from({length:30},(x,i)=>({value:i,toString(){return 'null'}})).sort();
    sorted = call.call(origin_sort, wrap(obj), newCmp(cmp))
    // FIXED Array.prototype.sort.call({0:1,1:0,get length(){return 2}},(x,y)=>x-y)
    // FIXED [,,,1,2,3].sort(()=>0);
    for (var i = 0, length = sorted.length; i < length; ++i) {
      ;(tmp = sorted[i]) ? (obj[i] = tmp[0]) : delete obj[i]
    }
    return obj
  }

  ;(function () {
    var expando = 'stable-sort-expando',
      i = 5
    // IE 9 - Edge 13 have stable sorts for arrays with < 512 elements
    // https://stackoverflow.com/questions/3026281/array-sort-sorting-stability-in-different-browsers
    while (i--) expando += expando
    if (
      expando
        .split('')
        .sort(function (a, b) {
          // @ts-expect-error
          return (a === 'o') - (b === 'o')
        })
        .join('') !==
        expando.replace(/o/g, '') + expando.replace(/[^o]/g, '') ||
      [, , , 1, 2, 3]
        .sort(function () {
          return 0
          // Fix chrome 75 which is not stable if there's empty elements in the array.
        })
        .join('.') !== '1.2.3...'
    ) {
      proto.sort = sort
    }
  })()
})(Object, Array)
