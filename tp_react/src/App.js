import  React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

import ListadoLibros from './components/ListadoLibros';
import FormularioLibro from './components/FormularioLibro';
import ModificaLibro from './components/ModificaLibro';
import PrestaLibro from './components/PrestaLibro';

import ListadoCategorias from './components/ListadoCategorias';
import FormularioCategoria from './components/FormularioCategoria';
import ListadoLibrosCategoria from './components/ListadoLibrosCategoria';
import EditarCategoria from './components/EditarCategoria';

import ListadoPersonas from './components/ListadoPersonas';
import FormularioPersona from './components/FormularioPersona';
import EditarPersona from './components/EditarPersona';
import Prestamo from './components/ListadoPrestamosPersona';


function App(){

   return(
      <BrowserRouter>

      <Navbar />
      <div className="container-fluid">
         
         <Route exact path="/FormularioLibro" component={FormularioLibro}/>
         <Route exact path="/ListadoLibros"component={ListadoLibros}/>
         <Route exact path="/libro/presta/:id"component={PrestaLibro}/>
         <Route exact path="/libro/edita/:id"component={ModificaLibro}/>
         
        <Route exact path="/FormularioPersona" component={FormularioPersona}/>
        <Route exact path="/ListadoPersonas"component={ListadoPersonas}/>
        <Route exact path="/persona/:id"component={EditarPersona}/>
        <Route exact path="/persona/prestamos/:id"component={Prestamo}/>

         <Route exact path="/FormularioCategoria" component={FormularioCategoria}/>
         <Route exact path="/ListadoCategorias"component={ListadoCategorias}/>
         <Route exact path="/ListadoLibrosCategoria"component={ListadoLibrosCategoria}/>
         <Route exact path="/categoria/edita/:id"component={EditarCategoria}/>

      </div>
   </ BrowserRouter>  
   );
}

export default App;
