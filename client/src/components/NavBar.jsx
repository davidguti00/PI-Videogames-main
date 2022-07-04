import React from "react";
import "./styles/Navbar.css";

import SearchBar from "./SearchBar.jsx";


export default function NavBar() {


    
    return(
        <div className="wrapper">
                <nav>
                    <input type="checkbox" id="show-search"></input>
                    <input type="checkbox" id="show-menu"></input>
                    <label htmlFor="show-menu" className="menu-icon"><i className="fas fa-bars"></i></label>
                    <div className="content">
                    <div className="logo"><a href="/home">Videogame app</a></div>
                        <ul className="links">
                            <li><a href='/create'>Create Videogame</a></li>
                        </ul>
                        <form className="search-box">
                        <div className="search-icon"><i className="fas fa-search"></i>
                            <SearchBar/>
                        </div>
                    </form>
                    </div>
                    
                </nav>
        </div>
    )
}

