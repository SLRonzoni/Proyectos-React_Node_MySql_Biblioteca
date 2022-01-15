import React, { Fragment, useState, useEffect } from "react";
import axiosCliente from "../Configuracion/axiosCliente";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import "./estilos/LibrosCategoriasPersonas.css";


const ListadoPrestamosPersona = (props) => {
    const params = useParams();

    const [prestamos, setPrestamos] = useState(
      [
        {  
          libro:'',
          descripcion:'',
          categoria:'',
          alias: ''
        }
      ]
    );
  
  const getPrestamos = async () => {

    await axiosCliente.get('/persona/prestamos/'+params.id)
    .then (respuesta=>{
      console.log(respuesta.data.respuesta);
      setPrestamos(respuesta.data.respuesta);
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Mensaje',
        text: error.response.data.msg
      });
      props.history.push('/ListadoPersonas');
    })
  }

  useEffect(() => { getPrestamos();}, []);
  
  const mostrarPrestamos =() =>{
    return(
      <tbody>
        { prestamos.map((unPrestamo)  => ( 
          <tr>
            <td className="renglon" >{unPrestamo.libro}</td>
            <td className="renglon" >{unPrestamo.descripcion}</td>
            <td className="renglon" >{unPrestamo.nombre}</td>
          </tr>
        ))}
      </tbody>
    );  
  };
  
    return (
      <Fragment>
        <div>
          <h1 className="tituloTabla">Listado de Prestamos {prestamos[0].alias}</h1>
        </div> 
        <table className="table table-striped table-responsive table-bordered">
          <thead>
            <tr>
              <th className="tituloItem" scope="col">Nombre</th>
              <th className="tituloItem" scope="col">Descripción</th>
              <th className="tituloItem" scope="col">Categoría</th>
            </tr>
          </thead>

          {mostrarPrestamos()}

        </table>

        <div class="text-center">
          <button 
            type="button"
            className="btn btn-primary btn-sm mr-1 me-md-2" 
            onClick= {() =>{props.history.push('/ListadoPersonas'); }} 
          >
            Volver
          </button>
        </div>
      </Fragment>
    );
  };
  
export default ListadoPrestamosPersona;
