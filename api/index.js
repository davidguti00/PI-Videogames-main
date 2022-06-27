
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getGenres, getPlatform } = require ("./src/controllers/functionApi");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  getGenres();
  getPlatform();

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
