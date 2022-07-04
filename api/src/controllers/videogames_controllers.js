require("dotenv").config();
const express = require('express');
const router = express.Router();
const { API_KEY } = process.env;
const {Op} = require ('sequelize');
const { Videogame, Genre} = require ('../db');
const { default: axios } = require('axios');
const { getVideogamesApi } = require ("./functionApi");
const { getVideogamesDb } = require ("./functionDataBase");




router.get('/', async (req, res, next)=>{
    const { name } = req.query
    try {
        const dataApi = await getVideogamesApi(name); 
        const dataDb = await getVideogamesDb(name);   
//console.log(dataDb);
        const finalConcat = dataDb.concat(dataApi);

//if(!finalConcat.length) return res.send('No response').status(404);
        return res.status(200).json(finalConcat);
    } catch (err) {
        next(err)
    }
});


router.get('/:id', async (req, res, next)=>{
    const { id } = req.params;
    if(id.length > 8){
        try {
            const videogameId = await Videogame.findByPk(id,{  
                include:{
                    model: Genre,
                    attributes:['name'],
                    through: {
                        attributes: [],
                    }
                }
            })
            res.send(videogameId);
        } catch (err) {
            next(err)
        
        }
    }else{
        try {
            const videogameIdApi = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            // console.log(videogameIdApi)
            let e = videogameIdApi.data;
            const detailObj = {
                id: e.id, 
                name: e.name,
                description: e.description,
                released: e.released,
                rating: e.rating,
                platforms: e.episode || e.platforms.map((p) => p.platform.name),
                image: e.background_image,
                genres: e.genres || e.genres.map((g) => g.name),
            }
            return res.send(detailObj);
        } catch (err) {
            next(err)
        }
    }
});



router.post('/', async (req, res, next)=>{
    const { name, description, released, image, rating, genres, platforms } = req.body
    try {
        if( name && description && released && image && rating && genres && platforms ){
            let [newVideogame, created] = await Videogame.findOrCreate({
                where:{
                    name,
                    description,
                    released,
                    rating,
                    platforms,
                    image,
                },
                default:{
                    name,
                    description,
                    released,
                    rating,
                    platforms,
                    image,
                }
            })
            
            let genreFind = await Genre.findAll({
                where:{
                    name:{
                        [Op.or]: genres
                    }
                }
            })

            await newVideogame.addGenre(genreFind)
            
            if(!created){
                return res.status(200).send("el videojuego ya existe")
            }else  return res.status(201).send("el videojuego se creo correctamente").json(newVideogame)

        } return res.send("Missing data")
    } catch (err) {
        next(err)
    }
});



module.exports = router;