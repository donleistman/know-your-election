const db = require('../server/db');
const { Candidate, State } = require('../server/db/models');
const seedData = require('./seed-data');

const elections = Object.keys(seedData).map(key => seedData[key]);

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  for (let i = 0; i < elections.length; i++) {
    const electionYear = elections[i];
    const candidates = await Promise.all(electionYear.candidates.map(candidate =>
      Candidate.create(candidate))
    );

    const states = await Promise.all(electionYear.states.map(state =>
      State.create(state))
    );

    console.log(`For Election ${candidates[0].year}: `);
    console.log(`seeded ${candidates.length} candidates`);
    console.log(`seeded ${states.length} states`);
  }
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
