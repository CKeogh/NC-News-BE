exports.handle400 = (err, req, res, next) => {
  if (err.code === '23502' || err.code === '42703') {
    res.status(400).send({ msg: 'Bad request' });
  } else if (err.msg === 'topic already exists') {
    res.status(400).send({ msg: err.msg });
  } else if (err.msg === 'article does not exist') {
    res.status(400).send({ msg: err.msg });
  } else next(err);
};

exports.handle422 = (err, req, res, next) => {
  if (err.status === 422) {
    res.status(422).send({ msg: 'unprocessable entity' });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.code === '1' || err.code === '2') res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal server error' });
};

exports.handle405 = (req, res) => {
  res.status(405).send({ msg: 'Method not allowed' });
};
