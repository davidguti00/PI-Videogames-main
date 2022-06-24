const { Router } = require('express');
const videogamesControllers = require ("../controllers/videogames_controllers.js")
const genresControllers = require ("../controllers/genres_controllers")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
router.use('/videogames', videogamesControllers);
router.use('/genres', genresControllers);


module.exports = router;
