const csv = require('csvtojson');
const csvFilePath = '/Users/Don/dev/fullstack/mapper/script/seed-data/1976.csv';

const fs = require('fs');
let outputPath = '/Users/Don/dev/fullstack/mapper/script/seed-data/1976.js';

let electionYear = 'YEAR';
let startText = `const _${electionYear} = { candidates: [`;

fs.appendFile(outputPath, startText, (err) => {
  if (err) throw err;
  console.log('wrote start text');

  csv({ delimiter: [','] })
    .fromFile(csvFilePath)
    .on('json', row => {

      let text;
      const { year, stateId, name, ev, c1, c2,
        c1Id, c1name, c1party, c2Id, c2name, c2party } = row;
      if (name === 'CANDIDATES') {
        text = JSON.stringify({ id: c1Id, name: c1name, party: c1party, year }) + ',';
        text += JSON.stringify({ id: c2Id, name: c2name, party: c2party, year }) + ',';
        text += '  ], states: [';
      } else {
        text = JSON.stringify({
          year, name, ev,
          stateId: stateId === '' ? null : stateId,
          votesWon: c1 === '-' ? null : c1,
          candidateId: c1Id
        }) + ',';
        text += JSON.stringify({
          year, name, ev,
          stateId: stateId === '' ? null : stateId,
          votesWon: c2 === '-' ? null : c2,
          candidateId: c2Id
        }) + ',';
      }

      fs.appendFile(outputPath, text, (err) => {
        if (err) throw err;
        console.log('wrote to file');
      });

    })
    .on('done', error => {
      if (error) console.log(error);

      const endText = `] };\n module.exports = _${electionYear};`;
      fs.appendFile(outputPath, endText, (err) => {
        if (err) throw err;
        console.log('wrote end text');
        console.log('end');
      });
    });
});

