// .wrapper
// 	.card
// 		img(src="https://images.unsplash.com/photo-1477666250292-1419fac4c25c?auto=format&fit=crop&w=667&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D")
// 		.info
// 			h1 Mountain
// 			p Lorem Ipsum is simply dummy text from the printing and typeseting industry
// 			button Read More

// 	.card
// 		img(src="https://images.unsplash.com/photo-1425342605259-25d80e320565?auto=format&fit=crop&w=750&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D")
// 		.info
// 			h1 Road
// 			p Lorem Ipsum is simply dummy text from the printing and typeseting industry
// 			button Read More
			
// 	.card
// 		img(src="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?auto=format&fit=crop&w=311&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D")
// 		.info
// 			h1 Protester
// 			p Lorem Ipsum is simply dummy text from the printing and typeseting industry
// 			button Read More


import React from "react";
import "./styles/Cards.css"


export default function Cards({ name, image, genres, rating }) {

    
    return (
        <div className="card">
            <h1 className="NameTitle">{name.replace(name[0], name[0].toUpperCase())}</h1>
            <img src={image} alt="imagen del juego" className="imgCard" />
            <div className="divInfo">
                <h3 className="ContentTitle">Genres</h3>
                {genres?.map(e => {
                    if (typeof (e) === 'string') {
                        return (
                            <span className="type" key={e}>
                                {e.replace(e[0], e[0].toUpperCase())} |
                            </span>
                        )
                    }
                    else {
                        return (
                            <span key={e.name}>
                                {e.name} |
                            </span>
                        )
                    }
                })}
                <div className="otherCaracters">
                    <h4 className="ContentTitle">Rating</h4>
                    <span className="RatingNumber">{rating}</span>
                </div>
            </div>
        </div>
    )
}