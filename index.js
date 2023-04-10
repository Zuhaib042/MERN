const fsPromises = require('fs').promises;

const path = require('path');

// using promises and avoiding callbacks
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, 'files', 'starter.txt'),
      'utf8',
    );
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
    await fsPromises.writeFile(
      path.join(__dirname, 'files', 'promise.txt'),
      data,
    );
    await fsPromises.appendFile(
      path.join(__dirname, 'files', 'promise.txt'),
      '\n\nI am very Cold tonight',
    );
    await fsPromises.rename(
      path.join(__dirname, 'files', 'promise.txt'),
      path.join(__dirname, 'files', 'newPromise.txt'),
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, 'files', 'newPromise.txt'),
      'utf8',
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

//callbacks

// fs.writeFile(
//   path.join(__dirname, 'files', 'reply.txt'),
//   'Nice to meet you Sir',
//   (err) => {
//     if (err) throw err;
//     console.log('write complete');
//   },
//   fs.appendFile(
//     path.join(__dirname, 'files', 'reply.txt'),
//     '\n\nand you are most welcome',
//     (err) => {
//       if (err) throw err;
//       console.log('append complete');
//     },
//     fs.rename(
//       path.join(__dirname, 'files', 'reply.txt'),
//       path.join(__dirname, 'files', 'newReply.txt'),
//       (err) => {
//         if (err) throw err;
//         console.log('Rename complete');
//       },
//     ),
//   ),
// );

// process.on('uncaughtException', (err) => {
//   console.error(`There was an uncaught ${err}`);
//   process.exit(1);
// });
