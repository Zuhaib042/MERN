const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

console.log(format(new Date(), `yyyyMMdd\tHH:mm:ss`));

console.log(uuid());

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), `yyyyMMdd\tHH:mm:ss`)}`;
  const logTime = `\n${dateTime}\t${uuid()}\t${message}`;
  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, 'logs', 'logEvents.txt'),
      logTime,
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvents;
