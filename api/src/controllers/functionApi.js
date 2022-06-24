require("dotenv").config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Genre, Videogame } = require ("../db")




module.exports = {
    getGenres : async () => {
        try {
            const allGenres = axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            .then(response =>response.data.results)
            allGenres.then(e=> {
                e.map(g=>{
                Genre.create({
                    name: g.name, 
                    id: g.id
                })
                })
            })
        } catch (error) {
            console.log(error)
        }
    }, 


    getVideogamesApi : async (name) =>{
        if(!name){
            try {
                pageOne = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
                //pushear en aray 
                let nextpage = pageOne.data.next;
                
                pageTwo = await axios.get(nextpage);
                nextpage = pageTwo.data.next;

                pageThree = await axios.get(nextpage);
                nextpage = pageThree.data.next;
                
                pageFour = await axios.get(nextpage);
                nextpage = pageFour.data.next;

                pageFive = await axios.get(nextpage);
                
                //const page1Videogames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
                //const page2Videogames = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
                //const page3Videogames = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
                //const page4Videogames = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
                //const page5Videogames = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);
                //const data = await Promise.all([page1Videogames,page2Videogames,page3Videogames,page4Videogames,page5Videogames])
                
                const data =  await Promise.all ([pageOne, pageTwo, pageThree, pageFour, pageFive]);
                const dataFinal = data.map( e => e.data.results).flat();
                const videogamesApi = dataFinal.map(e => {
                    return {
                        id: e.id, 
                        name: e.name,
                        decription: e.slug,
                        released: e.released,
                        rating: e.rating,
                        platforms: e.episode || e.platforms.map((p) => p.platform.name),
                        image: e.background_image,
                        genres: e.genres || e.genres.map((g) => g.name),
                    }
                })

                return videogamesApi;

            } catch (err) {
                console.log(err)
            }
        }else{
            try {
                pageOneName = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`);
                
                pageByName = pageOneName.data.results
                //console.log(pageByName)
                
                const videogamesApiByName = pageByName.map(e => {
                    return {
                        id: e.id, 
                        name: e.name,
                        decription: e.slug,
                        released: e.released,
                        rating: e.rating,
                        platforms: e.episode || e.platforms.map((p) => p.platform.name),
                        image: e.background_image,
                        genres: e.genres || e.genres.map((g) => g.name),
                        
                    }
                })
                return videogamesApiByName;
                
            } catch (error) {
                console.log(error)
            }

        
        }
    }



}   