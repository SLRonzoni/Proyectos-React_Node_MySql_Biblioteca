

/*const regexEmail = (email) => {
const emailRegex= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

return emailRegex.test(email);
}*/
const regexNombre=(nombre) =>{
    const nombreRegex=/^[\w\S]{2,50}[A-ZÁÉÍÓÚÜÑÇA-ZÁÉÍÓÚÜÑÇa-záéíóúüñç'\s]{1,50}$/i
    return nombreRegex.test(nombre);
}

const regexApellido=(apellido) =>{
    const apellidoRegex=/^[\w\S]{2,50}[A-ZÁÉÍÓÚÜÑÇA-ZÁÉÍÓÚÜÑÇa-záéíóúüñç'\s]{1,50}$/i
    return apellidoRegex.test(apellido);
}

const regexAlias=(alias) =>{
    const aliasRegex=/^[\w\S]{2,50}[A-Z0-9\_]{1,50}$/i
    return aliasRegex.test(alias);
}
    
const regexEmail=(email) =>{
    const emailRegex=/^[\w\S]{2,50}[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+((?:\.[a-zA-Z]{3})+)+((?:\.[a-zA-Z]{2})+)*$/i
    return emailRegex.test(email);
}
   
const regexCategoria=(categoria) =>{
    const categoriaRegex=/^[\w\S]{2,50}[A-ZÁÉÍÓÚÜÑÇA-ZÁÉÍÓÚÜÑÇa-záéíóúüñç'\s]{1,50}$/i
    return categoriaRegex.test(categoria);
}
    
const regexLibro=(libro) =>{
    const libroRegex=/^[\w\S]{2,50}[A-ZÁÉÍÓÚÜÑÇa-záéíóúüñç'\s(0-9)^]{1,50}$/i
    return libroRegex.test(libro);
}

const regexDescripcion=(descripcion) =>{
    const descripcionRegex=/^[A-ZÁÉÍÓÚÜÑÇa-záéíóúüñç'\s]{1,100}$/i
    return descripcionRegex.test(descripcion);
}

const regexCategoriaId=(categoriaId) =>{
    const categoriaIdRegex=/^[0-9]{1,10}$/i
    return categoriaIdRegex.test(categoriaId);
}
        
const regexPersonaId=(personaId) =>{
    const personaIdRegex=/^[0-9]{1,10}$/i
    return personaIdRegex.test(personaId);
}

module.exports = {
    regexNombre,
    regexApellido,
    regexAlias,
    regexEmail,
    regexDescripcion,
    regexLibro,
    regexCategoria,
    regexCategoriaId,
    regexPersonaId,
};
