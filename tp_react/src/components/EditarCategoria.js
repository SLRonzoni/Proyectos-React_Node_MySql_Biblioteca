import React, { useState, useEffect } from "react";
import axiosCliente from "../Configuracion/axiosCliente";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const EditarCategoria = (props) => {
  const dispatch = useDispatch();

  const { id } = props.match.params;

  const [categoria, setCategoria] = useState({
    id: "",
    nombre: "",
  });

  const [categoriaMuestra, setCategoriaMuestra] = useState({
    id: "",
    nombre: "",
  });

  const cambios = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };

  const enviar = (e) => {
    e.preventDefault();
    guardarDescripcion();
    
  };


  const guardarDescripcion = () => {
    axiosCliente
      .put(`/categoria/edita/${id}`, categoria)
      .then((respuesta) => {
        dispatch({ type: "categoria/modificarCategoria" , id: categoria[0].id, nombre: categoria.nombre });
        Swal.fire({
          icon: "success",
          title: "Modificación de categoria exitosa !",
          text: respuesta.data.msg,
        });
        props.history.push("/ListadoCategorias");
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.msg,
        });
      });
  };

  useEffect(() => {
    const getCategoria = () => {
      axiosCliente.get(`/categoria/${id}`)
      .then((respuesta) => {
          setCategoria(respuesta.data);
          setCategoriaMuestra(respuesta.data[0]);
      })
      .catch((error=>{
           console.log(error);
      }));
    };
    getCategoria();
  }, [id]);
  return (
    <div>
      <br></br>
      <br></br>
      <h3 className="text-center">Categoria a modificar</h3>
      <br></br>
      <br></br>
      <table className="table table-striped table-responsive table-bordered ">
        <thead>
          <tr>
            <th className="tituloItem" scope="col"> Id </th>
            <th className="tituloItem" scope="col"> Categoria </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="renglonNro">{id}</td>
            <td className="renglon"> {categoriaMuestra.nombre} </td>
          </tr>
        </tbody>
      </table>

      <br></br>
      <br></br>
      <form onSubmit={enviar} className="container me-md-3">
        <br></br>
        <h5 className="text-center">
          Solo puede modificar la descripción de una categoria
        </h5>
        <br></br>
        <div>
          <div className="col-sm-6 container ">
            <label className="m-1" htmlFor="name">
              Descripcion :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              placeholder="Ingresar nueva descripcion"
              defaultValue={categoria.nombre}
              onChange={cambios}
            />
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                type="submit"
                name="nombre"
                className="m-3 btn btn-primary md-end"
              >
                Guardar
              </button>
              <Link
                to={"/ListadoCategorias"}
                className="m-3 btn btn-primary md-end"
                role="button"
                aria-pressed="true"
              >
                {" "}
                Volver{" "}
              </Link>
            </div>
          </div>
          <br></br>
        </div>
      </form>
    </div>
  );
};

export default withRouter(EditarCategoria);