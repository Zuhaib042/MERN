const express = require('express');
const app = express();
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const PORT = process.env.PORT || 3500;

// custom middleware

app.use(logger);

// Cross Origin Resource Sharing
const whiteList = [
  'http://www.yourwebsite.com',
  'http://127.0.0.1:5500',
  'http://localhost:3500',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// build-in middleware to handle urlencoded data
// in other words form-data

app.use(express.urlencoded({ extended: false }));

// built-in middleware for json

app.use(express.json());

// serve static files

app.use(express.static(path.join(__dirname, '/public')));

app.use('/subdir', require('./routes/subdir'));

app.get('^/$|index(.html)?', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 not found' });
  } else {
    res.type('txt').send('404 not found');
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
