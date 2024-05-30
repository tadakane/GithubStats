import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function Input({parentCallback}) {
    const [ data, setData ] = useState(null);
    const { register, handleSubmit} = useForm({})

    let result = [];

    const inputUsername = async (formData) => {
        await fetch(`http://localhost:3000/${formData['username']}`).then(response => response.json()).then(json => setData(json));
    }

    useEffect(() => {
        if (data != null) {
            parentCallback(JSON.stringify(data));
        }
    }, [data]);

    return (
        <form onSubmit={handleSubmit(inputUsername)}>
            <input placeholder="Username..." {...register("username")}/>
            <input type="submit"/>
        </form>
    )
}

export default Input;