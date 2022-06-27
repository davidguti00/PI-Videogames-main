import React ,{ useEffect, useState }from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { useForm } from "../hooks/useForm.js";
import { getGenres,  postVideogame, getPlatform } from '../redux/actions.js'


const expresionDate = {
    name: /^[ A-Za-z0-9_@./#&+-]{6,20}$/,  // Letras y numeros, caracteres especiales, min 3 max 25 caracteres.
    date: /^(?:3[01]|[12][0-9]|0?[1-9])([-/.])(0?[1-9]|1[1-2])\1\d{4}$/,  //Fecha dd-mm-aaaa.
    description: /^[\s\S]{0,250}$/, // maximo de 250 caracteres
    rating: /^[+]?([0-4]*\.[0-9]+|[0-4])/, //numeros de 0 a 5.
    image_url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
}
//^[0-9]+(\.[05])?$
//[+]?([0-4]*\.[0-9]+|[0-5])

const inicialForm = {
    name: "",
    description: "",
    released: "",
    rating: "",
    genre: [],
    platforms: [],
    image: ""
};

const validationForm = (form) => {
    
        let errors = {}
        //validacion name

        if(!form.name.trim()){
            errors.name = 'Please, name is required';
        } else if (!expresionDate.name.test(form.name.trim())) {
            errors.name = 'The name of the videogame must be between 6 and 20 characters';
    
        //validacion description
        } else if(!form.description.trim()){
            errors.description = 'Add a description of your video game';
        } else if(!expresionDate.description.test(form.description.trim())){
            errors.description = 'Please, This field must have a maximum of 250 characters';
    
        //validacion rating
        } else if(!form.rating.trim()){
            errors.rating = 'Please, rating is required';
        } else if (!expresionDate.rating.test(form.rating.trim())) {
            errors.rating = 'The rating must be a number from 1 to 4.99';
    
        //validacion date
        } else if(!form.released.trim() || form.released.trim() > new Date()){
            errors.released = 'Please, date is required and must be in the past';
        } else if (!expresionDate.released.test(form.released.trim())) {
            errors.released = ' You must enter date with "dd-mm-yyyy" format ';
    
        //validacion genres
        } else if(form.genres.length === 0){
            errors.genres = 'Please, at least one genre is required'
        } else if(form.genres.length > 3){
            errors.genres = 'You can only choose 3 genres per game';
    
        //validacion platforms
        } else if(form.platforms.length === 0){
            errors.platforms = 'Please, at least one platform is required'
        } else if(form.platforms.length > 3){
            errors.platforms = 'You can only choose 3 platforms per game'
    
        //validacion image url
        } else if (!expresionDate.image_url.test(form.image)) {
            errors.image = "*Image URL is required, or is going to be our default img"
        // } else if(! expresionDate.image_url.test(videogame.image)){
        //     videogame.image && (errors.image = 'Please, this field must be a valid URL');
        } return errors;
};


export default function CreateVideogame () {

    const {
        form, 
        error, 
        loading, 
        response, 
        handleChange, 
        handleBlur, 
        handleSubmit,
    } = useForm(inicialForm, validationForm)
    return(
        <div>
            <h2>formulario para crear video game con hook personalizado</h2> 
        <form onSubmit={handleSubmit}>
            <input 
                type="text"    
                name="name" 
                placeholder="escribe el nombre del videojuego"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.name}
                required
            />
            {error.name && <p>{error.name}</p>}

            <textarea 
                name="description"
                cols="50"
                rows="5"
                placeholder="escribe la descripcion del videojuego"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.description}
                required

            > </textarea>
            {error.description && <p>{error.description}</p>}

            <div className="formulario__grupo">
                <label class="formulario__label">Rating:</label>
                    <div class="formulario__grupo-input">
                        <input
                            class="formulario__input"
                            type="text"
                            name="rating"
                            id="rating"
                            placeholder="1.34"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.rating}
                            required
                        />
                    <i class="formulario__validacion-estado" image > </i>
                    </div>
                {error.rating && ( <p className="formulario__input-error">{error.rating}</p> )}
            </div>


                <input 
                type="submit"    
                value="Enviar"
                
            />
            
        </form>
        </div>
        
    )


}


















































//     const dispatch = useDispatch()
//     const history = useHistory()
//     const genres = useSelector((state) => state.genres)





//     const [errors, setErrors] = useState({});
//     const [videogame, setVideogame] = useState({
//         name: "",
//         description: "",
//         released: "",
//         rating: "",
//         genre: [],
//         platforms: [],
//         image: ""
//     })
    
//     useEffect(() => {
//             dispatch(getVideogames())
//             dispatch(getGenres())
//         },[dispatch])

//     function handleChange(e) {
//         setVideogame({
//             ...videogame,
//             [e.target.name]: e.target.value,
//         })
//         setErrors(validate({
//             ...videogame,
//             [e.target.name]: e.target.value,
//         }))
//     }

//     function handleSelectGenre(e) {
//         if(e.target.value !== 'Select Genre')
//         if(!videogame.genre.includes(e.target.value)){
//             setVideogame({
//                 ...videogame,
//                 genre: [...videogame.genre, e.target.value],
//             });
//             setErrors(validate({
//                 ...videogame,
//                 genre: [...videogame.genre, e.target.value],
//             }))
//         }    
//     }

//     function handleDeleteGenres(e) {
//         setVideogame({
//             ...videogame,
//             genre: videogame.genre.filter(element => element !== e)
//         })
//     }





//     // function handleSubmit(e) {
//     //     e.preventDefault()
//     //     if (!errors.name && !errors.description && !errors.released && !errors.rating) {
//     //         if (!videogame.name) {
//     //             alert('You must add a name')
//     //         } else if (!videogame.description) {
//     //             alert('You must add a description')
//     //         } else if (videogame.genre.length < 1) {
//     //             alert('You must add at least one genre')
//     //         } else if (videogame.platforms.length < 1) {
//     //             alert('You must add at least one platform')
//     //         } else {
//     //             dispatch(postVideogame(videogame))
//     //             alert('Videogame Created!')
//     //             setVideogame({
//     //                 name: "",
//     //                 description: "",
//     //                 released: "",
//     //                 rating: "",
//     //                 genres: [],
//     //                 platforms: [],
//     //                 image: ""
//     //             })
//     //         history.push('/home')
//     //         }
//     //     } else {
//     //         alert('Faltan datos necesarios para crear el videojuego')
//     //     }
//     // }


//     return(
//         <div className="componentCreate">
//             <div className="createButton">
//             <Link to="/home">
//                 <button>
//                 <h3>Back to Home</h3>
//                 </button>
//             </Link>
//             </div>
//             <div className="formulario" id="formulario">
//                 <h2>¡Add a new videogame!</h2>
//                 <form>{/* <form onSubmit={(e) => handleSubmit(e)}> */}
//                     <br/>
                    
//                     <div className="formulario__grupo" id="grupo__name">
//                         <label class="formulario__label">Name:</label>
//                         <div class="formulario__grupo-input">
//                             <input
//                                 class="formulario__input"
//                                 type="text"
//                                 name="name"
//                                 id="name"
//                                 placeholder="Videogame name"
//                                 value={videogame.name}
//                                 onChange={(e) => handleChange(e)}
//                             />
//                             <i class="formulario__validacion-estado" image > </i>
//                         </div>
//                         {errors.name && ( <p className="formulario__input-error">{errors.name}</p> )}
//                     </div>

//                     <div className="formulario__grupo" id="grupo__description">
//                         <label class="formulario__label">Description:</label>
//                         <div class="formulario__grupo-input">
//                             <input
//                                 class="formulario__input"
//                                 type="text"
//                                 name="description"
//                                 id="description"
//                                 placeholder="Videogame description"
//                                 value={videogame.description}
//                                 onChange={(e) => handleChange(e)}
//                             />
//                             <i class="formulario__validacion-estado" image > </i>
//                         </div>
//                         {errors.description && ( <p className="formulario__input-error">{errors.description}</p> )}
//                     </div>

//                     <div className="formulario__grupo" id="grupo__released">
//                         <label class="formulario__label">Released:</label>
//                         <div class="formulario__grupo-input">
//                             <input
//                                 class="formulario__input"
//                                 type="text"
//                                 name="released"
//                                 id="released"
//                                 placeholder="DD-MM-YYYY"
//                                 value={videogame.released}
//                                 onChange={(e) => handleChange(e)}
//                             />
//                             <i class="formulario__validacion-estado" image > </i>
//                         </div>
//                         {errors.released && ( <p className="formulario__input-error">{errors.released}</p> )}
//                     </div>

//                     <div className="formulario__grupo">
//                         <label class="formulario__label">Rating:</label>
//                         <div class="formulario__grupo-input">
//                             <input
//                                 class="formulario__input"
//                                 type="text"
//                                 name="rating"
//                                 id="rating"
//                                 placeholder="1.34"
//                                 value={videogame.rating}
//                                 onChange={(e) => handleChange(e)}
//                             />
//                             <i class="formulario__validacion-estado" image > </i>
//                         </div>
//                         {errors.rating && ( <p className="formulario__input-error">{errors.rating}</p> )}
//                     </div>






// {/* ..... Géneros ..... */}
//                     <div className="genres">

// <div>
  
//   <label>Genres: </label>
//   <br />
// </div>
// <div>
//   <select  className="selectBox" onChange={(e) => handleSelectGenre(e)} >
//     <option disabled={videogame.genre.length > 0}>Select Genre</option>
//     {genres?.map((e) => (
//       <option value={e.name}>{e.name}</option>
//     ))}
//   </select>
// </div>
// <div>
//   {/* ..... Generos Seleccionadas ..... */}

//   <div cassName="cajita">
//     <label>Genres selected:</label>
//     <br/>
//     {videogame.genre?.map(element =>
//       <div className="cajitaElemento">
//         <span>{element}</span>
//         <button className="ButtonX" type="reset" onClick={() => handleDeleteGenres(element)}>X</button>
//       </div>
//     )}
//   </div>

// </div>
// </div>



//                     <div class="formulario__grupo formulario__grupo-btn-enviar">
//                         <button type="submit" class="formulario__btn">Enviar</button>
//                         <p class="formulario__mensaje-exito" id="formulario__mensaje-exito">Formulario enviado exitosamente!</p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
//};