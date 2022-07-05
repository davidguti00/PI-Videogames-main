import React from "react";
import "./styles/Card.css"
import { starsValue } from "../hooks/functions";


export default function Cards({ name, image, genres, rating, props }) {

    
    return (
        <div className="card">
            
            <img src={image} alt="imagen del juego" className="imgCard" />
            <h1 className="NameTitle">{name.replace(name[0], name[0].toUpperCase())}</h1>
            <div className="info">
                {genres?.map(e => {
                    if (typeof (e) === 'string') {
                        return (
                            <span className="type" key={e}>
                                {e.replace(e[0], e[0].toUpperCase())}
                            </span>
                        )
                    }
                    else {
                        return (
                            <h4 key={e.name}>
                                {" " +e.name+ " "} 
                            </h4>
                        )
                    }
                })}
                
                <div>
                    <br/>
                    <h3 className="ContentTitle">Rating</h3>
                    <span className="RatingNumber">{rating}</span>
                    <h4>{starsValue(rating)}</h4>
                </div>
            </div>
        </div>
    )
}