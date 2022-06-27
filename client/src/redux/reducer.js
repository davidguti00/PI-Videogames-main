import {
    GET_ALL_VIDEOGAMES,
    GET_DETAILS,
    GET_VIDEOGAMES_BY_NAME,
    GET_GENRES,
    FILTER_BY_GENRE,
    FILTER_BY_CREATED,
    FILTER_BY_ALPHA,
    FILTER_BY_RATING,
    GET_PLATFORMS,
    CLEAR_STATE,

    } from './actions';


const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    detail:[],
    platforms:[],
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            }

        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload,
            }

        case GET_VIDEOGAMES_BY_NAME:
            return{
                ...state,
                videogames: action.payload
            }
        
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            }
        case FILTER_BY_GENRE:
            const filterByGenre = state.allVideogames;
            const genre = action.payload === "all"
                ? filterByGenre
                : filterByGenre.filter((e) => e.genres && e.genres
                        .map((genres) => genres.name)
                        .includes(action.payload)
                );
            return {
                ...state,
                videogames: genre,
            }

        case FILTER_BY_CREATED:
            const filterCreated = action.payload === 'created'
            ? state.allVideogames.filter(e => e.createdInDb)
            : state.allVideogames.filter(e => !e.createdInDb)
            return{
                ...state,
                videogames: action.payload === 'all'
                ? state.allVideogames : filterCreated
            }

        case FILTER_BY_ALPHA:
            let videoAlpha = [...state.videogames]
            videoAlpha = videoAlpha.sort((a,b) =>{
                if(a.name.toLowerCase() < b.name.toLowerCase()) {
                return action.payload === 'ASC' ? -1 : 1
                }
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                return action.payload === 'DESC' ? -1 : 1
                }else{
                return 0}
            })
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : videoAlpha
            }
    
        case FILTER_BY_RATING:
            let filterByRating = action.payload === "asc"
                ? state.videogames.sort((a, b) => {
                    return b.rating - a.rating;
                })
                : state.videogames.sort((a, b) => {
                    return a.rating - b.rating;
                });
            return {
                ...state,
                videogames: filterByRating,
                }

        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }

        case CLEAR_STATE:
            return{
                ...state,
                detail: action.payload,
            }
    
        default: return state;

    }

}

export default rootReducer