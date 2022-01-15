const router = require("express").Router();
const connection = require("./db");
const { regexNombre } = require('./validaciones');

const categoriaRegex =
  /^[\w\S]{2,50}[A-ZÁÉÍÓÚÜÑÇA-ZÁÉÍÓÚÜÑÇa-záéíóúüñç'\s]{1,50}$/i;

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    // Validar que se envio un nombre de categoria
    if (!req.body.nombre) {
      res.status(400).json({ msg: "Falta enviar el nombre" });
    }
    //Validar que la categoria sea valida
    if (!categoriaRegex.test(req.body.nombre)) {
      res.status(400).json({
        msg: "La categoria solo puede contener letras, espacios y no puede estar vacia",
      });
    }
    //Validar que no exista la categoria enviada
    let query = "SELECT * FROM categoria WHERE nombre = (UPPER(?))";
    let respuesta = await connection.query(query, [req.body.nombre]);
    if (respuesta.length > 0) {
      res.status(400).json({ msg: "La categoria enviada ya existe" });
    }
    //Ingresar Categoria
    query = "INSERT INTO categoria (nombre)  VALUE((UPPER(?)))";
    respuesta = await connection.query(query, [req.body.nombre]);
    if (respuesta.insertId != 0) {
      res.status(201).json("Respuesta: Categoria ingresada");
    }
  } catch (e) {
    res.status(500).json({ msg: "Error Inesperado" });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM categoria";
    const respuesta = await connection.query(query);
    if (respuesta.length > 0) {
      res.status(200).json( respuesta );
    } else {
      res.status(400).json({ msg: "La tabla Categoria no contiene datos" });
    }
  } catch (e) {
    res.status(500).json({ msg: "Error Inesperado" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let query = "SELECT * FROM categoria WHERE id = ?";
    let respuesta = await connection.query(query, [req.params.id]);
    if (respuesta.length > 0) {
      res.json(respuesta);
    } else {
      res.status(400).json({ msg: "La categoria indicada no existe" });
    }
  } catch (e) {
    res.status(500).json({ msg: "Error Inesperado" });
  }
});

//PUT '/categoria/:id'                                          
router.put('/edita/:id', async (req, res) => {
  try{  
      let query ='SELECT id FROM categoria WHERE id = ?';
      let respuesta = await connection.query(query,[req.params.id]);
      if(respuesta.length === 0){ 
          return res.status(404).json({msg:'La categoria que intenta modificar, no existe'}); 
      }
      if(!req.body.nombre){
          return res.status(400).json({msg: 'Solo se puede modificar la descripcion, descripcion no enviada'});
      } 
      //asigno los datos del body a variables
      let nombre=req.body.nombre;
 
      //verificar que la descripcion tenga los caracteres que se necesitan
      if(!regexNombre(nombre)){
          return res.status(400).json({msg:'La descripcion solo puede contener 100 caracteres entre letras, espacios y apostrofe'});
      }
      //actualiza solo DESCRIPCION en el registro
      query ='UPDATE categoria SET nombre=UPPER(?) WHERE id = ?';
      respuesta = await connection.query(query,[nombre,req.params.id]);
         
      //muestra el registro con los valores actualizados
      query='SELECT id, nombre FROM categoria WHERE id=?';
      respuesta = await connection.query(query,[req.params.id]);
      res.status(200).json({
          msg: "Modificacion de descripcion exitosa ",
          respuesta
      })
  }
 
  catch (error){
      console.error(error.message);
      return res.status(500).json({msg: 'Error inesperado'});
  }
});


router.delete("/:id", async (req, res) => {
  try {
    // Validar que exista la categoria
    let query = "SELECT * FROM categoria WHERE id = ?";
    let respuesta = await connection.query(query, [req.params.id]);
    if (!respuesta.length) {
      res.status(400).json({ msg: "La categoria indicada no existe" });
    }
    //Validar que la categoria no tenga un libro asociado
    query = "SELECT * FROM libro WHERE categoria_id = ?";
    respuesta = await connection.query(query, [req.params.id]);
    if (respuesta.length > 0) {
      res.status(400).json({
        msg: `La categoria indicada tiene ${respuesta.length} libro/s asociado/s`,
      });
    }

    //Eliminar categoria
    query = "DELETE FROM categoria WHERE id = ?";
    respuesta = await connection.query(query, [req.params.id]);
    if (respuesta.affectedRows != 0) {
      res.status(200).json("Categoria eliminada");
    }
  } catch (e) {
    res.status(500).json({ msg: "Error Inesperado" });
  }
});

module.exports = router;