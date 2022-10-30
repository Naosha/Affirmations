const express = require('express');
const path = require('path');
const controller = require('./controllers/controller');
const model = require('./models/model');
const featurePolicy = require('feature-policy');

const PORT = 3000;

const app = express();

// controller.task.start();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.use(
  featurePolicy({
    features: {
      autoplay: ["'*'"],
    },
  })
);

app.get('/', async (req, res) => {
  await model.getRandomPhoto();
  model.getRandomAffirmation();
  model.getRandomMusic();
  res.render('index', {
    photo: model.state.photo.regular,
    affirmation: model.state.affirmation,
    photographer: model.state.photo.photographer,
    link: model.state.photo.link,
    description: model.state.photo.description,
    color: model.state.photo.color,
    music: model.state.music,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});

/*
TODO

API call timeout and error handling
Database for storing photos
Daily timer for API calls

*/
