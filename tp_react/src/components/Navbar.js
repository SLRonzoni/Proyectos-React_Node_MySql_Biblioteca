import React from "react";
import foto from "./archivosMedia/karadagian.jpg";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary callout-info">
    <div className="container-fluid ">
      <p className="navbar-brand h1" >Biblioteca "Grupo 2"</p>
      <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
        <div className="navbar-nav ">
          <Link to= {'/'} className="nav-link h4 active" aria-current="page" >Home</Link>
          
          <li className="nav-item dropdown">
            <Link to= {'/'} className="h4 nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Libros</Link>
            <ul className="dropdown-menu">
              <li><Link to={"/FormularioLibro"} className="dropdown-item" >Altas</Link></li>
              <li><Link to={"/ListadoLibros"}className="dropdown-item" >Listado</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link to={'/'} className="h4 nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Categorias</Link>
            <ul className="dropdown-menu">
              <li><Link to={"/FormularioCategoria"} className="dropdown-item" >Altas</Link></li>
              <li><Link to={"/ListadoCategorias"} className="dropdown-item" >Listado</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link to= {'/'}className="h4 nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Personas</Link>
            <ul className="dropdown-menu">
              <li><Link to={"/FormularioPersona"} className="dropdown-item" >Altas</Link></li>
              <li><Link to={"/ListadoPersonas"} className="dropdown-item" >Listado</Link></li>
            </ul>
          </li>

          
          <p className="nav-link h6 p-1 col-2 position-absolute top-50 end-0 translate-middle" >Usuario : Martin Karadagian</p>
          <img src={foto} className=" imagen-fluid rounded-circle col-lg-1 p-3 position-absolute top-50 end-0 translate-middle" alt="Usuario"></img>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
