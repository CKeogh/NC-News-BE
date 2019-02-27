exports.handle404 = (req, res) => {
  res.status(404).send({ msg: 'Page not found' });
};

exports.handle405 = (req, res) => {
  res.status(405).send({ msg: 'Method not allowed' });
};

exports.handle400 = (err, req, res, next) => {
  if (err.code === '23502') {
    res.status(400).send({ msg: 'Bad request' });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal server error' });
};
