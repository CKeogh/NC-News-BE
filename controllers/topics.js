const { getTopics, addTopic, getAllSlugs } = require('../models/topics');

exports.sendTopics = (req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.receiveTopic = (req, res, next) => {
  const newTopic = req.body;
  getAllSlugs()
    .then((slugs) => {
      if (slugs.includes(newTopic.slug)) {
        next({ status: 422 });
      }
    })
    .then(() => addTopic(newTopic))
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};
