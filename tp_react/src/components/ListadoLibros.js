import React, { Fragment, useState, useEffect } from "react";
import axiosCliente from "../Configuracion/axiosCliente";
import "./estilos/LibrosCategoriasPersonas.css";
import RenglonLibro from "./RenglonLibro";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const ListadoLibros = (props) => {
  //inicializo el estado
  const [libros, setLibros] = useState([]);

  //llamo a la api de nodejs
  const getLibros = async () => {
    const respuesta = await axiosCliente.get("/libro");
    setLibros(respuesta.data);
  };
                
                       
  //eliminar libro
  const confirmaBorrar = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar !",
    }).then((result) => {
      if (result.value) {
        elimina(id);
      }
    });
  };

  const elimina = (id) => {
    axiosCliente
      .delete(`/libro/borra/${id}`)
      .then((respuesta) => {
        Swal.fire({
          icon: "success",
          title: "Libro Eliminado !",
          text: respuesta.data.msg,
        });
        getLibros();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar",
          text: error.response.data.msg,
        });
      });
  };

  //devolver libro
  const confirmaDevolver = (id) => {
    Swal.fire({
      title: "Está seguro de devolver el libro ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, devolver !",
    }).then((result) => {
      if (result.value) {
        devolver(id);
      }
    });
  };

  const devolver = (id) => {
    axiosCliente
      .put(`/libro/devuelve/${id}`)
      
      .then((respuesta) => {    
        
        Swal.fire({
          icon: "success",
          title: "Libro Devuelto !",
          text: respuesta.data.msg
        });
       
         getLibros();
       
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede devolver",
          text: error.response.data.msg
        });
      });
  };

  useEffect(() => {
    getLibros();
  }, []);


  //Personas
  const [personas, setPersonas] = useState([]);
  const getPersonas=async ()=>{
    const respuesta = await axiosCliente.get('/persona');
    setPersonas(respuesta.data.personas);
  };

  useEffect(() => {
    getPersonas();
  }, []);


  let librosConALias = [];

  for (let i = 0; i < libros.length; i++) {
    const persona = personas.find(function(persona) { 

      if(persona.id == libros[i].persona_id)
          return true;          
    });

    librosConALias.push({...libros[i], 
      prestadoA: persona  == undefined ? '' : persona.alias })

    };


//Categorias
const [categorias, setCategorias] = useState([]);
const getCategorias=async ()=>{
  const respuesta = await axiosCliente.get('/categoria');
  setCategorias(respuesta.data);
};

useEffect(() => {
  getCategorias();
}, []);

let librosFinal = [];

for (let i = 0; i < librosConALias.length; i++) {

    const categoria = categorias.find(function(categoria) { 

      if(categoria.id == librosConALias[i].categoria_id)
          return true;
    });
    
      librosFinal.push({...librosConALias[i], 
      categoriaNombre: categoria  == undefined ? '' : categoria.nombre })
      

};      


  const mostrarLibros = (props) => {
    return (
      <tbody>
        {librosFinal.map((unLibro) => (
          <RenglonLibro key={unLibro.id}
            
            id={unLibro.id}
            nombre={unLibro.nombre}
            descripcion={unLibro.descripcion}
            persona_id={unLibro.persona_id}
            alias={unLibro.prestadoA}
            categoria_id={unLibro.categoria_id}
            categoria={unLibro.categoriaNombre}
            borrar={confirmaBorrar}
            devolver={confirmaDevolver}
            />
        ))}

      </tbody>
    );
  };

  return (
    <Fragment>
      <div>
        <h1 className="tituloTabla">Listado de Libros</h1>
      </div>

      <table className="table table-striped table-responsive table-bordered ">
        <thead>
          <tr>
            <th className="tituloItem" scope="col"> Id </th>
            <th className="tituloItem" scope="col"> Libro </th>
            <th className="tituloItem" scope="col"> Descripcion </th>
            <th className="tituloItem" scope="col"> Categoria </th>
            <th className="tituloItem" scope="col"> Prestado a : ( alias ) </th>
            <th><Link to={'./FormularioLibro'} className=" botonNuevo btn btn-primary btn-sm "
                  role="button" aria-pressed="true"  > Nuevo Libro </Link> </th>
          </tr>
        </thead>
        {mostrarLibros()}
      </table>
    </Fragment>
  );
};
export default withRouter(ListadoLibros);
