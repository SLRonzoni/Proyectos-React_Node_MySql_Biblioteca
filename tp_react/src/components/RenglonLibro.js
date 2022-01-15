import React from 'react';
import { Link } from 'react-router-dom';

const RenglonLibro = ({ id, nombre, descripcion, categoria_id, categoria, persona_id,alias,borrar ,devolver}) =>(
    <tr>
        <td className="renglonNro">{id}</td>
        <td className="renglon" >{nombre}</td>
        <td className="renglon" >{descripcion}</td>
        <td className="renglon" >{categoria_id}{" - "}{categoria} </td>
        <td className="renglon" >{persona_id}{" - "}{alias}</td>
        
        <td>
            <Link to={`/libro/edita/${id}`} className="btn btn-primary btn-sm mr-1 me-md-2"
                   role="button" aria-pressed="true"  > Editar </Link>

            <Link to={`/libro/presta/${id}`} className="btn btn-success btn-sm mr-1 me-md-2"
                   role="button" aria-pressed="true"  > Prestar </Link>


            <button type="button" className="btn btn-secondary btn-sm mr-1 me-md-2" 
                onClick= {() =>{devolver(id);}} >Devolver </button>


            <button type="button" className="btn btn-danger btn-sm mr-1 me-md-2" 
                onClick= {() =>{borrar(id);}} >Eliminar </button>

        </td>      
    </tr>
        
);
export default RenglonLibro;