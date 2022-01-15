import React, { Fragment, useState, useEffect } from "react"
import axiosCliente from "../Configuracion/axiosCliente"
import RenglonPersona from './RenglonPersonas';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import "./estilos/LibrosCategoriasPersonas.css"

const ListadoPersonas = () => {
  const [personas, setPersonas] = useState([]);

  const getPersonas = async () => {
    const respuesta = await axiosCliente.get('/persona');
    setPersonas(respuesta.data.personas);
  }

  const confirmaBorrar = (id) => {
    Swal.fire({
      title: 'Está seguro de eliminar ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar !'
    })
      .then((result) => {
        if (result.value) {
          elimina(id);
        }
      });
  };


  const elimina =(id) => {
    axiosCliente.delete(`/persona/${id}`)
    .then (respuesta => {
        Swal.fire({
          icon: 'success',
          title: 'Persona Eliminada!',
          text: respuesta.data.msg
        })
        getPersonas();
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error : No se puede eliminar',
        text: error.response.data.msg
      }); 
    })
  };

  useEffect(() => { getPersonas();}, []);

  const mostrarPersonas =() =>{
    return(
      <tbody>
        { personas.map((unaPersona)  => ( 
          <RenglonPersona 
            key ={unaPersona.id}
            id={unaPersona.id}
            nombre={unaPersona.nombre}
            apellido={unaPersona.apellido}
            email={unaPersona.email}
            alias={unaPersona.alias}
            borrar={confirmaBorrar}      
          />
        ))}
      </tbody>
    );  
  };

  return (
    <Fragment>
      <div>
         <h1 className="tituloTabla">Listado de Personas</h1>
      </div> 
      <table className="table table-striped table-responsive table-bordered ">
      <thead>
          <tr>
            <th className="tituloItem"scope="col">Id</th>
            <th className="tituloItem"scope="col">Nombre</th>
            <th className="tituloItem"scope="col">Apellido</th>
            <th className="tituloItem"scope="col">Email</th>
            <th className="tituloItem"scope="col">Alias</th>
          </tr>
        </thead>
        {mostrarPersonas()}
      </table>
   
    </Fragment>
  );
};

export default withRouter(ListadoPersonas);
