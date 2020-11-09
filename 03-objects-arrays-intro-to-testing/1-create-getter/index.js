/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arrParams = path.split('.')
  return obj => {
    return arrParams.reduce((newObj, value) => {
      if (!!newObj) {
        return newObj[value]
      }
      return newObj 
    }, obj)
  }
}
