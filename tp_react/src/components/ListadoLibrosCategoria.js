import React,{ Fragment } from 'react';
import './estilos/LibrosCategoriasPersonas.css';
import { useHistory } from 'react-router-dom';

const ListadoLibrosCategoria = (props) => {
  const history = useHistory();

  const mostrarLibros =() =>{
    return(
    <tbody>
      { history.location.state.librosFiltrado.map((unLibro)  => ( 
        <tr>
          <td className="renglon" >{unLibro.nombre}</td>
          <td className="renglon" >{unLibro.descripcion}</td>
          <td className="renglonNro" >{unLibro.persona_id}</td>
          </tr>
        ))}
    </tbody>
    );  
};


const handleVolver = () => {
    history.push("/ListadoCategorias/");
  }

    return (
        <Fragment>
        <div>
            <h1 className="tituloTabla">Listado de Libros</h1> 
        </div>
   
        <table className="table table-striped table-responsive table-bordered ">
          
           <thead>
             <tr>
               <th className="tituloItem"scope="col">Titulo</th>
               <th className="tituloItem"scope="col">Descripcion</th>
               <th className="tituloItem"scope="col">Persona</th>
             </tr>
           </thead>
          {mostrarLibros()}
      </table> 
    <button className="btn btn-primary" onClick={()=> handleVolver()}>Volver</button>
    </Fragment>
    
 )
};
 
 export default ListadoLibrosCategoria;