const estadoInicial = [];

export function personaReducer(state = estadoInicial, action) {
    let nuevoEstado = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'persona/completarPersona': {
            nuevoEstado = action.persona;
            return nuevoEstado;
        }
        case 'categoria/eliminarPersona':{
            nuevoEstado = nuevoEstado.filter( (persona) => persona.id !== action.id)
            return nuevoEstado;
        }
        default:
            return state;
    }
}

// Selector
 export const getPersonaRedux = (state) => state.persona;