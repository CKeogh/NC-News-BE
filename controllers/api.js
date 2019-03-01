const { getAllEndPoints } = require('../models/api');

exports.serveAllEndPoints = (req, res, next) => {
  getAllEndPoints()
    .then((end_points) => {
      const jsonString = JSON.stringify(end_points);
      res.status(200).send(jsonString);
    });
};
