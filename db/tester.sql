\c knews_test

SELECT * FROM comments
INNER JOIN users ON users.username = comments.author;

SELECT * FROM comments WHERE author = 'chris';