require('dotenv').config();
const affirmations = require('../models/affirmations');
const music = require('../models/music');

const fetch = require('node-fetch');
const { API_URL } = require('../config');

const state = {
  photo: {},
  affirmation: '',
  photographer: '',
  link: '',
  music: '',
};

const createPhotoObject = (data) => {
  const photo = data;
  return {
    id: photo.id,
    color: photo.color,
    blur_hash: photo.blur_hash,
    raw: photo.urls.raw,
    full: photo.urls.full,
    regular: photo.urls.regular,
    small: photo.urls.small,
    photographer: photo.user.name,
    link: photo.user.links.html,
    description: photo.alt_description,
  };
};

const getRandomPhoto = async () => {
  try {
    const response = await fetch(
      `${API_URL}/photos/random?query=nature&orientation=landscape&client_id=${process.env.API_KEY}`
    );
    const data = await response.json();
    state.photo = createPhotoObject(data);
  } catch (err) {
    console.log(err);
  }
};

const getRandomAffirmation = () => {
  const randomAffirmation =
    affirmations[Math.floor(Math.random() * affirmations.length)];
  state.affirmation = randomAffirmation;
};

const getRandomMusic = () => {
  const randomMusic = music[Math.floor(Math.random() * music.length)];
  state.music = randomMusic;
};

// const getRandomAffirmation = async () => {
//   const response = await fetch('https://www.affirmations.dev');
//   const data = await response.json();
//   state.affirmation = data.affirmation;
// };

module.exports = {
  state,
  getRandomPhoto,
  getRandomAffirmation,
  getRandomMusic,
};
