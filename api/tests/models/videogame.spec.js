const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
    });

    describe("Validators", () => {
      beforeEach(() => Videogame.sync({ force: true }));
      describe("create a new Videogame", () => {
        it("should work when its a valid Videogame", () => {
          Videogame.create({
            name: "The video game",
            description: "description",
            released: "12-12-22",
            rating: 5,
            img: "https://i.pinimg.com/564x/16/21/c2/1621c21b9aaf5b125e412327b0fab8b3.jpg",
            platforms: ["Andriod", "Linux"],
            createdInDb: true
          });
        });
      });
    });


  });
});

