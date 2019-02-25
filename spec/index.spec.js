const { expect } = require('chai');
const {
  createRefTable, formatArticles, convertDate, formatComments,
} = require('../db/utils/seedFunctions');

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

      },
      {
        article_id: 2,
        title: 'e',
        topic: 'f',
        author: 'g',
        body: 'yyy',
        votes: 0,
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
      },
      {
        article_id: 2,
        title: 'e',
        topic_id: 3,
        user_id: 11,
        body: 'yyy',
        votes: 0,
      },
    ];

    const formattedArticles = formatArticles(input, { b: 5, f: 3 }, { c: 9, g: 11 });
    expect(formattedArticles[0].topic_id).to.equal(5);
    expect(formattedArticles[1].topic_id).to.equal(3);
    expect(formattedArticles[0].user_id).to.equal(9);
    expect(formattedArticles[1].user_id).to.equal(11);
  });
});

describe('convertDate', () => {
  it('should convert timestamp to psql friendly date', () => {
    expect(convertDate(1339315200000)).to.be.a.instanceOf(Date);
  });
});

describe('formatComments', () => {
  it('should take an array of objects, two reference tables and return a new array', () => {
    const input = [];
    expect(formatComments(input, {}, {})).to.eql([]);
    expect(formatComments(input, {}, {})).to.not.equal(input);
  });
  it('should replace created_by with user_id', () => {
    const input = [
      {
        body: 'xxx',
        belongs_to: 'a',
        created_by: 'b',
        votes: 0,
        created_at: 1234,
      },
    ];
    expect(formatComments(input, { b: 1 }, {})[0].user_id).to.equal(1);
  });
  it('should replace belongs_to with article_id', () => {
    const input = [
      {
        body: 'xxx',
        belongs_to: 'a',
        created_by: 'b',
        votes: 0,
        created_at: 1234,
      },
    ];
    expect(formatComments(input, { b: 1 }, { a: 5 })[0].article_id).to.equal(5);
  });
  it('should work for multiple articles in array', () => {
    const input = [
      {
        body: 'xxx',
        belongs_to: 'a',
        created_by: 'b',
        votes: 0,
        created_at: 1234,
      },
      {
        body: 'xxx',
        belongs_to: 'c',
        created_by: 'd',
        votes: 0,
        created_at: 1234,
      },
    ];
    const formattedComments = formatComments(input, { b: 1, d: 12 }, { a: 5, c: 8 });
    expect(formattedComments[0].user_id).to.equal(1);
    expect(formattedComments[1].user_id).to.equal(12);
    expect(formattedComments[0].article_id).to.equal(5);
    expect(formattedComments[1].article_id).to.equal(8);
  });
});
