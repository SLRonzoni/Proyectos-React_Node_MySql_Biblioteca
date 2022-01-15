import React from 'react';
import { Link } from 'react-router-dom';

const RenglonCategoria = ({ id, nombre, libros, borrar }) =>(

    <tr>
        <td className="renglon text-center">{id}</td>
        <td className="" >{nombre}</td>
        <td>
            
        
        <button className="btn btn-primary btn-sm mr-1 me-md-3" onClick={() =>{libros(id); }}>Libros</button>

            <Link to={`/categoria/edita/${id}`} className=" btn btn-primary btn-sm mr-2 me-md-3"
                   role="button" aria-pressed="true"> Editar </Link>

        <button type="button" className=" btn btn-danger btn-sm btn-sm mr-2 me-md-1" 
                onClick= {() =>{borrar(id); }} >Eliminar </button>

        </td>      
    </tr>
        
);
export default RenglonCategoria;