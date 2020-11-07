/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let count = 0;
  let newStr = ''

  if (size === 0) return ''
  if (!size) return string

  for (let index = 0; index < string.length; index++) {
    if (index === 0) {
      newStr += string[index]
      continue
    }
    if (string[index] === string[index -1]) {
      ++count
    } else {
      count = 0
    }
    if (count < size) {
      newStr += string[index]
    }
  }
  return newStr
}
