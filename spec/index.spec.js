const { expect } = require('chai');
const { createRefTable, formatArticles } = require('../db/utils/seedFunctions');

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

describe('formatArticles', () => {
  it('should take array of objects and reference table and return new array', () => {
    const input = [];
    expect(formatArticles(input, {})).to.eql([]);
    expect(formatArticles(input, {})).to.not.equal(input);
  });
  it('should replace topic with topic_id', () => {
    const input = [{
      article_id: 1,
      title: 'a',
      topic: 'b',
      author: 'c',
      body: 'xxx',
      votes: 0,
      created_at: 1234,
    }];
    expect(formatArticles(input, { b: 5 }, { c: 9 })[0].topic_id).to.equal(5);
  });
  it('should replace author with user_id', () => {
    const input = [{
      article_id: 1,
      title: 'a',
      topic: 'b',
      author: 'c',
      body: 'xxx',
      votes: 0,
      created_at: 1234,
    }];
    expect(formatArticles(input, { b: 5 }, { c: 9 })[0].user_id).to.equal(9);
  });
  it('should work for array of multiple articles', () => {
    const input = [
      {
        article_id: 1,
        title: 'a',
        topic: 'b',
        author: 'c',
        body: 'xxx',
        votes: 0,
        created_at: 1234,
      },
      {
        article_id: 2,
        title: 'e',
        topic: 'f',
        author: 'g',
        body: 'yyy',
        votes: 0,
        created_at: 2345,
      },
    ];
    const expected = [
      {
        article_id: 1,
        title: 'a',
        topic_id: 5,
        user_id: 9,
        body: 'xxx',
        votes: 0,
        created_at: 1234,
      },
      {
        article_id: 2,
        title: 'e',
        topic_id: 3,
        user_id: 11,
        body: 'yyy',
        votes: 0,
        created_at: 2345,
      },
    ];
    expect(formatArticles(input, { b: 5, f: 3 }, { c: 9, g: 11 })).to.eql(expected);
  });
});
