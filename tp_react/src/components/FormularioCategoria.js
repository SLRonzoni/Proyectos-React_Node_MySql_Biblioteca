import React, { useState } from "react";
import axiosCliente from "../Configuracion/axiosCliente";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function FormularioCategoria(props) {
  const dispatch = useDispatch();

  //inicializo estado
  const [categoria, setCategoria] = useState({
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
    guardarCategoria();
  };

  const guardarCategoria = () => {
    axiosCliente
      .post("/categoria", categoria)
      .then((respuesta) => {
        if (respuesta) {
          dispatch({
            type: "categoria/agregarCategoria",
            categoria: categoria,
          });
          props.history.push("/ListadoCategorias");
          Swal.fire({
            icon: "success",
            title: "Categoria Agregada!",
            text: respuesta.data.msg,
          });
        }
      })
      .catch(function (error) {
        Swal.fire("La categoria ingresada ya existe");
        props.history.push("/ListadoCategorias");
      });
  };

  return (
    <form onSubmit={enviar} className="container-sm col-6 col-md-4">
      <br></br>
      <br></br>
      <h3>Ingrese nueva Categoria...</h3>
      <div className="form-group ">
        <label htmlFor="name">Categoria: </label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          placeholder="Ingresar categoria"
          defaultValue={categoria.nombre}
          required
          onChange={cambios}
        />
      </div>

      <button type="submit" className="m-3 btn btn-primary">
        Guardar
      </button>
      <Link
          to={"/ListadoCategorias"}
          className="m-3 mr-md-2 btn btn-primary"
          role="button"
          aria-pressed="true"
        >
          {" "}
          Volver{" "}
        </Link>
    </form>
  );
}
export default FormularioCategoria