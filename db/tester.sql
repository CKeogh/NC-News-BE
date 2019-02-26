\c knews

SELECT articles.*, COUNT(comment_id) AS comment_count
    FROM articles
    JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id;