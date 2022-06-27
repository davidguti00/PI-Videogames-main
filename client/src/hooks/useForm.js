import { useState } from "react";

export const useForm = (inicialForm, validateForm)=>{
    const[form, setForm] = useState(inicialForm);
    const[error, setErrors] = useState({});
    const [loading, setLoading] = useState (false);
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const{name, value} =e.target;

        setForm({
            ...form,
            [name]:value
        })
    };

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    };

    const handleSubmit = (e) => {};

    return{
        form, 
        error, 
        loading, 
        response, 
        handleChange, 
        handleBlur, 
        handleSubmit,
    }
    
    

}