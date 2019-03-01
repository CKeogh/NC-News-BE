const { getAllEndPoints } = require('../models/api');

exports.serveAllEndPoints = (req, res, next) => {
  getAllEndPoints()
    .then(({ end_points }) => {
      res.status(200).send({ end_points });
    });
};
