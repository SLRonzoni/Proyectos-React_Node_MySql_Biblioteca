const router = require('express').Router();
const connection = require('./db');
const { regexEmail, regexNombre, regexApellido,regexAlias} = require('./validaciones');

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM persona';
    const personas = await connection.query(query);
    res.status(200).json({
      msg: 'Personas encontradas',
      personas: [...personas]
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg: 'Error inesperado'});
  };
});

router.get("/:id", async(req,res)=>{    
  try {
    const {id} = req.params;
    const query = 'SELECT * FROM persona WHERE id = ?';
    const persona = await connection.query(query, [id]);
    if(persona.length == 0){
      return res.status(404).json({msg: 'Persona no encontrada'});
    }
    res.status(200).json({
      msg: 'Persona obtenida',
      persona
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg: 'Error inesperado'});
  };
});

router.post("/", async(req,res)=> {
  try {
    const {nombre,apellido,email,alias} = req.body
    if(!nombre || !apellido || !alias || !email  ){
      return res.status(400).json({msg: 'Datos insuficientes: nombre, apellido y alias son datos obligatorios'});
    }
    if(!regexNombre(nombre)){
      return res.status(400).json({msg: 'Ingrese un nombre valido'});
    }
    if(!regexApellido(apellido)){
      return res.status(400).json({msg: 'Ingrese un apellido valido' });
    }
    if(!regexAlias(alias)){
      return res.status(400).json({msg: 'Ingrese un alias valido'});
    }
    if(!regexEmail(email)){
      return res.status(400).json({msg: 'Ingrese un email valido'});
    }
    const query = 'SELECT * FROM persona WHERE email = ?';
    const persona = await connection.query(query, [email]);
    if(persona.length > 0){
      console.log("el email ya se encuentra registrado");
      return res.status(400).json({msg: 'El email ya se encuentra registrado'});
    }
    const query2 = "INSERT INTO persona (nombre, apellido, email, alias) VALUES (UPPER(?),UPPER(?),UPPER(?),UPPER(?))";
    const newPersona = await connection.query(query2, [nombre, apellido, email, alias]);
    return res.status(201).json({
      msg: 'Persona creada exitosamente',
      personaId: newPersona.insertId
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg: 'Error inesperado'});
  };
})

router.put('/:id', async(req, res) =>{
  try{
    const { nombre, apellido, email, alias } = req.body;
    const { id } = req.params;
    if(!nombre || !apellido || !alias){
      return res.status(400).json({msg: 'Datos insuficientes: nombre, apellido y alias son datos obligatorios'});
    }
    if(!regexNombre(nombre)){
      return res.status(400).json({msg: 'Ingrese un nombre valido'});
    }
    if(!regexApellido(apellido)){
      return res.status(400).json({msg: 'Ingrese un apellido valido' });
    }
    if(!regexAlias(alias)){
      return res.status(400).json({msg: 'Ingrese un alias valido'});
    }
    const query = 'SELECT  * FROM persona WHERE id= ?';
    const persona = await connection.query(query, [id]);
    if(!(persona.length > 0)){
      return res.status(404).json({msg: 'Usuario no encontrado'})
    }

    const query2 = 'UPDATE persona SET nombre= UPPER(?), apellido = UPPER(?), alias = UPPER(?) WHERE id = ?';
    await connection.query(query2, [nombre, apellido, alias, id]);
    res.status(200).json({
      msg: 'persona actualizada exitosamente',
      personaId: id
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg: 'Error inesperado'});
  };
})

router.delete('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const query = 'SELECT  * FROM persona WHERE id= ?';
    const persona = await connection.query(query, [id]);
    if(persona.length == 0){
      return res.status(404).json({msg: 'Usuario no encontrado'})
    }

    const query2 = 'SELECT * FROM persona as p INNER JOIN libro as l ON p.id = l.persona_id WHERE p.id = ?';
    const persona2 = await connection.query(query2, [id]);
    
    if(persona2.length == 0){
      const query3 = 'DELETE FROM persona WHERE id= ?';
      await connection.query(query3, [id]);
      res.status(200).json({msg: 'persona borrada exitosamente', personaId: id});
    } else {
      return res.status(404).json({msg: 'no se puede eliminar el usuario, tiene libros asociados'})
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg: 'Error inesperado'});
  };
})

//GET Obtener libros prestados a una determinada Persona
router.get('/prestamos/:id', async(req,res)=>{    
  try {
    const query = 'SELECT l.id, l.nombre as libro, l.descripcion, c.nombre, p.alias FROM libro l LEFT JOIN persona p ON l.persona_id = p.id LEFT JOIN categoria c ON l.categoria_id = c.id WHERE l.persona_id = ?';
    console.log(query);
    const respuesta = await connection.query(query, [req.params.id]);
    if(respuesta.length == 0){
      return res.status(404).json({msg: 'La Persona no tiene prestamos asociados.'});
    }
    res.status(200).json({"respuesta" : respuesta});
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({msg: 'Error inesperado'});
  };
});

module.exports = router;
