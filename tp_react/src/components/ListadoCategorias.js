import React, { Fragment, useState, useEffect } from "react";
import axiosCliente from "../Configuracion/axiosCliente";
import "./estilos/LibrosCategoriasPersonas.css";
import RenglonCategoria from "./RenglonCategoria";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriaRedux } from "../reducers/categoria";

const ListadoCategorias = () => {
  //inicializo el estado
  let [categorias, setConsultaCategorias] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  categorias = useSelector(getCategoriaRedux);

  const getCategoria = async () => {
    if (categorias.length === 0) {
      //llamo a la api de nodejs
      const respuesta = await axiosCliente.get("/categoria");
      setConsultaCategorias(respuesta.data);
      dispatch({ type: "categoria/completarCategoria" , categoria: respuesta.data });
    }
  };

  const [libros, setLibros] = useState([]);
  const getLibros = async () => {
    const respuesta = await axiosCliente.get("/libro");
    setLibros(respuesta.data);
    
  };

  useEffect(() => {
    getLibros();
    getCategoria();
  }, []);
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
      .delete(`/categoria/${id}`)
      .then((respuesta) => {
        dispatch({ type: "categoria/eliminarCategoria" , id: id });
        Swal.fire({
          icon: "success",
          title: "Categoria Eliminada!",
          text: respuesta.data.msg,
        });
        getCategoria();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar",
          text: error.response.data.msg,
        });
      });
  };

  const handleNuevaCategoria = () => {
    history.push("/FormularioCategoria/")
  };
  const handleListado = (idCategoria) => {
    const librosFiltrado = libros.filter(
      (libro) => libro.categoria_id == idCategoria
    );
    if (librosFiltrado.length === 0) {
      Swal.fire("La categoria no tiene libros asociados");
    } else history.push("/ListadoLibrosCategoria/", { librosFiltrado });
  };

  const mostrarCategorias = () => {
    categorias.sort((a, b) => a.id - b.id);
    return (
      <tbody>
        {categorias.map((unaCategoria) => (
          <RenglonCategoria
            key={unaCategoria.id}
            id={unaCategoria.id}
            nombre={unaCategoria.nombre}
            libros={handleListado}
            borrar={confirmaBorrar}
          />
        ))}
      </tbody>
    );
  };

  return (
    <Fragment>
      <div>
        <h1 className="tituloTabla">Listado de Categorias</h1>
      </div>
      <table className="table table-striped table-responsive table-bordered ">
        <thead>
          <tr>
            <th className="tituloItem" scope="col">
              Id
            </th>
            <th className="tituloItem" scope="col">
              Categoria
            </th>
            <th className="tituloItem" scope="col">
            <button type="button" className="btn btn-primary btn-sm mr-1 me-md-2" 
                onClick= {() =>{handleNuevaCategoria()}} >Nueva Categoria </button>
            </th>
          </tr>
        </thead>
        {mostrarCategorias()}
      </table>
    </Fragment>
  );
};

export default ListadoCategorias;
