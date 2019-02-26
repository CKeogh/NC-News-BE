const { getTopics, addTopic } = require('../models/topics');

exports.sendTopics = (req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    });
};

exports.receiveTopic = (req, res, next) => {
  const newTopic = req.body;
  addTopic(newTopic)
    .then(([topic]) => {
      res.status(201).send({ topic });
    });
};
