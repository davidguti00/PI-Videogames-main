/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',

  description: "description",
  released: "12-12-22",
  rating: 5,
  img: "https://i.pinimg.com/564x/16/21/c2/1621c21b9aaf5b125e412327b0fab8b3.jpg",
  platforms: ["Andriod", "Linux"],
  createdInDb: true
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
    it('responds with and object with message  ', () =>
    agent.get('/videogames').then((res)=>{
      expect(res.send).equal("get all videogames")
    })
  );
  });
});
