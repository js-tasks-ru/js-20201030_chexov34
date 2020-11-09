import { 
  returnTrue0,
  returnTrue1,
  returnTrue2,
  returnTrue3,
  returnTrue4,
  returnTrue5,
  returnTrue6,
  returnTrue7
 } from './index.js';

describe('objects-arrays-intro-to-testing/optional', () => {
  it('should be true in returnTrue0', () => {
    expect(returnTrue0(true)).toEqual(true);
  });

  it('should be true in returnTrue1', () => {
    expect(returnTrue1('true')).toEqual(true);
  });

  it('should be true in returnTrue2', () => {
    expect(returnTrue2(NaN)).toEqual(true);
  });

  it('should be true in returnTrue3', () => {
    expect(returnTrue3('0', 0, '')).toEqual(true);
  });

  it('should be true in returnTrue4', () => {
    expect(returnTrue4(2**53 - 1)).toEqual(true);
  });
  
  it('should be true in returnTrue5', () => {
    expect(returnTrue5(new String('length'))).toEqual(true);
  });

  it('should be true in returnTrue6', () => {
    expect(returnTrue6([0])).toEqual(true);
  });

  it('should be true in returnTrue7', () => {
    expect(returnTrue7(-0, +0)).toEqual(true);
  });
});