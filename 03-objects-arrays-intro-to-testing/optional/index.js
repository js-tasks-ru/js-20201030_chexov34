export function returnTrue0(a) {
  return a;
}
// true

export function returnTrue1(a) {
  return typeof a !== 'object' && !Array.isArray(a) && a.length === 4;
}
// 'true'

export function returnTrue2(a) {
  return a !== a;
}

// NaN

export function returnTrue3(a, b, c) {
  return a && a == b && b == c && a != c;
}

// '0', 0, ''

export function returnTrue4(a) {
  return (a++ !== a) && (a++ === a);
}

// 2**53 - 1

export function returnTrue5(a) {
  return a in a;
}

// new String('length')

export function returnTrue6(a) {
  return a[a] == a;
}

// [0]

export function returnTrue7(a, b) {
  return a === b && 1/a < 1/b; 
}

// -0, +0
