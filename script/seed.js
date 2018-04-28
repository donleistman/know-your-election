const db = require('../server/db');
const { Candidate, State } = require('../server/db/models');
const { candidates2016, states2016 } = require('./seed-data/2016.js');


async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const candidates = await Promise.all(candidates2016.map(candidate =>
    Candidate.create(candidate))
  );

  const states = await Promise.all(states2016.map(state =>
    State.create(state))
  );

  console.log(`seeded ${candidates.length} candidates`);
  console.log(`seeded ${states.length} states`);
  console.log(`seeded successfully`);
}


// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
