const csv = require('csvtojson');
const csvFilePath = '/Users/Don/dev/fullstack/mapper/script/seed-data/1976.csv';

const fs = require('fs');
let outputPath = '/Users/Don/dev/fullstack/mapper/script/seed-data/1976.json';

csv({ delimiter: [','] })
  .fromFile(csvFilePath)
  .on('json', row => {
    let text;
    const { year, stateId, name, ev, c1, c2,
      c1Id, c1name, c1party, c2Id, c2name, c2party } = row;
    if (name === 'CANDIDATES') {
      text = JSON.stringify({ c1Id, c1name, c1party }) + ',';
      text += JSON.stringify({ c2Id, c2name, c2party }) + ',';
    } else {
      text = JSON.stringify({ year, stateId, name, ev, votesWon: c1, candidateId: c1Id }) + ',';
      text += JSON.stringify({ year, stateId, name, ev, votesWon: c2, candidateId: c2Id }) + ',';
    }

    fs.appendFile(outputPath, text, (err) => {
      if (err) throw err;
      console.log('wrote to file');
    });

  })
  .on('done', error => {
    if (error) console.log(error);
    console.log('end');
  });
