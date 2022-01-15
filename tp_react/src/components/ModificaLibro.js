import React, { useState, useEffect } from "react";
import axiosCliente from "../Configuracion/axiosCliente";
import './estilos/LibrosCategoriasPersonas.css';
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ModificaLibro = (props) => {
  const { id } = props.match.params;

  const [libro, setLibro] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    categoria_id: "",
    persona_id: "",
  });

  const [libroMuestra, setLibroMuestra] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    categoria_id: "",
    persona_id: "",
  });

  const cambios = (e) => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value,
    });
  };

  const enviar = (e) => {
    e.preventDefault();
    guardarDescripcion();
  };


  const guardarDescripcion = () => {
    axiosCliente
      .put(`/libro/edita/${id}`, libro)
      .then((respuesta) => {
        Swal.fire({
          icon: "success",
          title: "Modificación de libro exitosa !",
          text: respuesta.data.msg,
        });
        props.history.push("/ListadoLibros");
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
    const getLibro = () => {
      axiosCliente.get(`/libro/${id}`)
      .then((respuesta) => {
          setLibro(respuesta.data);
          setLibroMuestra(respuesta.data[0]);
      })
      .catch((error=>{
           console.log(error);
      }));
    };
    getLibro();
  }, [id]);

  return (
    <div>
      <br></br>
      <br></br>
      <h3 className="text-center">Libro a modificar</h3>
      <br></br>
      <br></br>
      <table className="container-sm col-6 col-md-8 bg-light table-bordered">
        <thead>
          <tr>
            <th className="tituloItem" scope="col"> Id </th>
            <th className="tituloItem" scope="col"> Libro </th>
            <th className="tituloItem" scope="col"> Descripcion </th>
           
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="renglonNro">{id}</td>
            <td className="renglon"> {libroMuestra.nombre} </td>
            <td className="renglon"> {libroMuestra.descripcion}</td>

          </tr>
        </tbody>
      </table>

      <br></br>
      <br></br>
      <form onSubmit={enviar} className="container me-md-3">
        <br></br>
        <h5 className="modifH5"> Solo puede modificar la descripción de un libro</h5>
        <br></br>
        <div>
          <div className="modifInput col-sm-6 container ">
            <label className="m-1" htmlFor="name">
              Descripcion :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="descripcion"
              placeholder="Ingresar nueva descripcion"
              defaultValue={libro.descripcion}
              onChange={cambios}
            />
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                type="submit"
                name="descripcion"
                className="m-3 btn btn-primary md-end"
              >
                Guardar
              </button>
              <Link
                to={"/ListadoLibros"}
                className="m-3 mr-md-2 btn btn-primary"
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

export default withRouter(ModificaLibro);
