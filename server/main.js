const http = require('http'), WebSocket = require('ws'), protocol = require('./fasttalk'), fs = require('fs'), path = require('path');
;

const port = 3000;

let DATA = [], regExList = [];

// -----------------------------------------------------------------------
// Filter.
// -----------------------------------------------------------------------
let RegExFileLoader = class {
  run() {
    const regexDir = path.join(__dirname, './');
    let filePath = regexDir + 'filter.txt';
    let rawData = fs.readFileSync(filePath).toString();
    let lines = rawData.split(/\r?\n/);

    for (let i = 0; i < lines.length; ++i) {
      if (lines[0].length >= 2) {
        regExList.push(new RegExp(lines[i], 'gi'));
      }
    }

    console.log('*** [RegEx] Loaded ' + lines.length + ' entries. ***');
    return this;
  }
}

try {
  new RegExFileLoader().run();
}
catch (error) {
  console.error('[new RegExFileLoader().run()]');
  console.error(error);
}
// -----------------------------------------------------------------------

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.statusCode = 200;
  res.end(JSON.stringify(DATA));
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {

    // -----------------------------------------
    // Επειδή επιστρέφει λίστα.
    // -----------------------------------------
    let decodedMsg = protocol.decode(message),
      result = '';

    try {
      for (var idk of decodedMsg) result += idk;

      let modifiedObject = JSON.parse(result);

      regExList.forEach((regex) => {
        modifiedObject.name = modifiedObject.name.replace(regex, '***');
      });

      DATA.push(modifiedObject);
      // -----------------------------------------

      // ----------------------------------------------------------
      // Bubble Short (με βάση τις προσπάθειες των παιχτών)
      // ----------------------------------------------------------
      for (var i = 0; i < DATA.length; i++) {
        for (var j = 0; j < (DATA.length - i - 1); j++) {
          if (DATA[j].tries > DATA[j + 1].tries) {
            var temp = DATA[j]
            DATA[j] = DATA[j + 1]
            DATA[j + 1] = temp
          }
        }
      }
     // ----------------------------------------------------------

    }

    catch (error) {
      return;
    }

  });
});
