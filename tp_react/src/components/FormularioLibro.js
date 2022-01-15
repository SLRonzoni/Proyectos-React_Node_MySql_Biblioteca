import React, { useState, useEffect } from "react";
import axiosCliente from "../Configuracion/axiosCliente";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const FormularioLibro = (props) => {
  
  const [libro, setLibro] = useState({
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
    guardarLibro();
  };

  const guardarLibro = () => {
    axiosCliente
      .post("/libro/nuevo", libro)
      .then((respuesta) => {
        Swal.fire({
          icon: "success",
          title: "Alta de libro exitosa !",
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

  //BOTON DESPLEGABLE PARA CATEGORIAS
  const [categoria, setCategorias] = useState([]);

  //hago peticion para obtener tabla de categorias
  useEffect(() => {
    const getCategorias = () => {
      axiosCliente
        .get("/categoria")
        .then((respuesta) => {
          console.log(respuesta);
          setCategorias(respuesta.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCategorias();
  }, []);

  //BOTON DESPLEGABLE PARA PERSONAS
  const [persona, setPersona] = useState([]);

  //hago peticion para obtener tabla de personas
  useEffect(() => {
    const getPersonas = () => {
      axiosCliente
        .get("/persona")
        .then((respuesta) => {
          setPersona(respuesta.data.personas);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getPersonas();
  }, []);

  return (
    <form onSubmit={enviar} className="container-sm col-6 col-md-4 bg-light">
      <br></br>
      <br></br>
      <h3>Ingrese nuevo libro...</h3>
      <div className="form-group ">
        <label htmlFor="name">Titulo : </label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          placeholder="Ingresar titulo"
          defaultValue={libro.nombre}
          required
          onChange={cambios}
        />
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="name">Descripcion : </label>
        <input
          type="text"
          className="form-control"
          name="descripcion"
          placeholder="Ingresar descripcion"
          defaultValue={libro.descripcion}
          onChange={cambios}
        />
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="name">Categoria :</label>
        <select
          type="text"
          class="form-select"
          aria-label="Default select example"
          name="categoria_id"
          required
          onChange={cambios}
        >
          <option value={-1}>Seleccione... </option>
          {categoria.map((unaCategoria, i) => (
            <option key={unaCategoria.id} value={unaCategoria.id}>
              {unaCategoria.nombre}
            </option>
          ))}
        </select>
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="name">Persona :</label>
        <select
          type="text"
          class="form-select"
          aria-label="Default select example"
          name="persona_id"
          required
          onChange={cambios}
        >
          <option value={-1}>Seleccione... </option>
          {persona.map((unaPersona) => (
            <option key={unaPersona.id} value={unaPersona.id}>
              {unaPersona.apellido}
              {"  ,  "}
              {unaPersona.nombre}
            </option>
          ))}
        </select>
      </div>
      <br></br>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <button type="submit" className="m-3 btn btn-primary md-end">
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
    </form>
  );
};

export default withRouter(FormularioLibro);
