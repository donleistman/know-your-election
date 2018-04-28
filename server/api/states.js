const router = require('express').Router();
const { State, Candidate } = require('../db/models');
module.exports = router;

router.get('/:year', (req, res, next) => {
  State.findAll({
    where: { year: req.params.year },
    include: [{ model: Candidate }]
  })
    .then(states => {
      const answer = {};
      states.forEach(state => {
        const { stateId, votesWon, name, ev, candidate } = state;
        if (votesWon) {
          answer[stateId] = {
            name, ev,
            winner: candidate.party
          };
        }
      });

      res.json(answer);
    })
    .catch(next);
});

