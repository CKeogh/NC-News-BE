\c knews_test

SELECT articles.*, COUNT(comment_id) AS comment_count
FROM articles
JOIN comments ON articles.article_id = comments.article_id;


-- [ { article_id: 5,
--        title: 'UNCOVERED: catspiracy to bring down democracy',
--        body: 'Bastet walks amongst us, and the cats are taking arms!',
--        votes: 0,
--        topic: 'cats',
--        author: 'rogersop',
--        created_at: '2002-11-19T00:00:00.000Z',
--        comment_count: '2' },
--      { article_id: 9,
--        title: "They're not exactly dogs, are they?",
--        body: 'Well? Think about it.',
--        votes: 0,
--        topic: 'mitch',
--        author: 'butter_bridge',
--        created_at: '1986-11-23T00:00:00.000Z',
--        comment_count: '2' },
--      { article_id: 1,
--        title: 'Living in the shadow of a great man',
--        body: 'I find this existence challenging',
--        votes: 100,
--        topic: 'mitch',
--        author: 'butter_bridge',
--        created_at: '2018-11-15T00:00:00.000Z',
--        comment_count: '13' },
--      { article_id: 6,
--        title: 'A',
--        body: 'Delicious tin of cat food',
--        votes: 0,
--        topic: 'mitch',
--        author: 'icellusedkars',
--        created_at: '1998-11-20T00:00:00.000Z',
--        comment_count: '1' } ]