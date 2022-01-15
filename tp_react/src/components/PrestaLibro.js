import React, {useState,useEffect} from 'react';
import axiosCliente from '../Configuracion/axiosCliente';
import { withRouter } from 'react-router';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const PrestaLibro = (props) =>{

const {id} = props.match.params;
const [libro,setLibro]=useState({
    id:'',
    nombre:'',
    descripcion:'',
    categoria_id:'',
    persona_id:''
});  

const [libroMuestra,setLibroMuestra]=useState({
  id:'',
  nombre:'',
  descripcion:'',
  categoria_id:'',
  persona_id:''
});  

const cambios=(e)=>{
   setLibro({
       ...libro,
       [e.target.name]:e.target.value 
   });
};


const enviar = (e) =>{  
  e.preventDefault();
    guardarPresta();

};  


const guardarPresta=()=>{
    axiosCliente.put(`/libro/presta/${id}`,libro)
    .then (respuesta => {
      Swal.fire({
        icon: 'success',
        title: 'Libro Prestado !',
        text: respuesta.data.msg
      })
      props.history.push('/ListadoLibros');
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error : ',
        text: error.response.data.msg
      }); 
    })
  };
  

//BOTON DESPLEGABLE PARA PERSONAS
const [persona,setPersona]=useState([]);

//hago peticion para obtener tabla de personas
useEffect(() =>{
  const getPersonas = ()=>{
   axiosCliente.get('/persona')
  .then ((respuesta=>{
    setPersona(respuesta.data.personas);
  }))
  .catch((error=>{
    console.log(error);
  }));
};
getPersonas();
},[]);


useEffect(() =>{
  const getLibro= () => {
    axiosCliente.get(`/libro/${id}`)
    .then(respuesta =>{
        setLibro(respuesta.data);
        setLibroMuestra(respuesta.data[0]);
      })
    .catch((error=>{
        console.log(error);
      }));
  }; 
  getLibro();
},[id]);



return (
   
  <div>
    <br></br>
    <br></br> 
    <h3 className="text-center">Libro a modificar</h3>
    <br></br>
    <br></br> 
    <table className="table table-striped table-responsive table-bordered">
       <thead>
         <tr>
           <th className="tituloItem"scope="col">Id</th>
           <th className="tituloItem"scope="col">Libro</th>
           <th className="tituloItem"scope="col">Descripcion</th>
           
         </tr>
       </thead>
       <tbody>
         <tr>
            <td className="renglonNro">{id}</td>
            <td className="renglonPresta" > {libroMuestra.nombre} </td>
            <td className="renglonPresta" > {libroMuestra.descripcion}</td>
            
         </tr>
       </tbody>   
  </table> 


    <br></br>
    <br></br> 
    <form onSubmit={enviar} className="container me-md-3" >
      <br></br>     
      <h5 className="modifH5">Prestar el libro a : </h5>
      <br></br>
      <div>
          <div className="prestaInput col-sm-5  container ">   
            <select type="text" className="form-select"
                    name="persona_id" 
                    required
                    onChange={cambios}   
                    > 
                    <option value={-1} >Seleccione... </option>
                    {persona.map(unaPersona =>(
                    <option key={unaPersona.id} value={unaPersona.id} >
                     {unaPersona.id} {" - "} {unaPersona.apellido} {" , "} {unaPersona.nombre}
                    </option>
                    )
                    )}
            </select>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center"> 
                <button type="submit" name="presta" className="m-3 btn btn-primary md-end">Guardar</button>
                <Link to={'/ListadoLibros'} className="m-3 mr-md-2 btn btn-primary"
                   role="button" aria-pressed="true"> Volver </Link>        
            </div>
          </div>
      </div>
    </form>
  </div>
)  
};

export default withRouter(PrestaLibro);

