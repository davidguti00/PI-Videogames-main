import React from "react";


export const Paginated = ({allVideogames, videogamePP, paginated, prevPage, handleNext, handlePrev, nextPage, currentPage}) =>{
    const max = allVideogames/videogamePP
    const pageNumbers = []
    for (let i = 0; i <Math.ceil(max); i++) {
        pageNumbers.push(i + 1)
    }
//console.log(pageNumbers.length);

    return(
        <nav>
            <ul className="paginated">
                <p className="btnPage" onClick={()=>{paginated(pageNumbers[0])}}>1</p>
                
                <button className = "btnPagina" disabled = {prevPage === 0? true : false}
                    onClick = {handlePrev}>
                    Prev
                </button>
                <p className="btnPage">{currentPage} de {pageNumbers.length} </p>
                <button className = "btnPagina" disabled = {nextPage > pageNumbers.length ? true : false}
                    onClick = {handleNext}>
                    Next
                </button>
                <p className="btnPage" onClick={()=>{paginated(pageNumbers.length)}}>{pageNumbers.length}</p>
            </ul>
        </nav>
    )
}