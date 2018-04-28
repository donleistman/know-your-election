const router = require('express').Router();
const { Candidate } = require('../db/models');
module.exports = router;

router.get('/:year', (req, res, next) => {
  Candidate.findAll({
    where: { year: req.params.year }
  })
    .then(candidates => {
      res.json(candidates);
    })
    .catch(next);
});

