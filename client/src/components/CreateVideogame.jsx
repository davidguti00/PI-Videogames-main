
import { useForm } from "../hooks/useForm.js";
import Loarder from "./images/Loarder"
import "./styles/Loarder.css";


const expresionDate = {
    name: /^[ A-Za-z0-9_@./#&+-]{6,20}$/,  // Letras y numeros, caracteres especiales, min 3 max 20 caracteres.
    date: /^(?:3[01]|[12][0-9]|0?[1-9])([-/.])(0?[1-9]|1[1-2])\1\d{4}$/,  //Fecha dd-mm-aaaa.
    description: /^[\s\S]{0,250}$/, // maximo de 250 caracteres
    rating: /^\d*(\.\d{1})?\d{0,1}$/, // 2 decimales
    image_url: /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&//=]*){0,255}$/,
    
}
//^[0-9]+(\.[05])?$
//[+]?([0-4]*\.[0-9]+|[0-5])

const inicialForm = {
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
    image: "",
};

const validationForm = (form) => {
    
        let errors = {}
        //validacion name

        if(!form.name.trim()){
            errors.name = 'Please, name is required';
        } else if (!expresionDate.name.test(form.name.trim())) {
            errors.name = 'The name of the video game must be between 6 and 20 characters';
    
        //validacion description
        } else if(!form.description.trim()){
            errors.description = 'Add a description of your video game';
        } else if(!expresionDate.description.test(form.description.trim())){
            errors.description = 'Please, This field must have a maximum of 250 characters';
        
        // validacion rating
        } else if(!form.rating){
            errors.rating = 'Please, rating is required';
        } else if (form.rating < 0 || form.rating > 5) {
            errors.rating = 'Please, rating must be between 0 and 5';
        } else if (!expresionDate.rating.test(form.rating)) {
            errors.rating = 'Please, rating must have only 2 decimal places';

         //validacion date
        } else if((!form.released || form.released > new Date())){
            errors.released = 'Please, date is required and must be in the past';

        //validacion genres
        } else if(form.genres.length === 0){
            errors.genres = 'Please, at least 2 genders are required.'
        } else if(form.genres.length > 4){
            errors.genres = 'You can only choose 5 genres per game';
    
        //validacion platforms
        } else if(form.platforms.length === 0){
            errors.platforms = 'Please, at least 2 platforms are required.'
    
        //validacion image url
        } else if (!expresionDate.image_url.test(form.image)) {
            errors.image = "*Image URL is required, or is going to be our default img"
        } else if(! expresionDate.image_url.test(form.image)){
            form.image && (errors.image = 'Please, this field must be a valid URL');
        } return errors;
};


export default function CreateVideogame () {

    const {
        genres,
        platforms,
        form, 
        error, 
        loading, 
        response,
        responsePost,
        handleClick,
        handleChange, 
        handleBlur, 
        handleSelectGenre,
        handleSelectPlatforms,
        handleDeleteGenres,
        handleDeletePlatforms,
        handleSubmit,
    } = useForm(inicialForm, validationForm)

        let styles = {
            fontWeight: "bold",
            color: "#dc3545",
            "fontSize": "13px",
        }

    return(
        <div>
            <h2>formulario para crear video game con hook personalizado</h2> 
        
        <form onSubmit={handleSubmit}>
        
            {/* ..... Nombre ..... */}
            <div className="formulario__grupo" id="grupo__name">
                <label className="formulario__label">Name:</label>
                    <div className="formulario__grupo-input">
                        <input
                            className="formulario__input"
                            type="text"    
                            name="name" 
                            placeholder="escribe el nombre del videojuego"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.name}
                            required
                        />
                        <i className="formulario__validacion-estado"  > </i>
                    </div>
                {error.name && ( <p className="formulario__input-error" style = {styles} >{error.name}</p> )}
            </div>

            {/* ..... Descripcion ..... */}
            <div className="formulario__grupo" id="grupo__description">
                <label className="formulario__label">Description:</label>
                    <div className="formulario__grupo-input">
                            <textarea 
                            className="formulario__input"
                            name="description"
                            id="description"
                            cols="50"
                            rows="5"
                            placeholder="escribe la descripcion del videojuego"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.description}
                            required
                        > </textarea>
                    <i className="formulario__validacion-estado"  > </i>
                    </div>
                {error.description && ( <p className="formulario__input-error" style = {styles} >{error.description}</p> )}
            </div>

            {/* ..... Rating ..... */}
            <div className="formulario__grupo" id="grupo__rating">
                <label className="formulario__label">Rating:</label>
                    <div className="formulario__grupo-input">
                        <input
                            className="formulario__input"
                            type="number"
                            name="rating"
                            id="rating"
                            step={0.01}
                            min="0"
                            max="5"
                            placeholder="4.34"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.rating}
                            required
                        />
                    <i className="formulario__validacion-estado"  > </i>
                    </div>
                {error.rating && ( <p className="formulario__input-error" style = {styles} >{error.rating}</p> )}
            </div>

            {/* ..... Fecha de lanzamiento ..... */}
            <div className="formulario__grupo" id="grupo__released">
                <label className="formulario__label">Released:</label>
                    <div className="formulario__grupo-input">
                        <input
                            className="formulario__input"
                            type="date"
                            name="released"
                            id="released"
                            placeholder="DD-MM-YYYY"
                            max={new Date().toISOString().split('T')[0]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.released}
                            required
                        />
                    <i className="formulario__validacion-estado" > </i>
                    </div>
                {error.released && ( <p className="formulario__input-error" style = {styles} >{error.released}</p> )}
            </div>

            {/* ..... Géneros ..... */}
            <div className="formulario__grupo">
                <div>
                    <label className="formulario__label">Genres: </label>
                    <br />
                </div>
                <div>
                    <select 
                        className="formulario__input" 
                        onBlur={handleBlur}
                        onChange={handleSelectGenre}>
                            
                        <option disabled={form.genres.length > 0}>Select Genres</option>
                        {genres?.map((e, i) => (
                        <option key={i} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    {error.genres && ( <p className="formulario__input-error" style = {styles} >{error.genres}</p> )}
                </div>
                {/* ..... Generos Seleccionadas ..... */}
                <div>
                    <div className="box-input">
                        <label>Genres selected:</label>
                        <br/>
                        
                        {form.genres?.map((element, i) =>
                            <div key={i} className="box-input-element">
                                <span>{element}</span>
                                <button 
                                    className="ButtonX" 
                                    type="reset"
                                    onBlur={handleBlur}
                                    onClick={ ()=> handleDeleteGenres(element) }
                                >X</button>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>

            {/* ..... Plataformas ..... */}
            <div className="formulario__grupo">
                <div>
                    <label className="formulario__label">Platform: </label>
                    <br />
                </div>
                <div>
                    <select 
                        className="formulario__input"
                        onBlur={handleBlur} 
                        onChange={handleSelectPlatforms}>
                        <option disabled={form.platforms.length > 0}>Select Platforms</option>
                        {platforms?.map((e, i) => (
                        <option key={i} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    {error.platforms && ( <p className="formulario__input-error" style = {styles} >{error.platforms}</p> )}
                </div>
                {/* ..... Plataformas Seleccionadas ..... */}
                <div>
                    <div className="box-input">
                        <label>Platforms selected:</label>
                        <br/>
                        
                        {form.platforms?.map((element, i)=>
                            <div key={i} className="box-input-element">
                                <span>{element}</span>
                                <button 
                                    className="ButtonX" 
                                    type="reset" 
                                    onBlur={handleBlur} 
                                    onClick={ ()=> handleDeletePlatforms(element) }
                                >X</button>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>

            {/* ..... Imagen url ..... */}
            <div className="formulario__grupo" id="grupo__image">
                <label className="formulario__label">Image URL:</label>
                    <div className="formulario__grupo-input">
                        <input
                            className="formulario__input"
                            type="url"
                            name="image"
                            id="image"
                            placeholder="URL of the videogame image"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.image}
                            required
                        />
                    <i className="formulario__validacion-estado" > </i>
                    </div>
                {error.image && ( <p className="formulario__input-error" style = {styles} >{error.image}</p> )}
            </div>


            <div className="formulario__grupo formulario__grupo-btn-enviar">
                <button 
                type="submit" 
                className="formulario__btn"
                >Enviar</button>
                <p className="formulario__mensaje-exito" id="formulario__mensaje-exito"></p>
            </div>
            
        </form>
        {loading && <Loarder/>}
        {response && <responsePost/>}

        <button onClick={(e) => {handleClick(e)}} className="ButtonBack">Back to home!</button>
        </div>
        
    )

}
