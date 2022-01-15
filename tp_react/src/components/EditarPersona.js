import React, {useState,useEffect} from 'react';
import axiosCliente from '../Configuracion/axiosCliente';
import { withRouter } from 'react-router';
import Swal from 'sweetalert2';

const EditarPersona = (props) =>{

  const {id} = props.match.params;
  const [persona, setPersona] = useState(
    {
      id:'',
      nombre:'',
      apellido:'',
      email:'',
      alias:''
    }
  );

  const cambios=(e)=>{
    setPersona({
        ...persona,
        [e.target.name]:e.target.value  
    });
  };

  const enviar = (e) =>{
    e.preventDefault();
    editPersona();
  };

  useEffect(() =>{
    const getPersona= () => {
      axiosCliente.get(`/persona/${id}`)
      .then(respuesta =>{
        setPersona(respuesta.data.persona[0]);
      });
    }; 
    getPersona();
  },[id]);

  const editPersona=()=>{
    axiosCliente.put(`/persona/${id}`,persona)
    .then (respuesta=>{
      console.log(respuesta)
      Swal.fire({
        icon: 'success', 
        title:'',
        text: respuesta.data.msg
      })
    
      if(respuesta.data.msg){
        props.history.push('/ListadoPersonas');
      }       
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.msg
      });
    })
  };

  return (
    <form onSubmit={enviar} className="container-sm col-6 col-md-4">
    <br></br>
    <br></br>
    <h3>Persona a modificar...</h3>
      <div className="form-group "> 
        <label htmlFor="name">Nombre : </label>
        <input type="text"
          className="form-control" 
          name="nombre"
          placeholder="Ingresar Nombre"
          defaultValue={persona.nombre}
          required       
          onChange={cambios}
        />
      </div>

      <div className="form-group"> 
        <label htmlFor="name">Apellido : </label>
        <input type="text" className="form-control" 
                name="apellido" placeholder="Ingresar Apellido"
                defaultValue={persona.apellido} 
                required
                onChange={cambios}
        />
      </div>

      <div className="form-group"> 
        <label htmlFor="name">Email : </label>
        <input type="email" className="form-control" 
                name="email" placeholder="Ingresar Email"
                defaultValue={persona.email}
                disabled 
                onChange={cambios}
        />
      </div>

      <div className="form-group"> 
        <label htmlFor="name">Alias : </label>
        <input type="text" className="form-control" 
                name="alias" placeholder="Ingresar Alias"
                defaultValue={persona.alias}
                required   
                onChange={cambios}    
        />
      </div>

      <button type="submit" className="btn btn-primary">Guardar</button>

    </form>
  )  
};

export default withRouter(EditarPersona);

