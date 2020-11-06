/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arrParams = path.split('.')
  return obj => {
    let copyObj = {...obj}
    for (let k of arrParams) {
      if (Object.keys(copyObj).includes(k)) {
        copyObj = copyObj[k]
      } else {
        return
      }
    }
    return copyObj
  }
}
