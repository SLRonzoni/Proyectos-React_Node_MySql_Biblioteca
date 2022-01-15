import React from 'react';
import { Link } from 'react-router-dom';

const RenglonPersona = ({ id, nombre, apellido , email, alias,borrar }) => (

    <tr>
      <td className="renglonNro">{id}</td>
      <td className="renglon" >{nombre}</td>
      <td className="renglon" >{apellido }</td>
      <td className="renglon" >{email}</td>
      <td className="renglon" >{alias}</td>
      <td>
        
        <Link 
          to={`/persona/${id}`}
          className="btn btn-primary btn-sm mr-1 me-md-2"
          role="button"
          aria-pressed="true"
        >
          Editar
        </Link>

        <button
          type="button"
          className="btn btn-danger btn-sm mr-1 me-md-2" 
          onClick= {() =>{borrar(id); }}
        >
          Eliminar
        </button>

        <Link 
          to={`/persona/prestamos/${id}`} 
          className="btn btn-success btn-sm mr-1 me-md-1"
          role="button" aria-pressed="true"
        >
          Prestamos
        </Link>
      </td>      
    </tr>
);
export default RenglonPersona;