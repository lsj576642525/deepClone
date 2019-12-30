let cache = []

function deepClone(source) {
  if (source instanceof Object) {
    let cachedDist = findCache(source)
    if (cachedDist) {
      return cachedDist
    } else {
      let dist
      if (source instanceof Array) {
        dist = new Array();
      } else if (source instanceof Function) {
        dist = function () {
          return source.call(this, ...arguments)
        }
      } else {
        dist = new Object();
      }
      cache.push([source, dist])
      for (let key in source) {
        dist[key] = deepClone(source[key]);
      }
      return dist;
    }
  }
  return source;
}

function findCache(source) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][0] === source) {
      return cache[1]
    }
  }
  return undefined
}

module.exports = deepClone;