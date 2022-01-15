import React from 'react';


const BotonPrestamo=() =>{


//inicializo valor   
const state= {
    id:'2'
}

//
const pulsar=(event)=> {
    if (event.target.id === '2'){
        (console.log(event.target.id));
    };
}


return(
    <div>
        <button type="button" 
                id={state.value}
                className="btn btn-primary"
                onClick={pulsar} 
                name="prestamos"
        >
        Presta
        </button>
      {/* <Redirect to='/FormularioLibro'/> */}
    </div>
  )
}


export default BotonPrestamo;