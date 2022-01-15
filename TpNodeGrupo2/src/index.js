'use strict';

// CREAR UN SERVIDOR CON EXPRESS
const express= require('express');
const app = express();
const cors = require('cors');

const path = require('path');
const morgan = require('morgan');
require('dotenv').config()

//SETTINGS
app.set('port',process.env.PORT || 3000);
app.use(cors({origin:"http://localhost:3001",credentials:true}));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());


//DESARROLLO DE LA LOGICA DE NEGOCIO
//rutas para libro, persona, categoria y ruta no encontrada  
app.use('/libro',require('./libro'));
    
app.use('/persona', require('./persona'));

app.use('/categoria',require('./categoria'));

app.get('/*',async (req,res) => {
    console.error("Ruta no encontrada");
    await res.status(404).json("Error: Ruta no encontrada");
});

//SERVIDOR
app.listen(app.get('port'),()=>{
    console.log('Servidor en puerto http://localhost:'+ app.get('port'));
});
