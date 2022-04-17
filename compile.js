const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'WavePortal.sol');
console.log(contractPath);
const source = fs.readFileSync(contractPath, 'utf8');

//OLD WAY OF COMPILIATION
//module.exports = solc.compile(source, 1).contracts[':WavePortal'];

//NEW WAY TO COMPILE
const input = {
  language: 'Solidity',
  sources: {
    'WavePortal.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: { '*': { '*': [ '*' ], "": [ '*' ] } },
                    //  { "*": { "*": [ "*" ], "": [ "*" ] } }
  },
}





//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['WavePortal.sol'].WavePortal;
