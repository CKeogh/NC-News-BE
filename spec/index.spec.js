const { expect } = require('chai');
const { createRefTable } = require('../db/utils/createRefTable.js');

describe('createRefTable', () => {
  it('should take an array, link name and id and return an object', () => {
    expect(createRefTable([], 'name', 'id')).to.eql({});
  });
  it('should reformat array into object based on given name and id', () => {
    expect(createRefTable([{ name: 'a', id: 1 }], 'name', 'id')).to.eql({ a: 1 });
  });
  it('should work for array of multiple objects', () => {
    expect(createRefTable([
      { num: 'a', name_id: 1 },
      { num: 'b', name_id: 3 },
      { num: 'c', name_id: 9 },
    ], 'num', 'name_id')).to.eql({ a: 1, b: 3, c: 9 });
  });
});
