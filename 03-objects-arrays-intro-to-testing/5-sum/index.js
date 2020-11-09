/**
 * Sum - returns sum of arguments if they can be converted to a number
 * @param {number} n value
 * @returns {number | function}
 */
export function sum (n) {
    let _sum = n || 0

    const func = next => {
      _sum += (next || 0)
      return func
    }

    func.toString = () => String(_sum)

    return func
}