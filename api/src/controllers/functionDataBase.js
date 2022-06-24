require("dotenv").config();
const {Op} = require ('sequelize');
const { Genre, Videogame } = require ("../db")



module.exports = {

    getVideogamesDb : async (name) =>{
        if(!name){
            try {
            const videogameDb = await Videogame.findAll({
                attributes:[
                    'id',
                    'name',
                    'description',
                    'released',
                    'rating',
                    'platforms',
                    'image',
                    'createdInDb',
                    
                ],
                include: {
                    model: Genre,
                    attributes:['name'],
                    // through: {
                    //     attribute:[]
                    // }
                },
            })
            return videogameDb;

            } catch (error) {
                console.log(error)
                return error
            }  
        }else{
            try{
                let nameDb = await Videogame.findAll({
                    where:{
                        name:{[Op.iLike]: `%` + name + `%`},    
                    },
                        attributes:{
                            exclude:['createdInDb','createdAt','updatedAt']
                        },
                        
                        include: {
                            model: Genre,
                            attributes:['name'],
                            through: {
                                attribute:[]
                            }
                        },
                });
                return nameDb
                
            } catch (error){
                console.log(error)
                return  error
            }
        }
    },
}