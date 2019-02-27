\c knews_test

UPDATE articles SET votes + 1 WHERE article_id;

SELECT votes, article_id FROM articles;