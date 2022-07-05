import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    getVideogames, 
    getGenres,
    filterVideogameByGenre,
    filterByCreated,
    filterByAlpha, 
    filterByRating,
}from "../redux/actions";
import { Link } from "react-router-dom";
import "./styles/Home.css";
import Cards from "./Cards.jsx";
import NavBar from "./NavBar.jsx"

import Paginated from "./Paginated.jsx";
import "./styles/SearchBar.css";

import NotFound  from "./NotFound";

import Loarding from "./images/Loarding"
import "./styles/Loarding.css";

export default function Home() {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    const allVideogamesLoad = useSelector((state) => state.allVideogames)
    const genres = useSelector((state) => state.genres);

    const [order, setOrder] = useState('')
    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamePP, /*setVideogamePP*/] = useState(15);
    const lastVideogame = currentPage * videogamePP;
    const indexFirstVideogame = lastVideogame - videogamePP;
    const currentVideogames = allVideogames.slice(indexFirstVideogame, lastVideogame)
    const prevPage = currentPage -1;
    const nextPage = currentPage +1;

    const paginated = (pageNumber) =>{
        setCurrentPage(pageNumber)
    };

    const handlePrev = () =>{
        setCurrentPage(prevPage)
    };

    const handleNext = () =>{
        setCurrentPage(nextPage)
    };

    useEffect(()=>{
        dispatch(getVideogames())
        dispatch(getGenres());
    },[dispatch])

    // function handleClick(e) {
    //     e.preventDefault()
    //     dispatch(getVideogames())
    //     setCurrentPage(1)
    // }

    function handleFilterGenre(e) {
        e.preventDefault()
        dispatch(filterVideogameByGenre(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterByCreated(e) {
        e.preventDefault()
        dispatch(filterByCreated(e.target.value))
    }

    function handleFilterByAlpha(e) {
        e.preventDefault()
        dispatch(filterByAlpha(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }
    function handleFilterByRating(e) {
        e.preventDefault()
        dispatch(filterByRating(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }
    

    return(
        <div className="allHome"> 
        {!allVideogamesLoad.length ?
            <div className="loading1">
                <Loarding/> 
            </div>:
            <div className="allHome">
                <div>
                    <NavBar/>
                </div>
            
                <div class="filter-container">
                    <select className="custom-select" onChange={e =>  handleFilterByAlpha(e)} defaultValue= "Alphabetical order">
                        <option disabled={order}>Alphabetical order</option>
                        <option value='ASC'>A-Z</option>
                        <option value='DESC'>Z-A </option>
                    </select>
                    <select className="custom-select" id="ratingSelect" onChange={e =>  handleFilterByRating(e) } defaultValue= "Select Rating">
                        <option disabled={order} >Select Rating</option>
                        <option value="asc">to the most popular</option> to the least popular
                        <option value="desc">to the least popular</option>
                    </select>
                    <select className="custom-select" name="genres" onChange={(e) => handleFilterGenre(e)} defaultValue= "All Genres">
                        <option value={'all'}>All Genres</option>
                            {genres?.map((x,id) => {
                                return  <option value={x.name} key={id}>{x.name}</option>;
                            })}
                    </select>
                    <select className="custom-select" id="originSelect" onChange={(e) => handleFilterByCreated(e)} defaultValue= "All Video Games">
                        <option value="all">All Video Games</option>
                        <option value="api">Existing</option>
                        <option value="created">Created</option>
                    </select>
                </div>
                
                <div className="card-container">
                    <Paginated
                        currentPage={currentPage}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        allVideogames={allVideogames.length}
                        videogamePP={videogamePP}
                        paginated={paginated}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />
                {currentVideogames.length ? 
                currentVideogames?.map((e) => {return (
                            <Link  to={"/home/" + e.id} key={e.id}>
                                <Cards 
                                    name={e.name}
                                    image={e.image}
                                    genres={e.genres}
                                    platforms={e.platforms}
                                    rating={e.rating}
                                />
                            </Link>
                )}): 
                    <div >
                        <NotFound/>
                    </div>
                }
                </div>
                {/* <Paginated
                    currentPage={currentPage}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    allVideogames={allVideogames.length}
                    videogamePP={videogamePP}
                    paginated={paginated}
                    nextPage={nextPage}
                    prevPage={prevPage}
                /> */}
            </div>
        }
        </div>
    )
}

