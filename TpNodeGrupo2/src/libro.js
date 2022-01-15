const connection = require('./db');
const router = require('express').Router();
const { regexCategoriaId, regexDescripcion, regexPersonaId, regexLibro} = require('./validaciones');

//POST                                                            
router.post('/nuevo', async (req, res) => {
    try{
        //validar que envien todos los valores obligatorios
        if(!req.body.nombre || !req.body.categoria_id ){
            return res.status(400).json({msg:'Datos insuficientes: nombre y categoria son datos obligatorios'});
        }
        
        //asignar los datos del body a variables
        let libro=req.body.nombre;
        let descripcion=req.body.descripcion;
        let categoriaId=req.body.categoria_id;
        let personaId=req.body.persona_id;
        
        //verificar que los datos tengan los caracteres que se necesitan
        if( (!regexLibro(libro))  ){
            return res.status(400).json({msg: 'El nombre no puede estar vacio y solo puede contener 50 caracteres entre letras, numeros, espacios y apostrofe'});
        }
        
        if(!regexDescripcion(descripcion)){
            return res.status(400).json({msg:'La descripcion solo puede contener 100 caracteres entre letras, espacios y apostrofe'});
        }
         
        if(!regexCategoriaId(categoriaId)){
            return res.status(400).json({msg:'La categoria debe ser numerica'});
        }
          
        if(!regexPersonaId(personaId)){
            return res.status(400).json({msg:'La persona debe ser numerica o null'});
        }
                  
        // verificar que no exista el libro en la base de datos
        let query ='SELECT nombre FROM libro WHERE nombre = ?';
        let respuesta = await connection.query(query,[libro]);
        if(respuesta.length > 0){
            return res.status(400).json({msg: 'El libro que intenta ingresar, ya existe'});
        }

        // verificar que exista la categoria
        query ='SELECT id FROM categoria WHERE id=?';
        respuesta = await connection.query(query,[categoriaId]);
        if(respuesta.length === 0){
            return res.status(404).json({msg:'La categoria ingresada, no existe'});
        }

        // verificar que exista la persona
        query ='SELECT id FROM persona WHERE id=?';
        respuesta = await connection.query(query,[personaId]);
        if (respuesta.length === 0) {
            personaId=0;
            var alerta=1;
        }      

        //cargar el registro                    
        query ='INSERT INTO libro (id, nombre, descripcion, categoria_id, persona_id) VALUES (?,UPPER(?),UPPER(?),?,?)';
        respuesta = await connection.query(query,[req.body.id,libro,descripcion,categoriaId,personaId]);
        
        //mostrar el nuevo registro
        query='SELECT id, nombre, descripcion, categoria_id, persona_id FROM libro WHERE nombre=?';
        respuesta=await connection.query(query,[libro]);
        if(alerta===1){
            res.status(201).json ({'No se encuentra a la persona ingresada. Valor de persona asignado = NULL. Nuevo libro ': respuesta}); 
        } else{
            res.status(201).json (respuesta);
        }
    }

    catch (error){
        console.error(error.message);
        return res.status(500).json({msg:"Error Inesperado"}); 
    }
});
                                   

//GET                                                                     
router.get('/', async (req, res) => {
    try{
        //LISTA TODOS LOS LIBROS DE LA BIBLIOTECA COMO ESTAN EN LA BASE DE DATOS
        const query= "SELECT libro.id, libro.nombre , libro.descripcion, libro.categoria_id , libro.persona_id FROM libro ";
        const respuesta = await connection.query(query);
        res.status(200).json(respuesta);
    }

    catch (error){
        console.error(error.message);
        return res.status(500).json({msg:"Error Inesperado"}); 
    }
});


//GET               
router.get('/:id', async (req, res) => {
    // verificar que exista el libro en la base de datos
    try{
        const query ='SELECT id,nombre,descripcion,categoria_id,persona_id FROM libro WHERE  id = ?';
        const  respuesta = await connection.query(query,[req.params.id]);
        if(respuesta.length ===  0){
            return res.status(404).json({msg:'No se encuentra el libro'});
        }
        res.status(200).json(respuesta);  
    }

    catch (error){
        console.error(error.message);
        return res.status(500).json({msg:"Error Inesperado"}); 
    }
});

//PUT '/libro/edita/:id'                                          
router.put('/edita/:id', async (req, res) => {
    try{  
        let query ='SELECT id FROM libro WHERE id = ?';
        let respuesta = await connection.query(query,[req.params.id]);
        if(respuesta.length === 0){ 
            return res.status(404).json({msg:'El libro que intenta modificar, no existe'}); 
        }

        if(!req.body.descripcion){
            return res.status(400).json({msg: 'Solo se puede modificar la descripcion ,descripcion no enviada'});
        }        
          
          
        //verificar que la descripcion tenga los caracteres que se necesitan
        if(!regexDescripcion(req.body.descripcion)){
            return res.status(400).json({msg:'La descripcion solo puede contener 100 caracteres entre letras, espacios y apostrofe'});
        }
            
        //actualiza solo DESCRIPCION en el registro
        query ='UPDATE libro SET descripcion=UPPER(?) WHERE id = ?';
        respuesta = await connection.query(query,[req.body.descripcion,req.params.id]);
           
        //muestra el registro con los valores actualizados
        query='SELECT persona_id FROM libro WHERE id=?';
        respuesta=await connection.query(query,[req.params.id]);        
        res.status(200).json({ msg: 'Descripcion actualizada correctamente'})
    }
   
    catch (error){
        console.error(error.message);
        return res.status(500).json({msg: 'Error inesperado'});
    }
});


//PUT '/libro/presta/:id'
router.put('/presta/:id', async (req, res) => {
    try {
        // verificar que exista
        let query ='SELECT id FROM libro WHERE id = ?';
        let respuesta = await connection.query(query,[req.params.id]);
        if(respuesta.length === 0){
            return res.status(404).json({msg:'No se encontro el libro'});
        }
        
        //validar que me manden correctamente la info
        if(!req.body.persona_id){
            return res.status(400).json({msg:'Falta id de la persona que se llevara el libro'});
        }
        
        // verificar que los datos no sean espacios 
        if (req.body.persona_id === "  " ){
            return res.status(400).json({msg:'Los datos no pueden estar vacios'});
        }
                
        //verificar que la descripcion tenga los caracteres que se necesitan y tenga solo espacios
        if(!regexPersonaId(req.body.persona_id)){
            return res.status(400).json({msg:'La persona debe ser numerica'});
        }

        //verificar que exista la persona
        query ='SELECT id FROM persona WHERE id = ?';
        respuesta = await connection.query(query,[req.body.persona_id]);
        if(respuesta.length == 0 ) {
            return res.status(404).json({msg: 'No se encontro a la persona a la que se le quiere prestar el libro'});
        }

        // verificar que no esté prestado ...cuando está en la biblioteca, persona_id =0
        query ='SELECT persona_id FROM libro WHERE id = ?';
        respuesta = await connection.query(query,[req.params.id,req.body.persona_id]);
        if( (respuesta.persona_id) > 0) {
            return res.status(400).json({msg:'El libro ya se encuentra prestado, no se puede prestar hasta que lo devuelvan'});
        }
        
        // modificar registro
        query= 'UPDATE libro SET persona_id=? WHERE id = ?';
        respuesta = await connection.query(query,[req.body.persona_id,req.params.id]);
        

        //mostrar el registro con los valores actualizados
        query='SELECT persona_id FROM libro WHERE id=?';
        respuesta=await connection.query(query,[req.params.id]);        
        res.status(200).json({ msg: 'Libro prestado correctamente'})
    }
    
    catch (error){
        console.error(error.message);
        return res.status(500).json({msg: 'Error inesperado'});
    }
});

 
//PUT '/libro/devuelve/:id'
router.put('/devuelve/:id', async (req, res) => {                                             
    try {
        // verificar que exista libro
        let query ='SELECT id FROM libro WHERE id = ?';
        let respuesta = await connection.query(query,[req.params.id]);
        if(respuesta.length === 0){
            return res.status(404).json({msg:'No se encontro el libro'});
        }
             
        // verificar que figure prestado ...cuando está en la biblioteca, persona_id =0
        query ='SELECT persona_id FROM libro WHERE id = ?';
        respuesta = await connection.query(query,[req.params.id]);
        if((respuesta.persona_id)  == 0 ){
            return res.status(400).json({msg:'Ese libro no se encuentra prestado'});
        }
        
        // modificar registro
        query= 'UPDATE libro SET persona_id=0 WHERE id = ?';
        respuesta = await connection.query(query,[req.params.id]);
        res.status(200).json(respuesta)

        //mostrar el registro con los valores actualizados
        query='SELECT persona_id FROM libro WHERE id=?';
        respuesta=await connection.query(query,[req.params.id]);        
        res.status(200).json({msg: 'Libro devuelto correctamente' })
    }
    
    catch (error){
        console.error(error.message);
        return res.status(500).json({msg: 'Error inesperado'});
    }
});


//DELETE '/libro/borra/:id'
router.delete('/borra/:id', async (req, res) => {
    try {                                                
        // verificar que exista el libro                                            
        let query ='SELECT id FROM libro WHERE id = ?';
        let respuesta = await connection.query(query,[req.params.id]);
        if(respuesta.length === 0 ){                                                     
            return res.status(404).json({msg:'No se encuentra el libro'});
        }

        // verificar que el libro no se encuentre prestado
        query ='SELECT persona_id FROM libro WHERE id = ? AND persona_id is not null AND persona_id  > 0';
        respuesta = await connection.query(query,[req.params.id]);
        if(respuesta.length > 0 ){                                                       
            return res.status(400).json({msg:'El libro no se puede borrar, se encuentra prestado'});
        }
        
        //borrar el libro                                                              
        query ='DELETE FROM libro WHERE id = ?';
        respuesta = await connection.query(query,[req.params.id]);
        res.status(200).json(respuesta)
    }

    catch (error){
        console.error(error.message);
        return res.status(500).json({msg: 'Error inesperado'});
    }
});  

module.exports=router;