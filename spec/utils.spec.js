const { expect } = require('chai');
const {
  createRefTable,
  formatArticles,
  convertDate,
  formatComments,
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
  it('convert created_at timestamp to date', () => {
    const input = [{
      article_id: 1,
      title: 'a',
      topic: 'b',
      author: 'c',
      body: 'xxx',
      votes: 0,
      created_at: 1339286400,
    }];
    expect(formatArticles(input)[0].created_at).to.be.a('date');
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
    const formattedArticles = formatArticles(input);
    expect(formattedArticles[0].created_at).to.be.a('date');
    expect(formattedArticles[1].created_at).to.be.a('date');
  });
});

describe('formatComments', () => {
  it('should take an array of objects, one reference and return a new array', () => {
    const input = [];
    expect(formatComments(input, {})).to.eql([]);
    expect(formatComments(input, {})).to.not.equal(input);
  });
  it('should replace created_by with author', () => {
    const input = [
      {
        body: 'xxx',
        belongs_to: 'a',
        created_by: 'b',
        votes: 0,
        created_at: 1234,
      },
    ];
    expect(formatComments(input, { a: 1 })[0].author).to.equal('b');
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
    expect(formatComments(input, { a: 1 })[0].article_id).to.equal(1);
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
    const formattedComments = formatComments(input, { a: 5, c: 8 });
    expect(formattedComments[0].author).to.equal('b');
    expect(formattedComments[1].author).to.equal('d');
    expect(formattedComments[0].article_id).to.equal(5);
    expect(formattedComments[1].article_id).to.equal(8);
  });
});
