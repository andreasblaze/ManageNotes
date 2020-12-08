import React, { useState,useEffect } from "react";

const useForm = (initialFieldValues, validate, setCurrentId) => {
    const [values,setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    
    const handleInputChange = e => {
        const {name,value} = e.target
        const fieldValues = {[name]: value}
        setValues({
            ...values,
            ...fieldValues,
            [name]:value
        })
        validate(fieldValues)
    }

    const resetForm = () =>{
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        setCurrentId(0)
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

export default useForm;