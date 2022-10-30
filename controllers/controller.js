const cron = require('node-cron');
const model = require('../models/model');

const task = cron.schedule(
  '* * * * *',
  async () => {
    console.log('running a task every minute');
    await model.getRandomPhoto();
    model.getRandomAffirmation();
  },
  {
    scheduled: false,
  }
);

module.exports = {
  task,
};
