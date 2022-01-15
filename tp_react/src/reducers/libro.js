const estadoInicial = [];

export function libroReducer(state = estadoInicial, action) {
    let nuevoEstado = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'persona/completarLibro': {
            nuevoEstado = action.libro;
            return nuevoEstado;
        }
        case 'categoria/eliminarLibro':{
            nuevoEstado = nuevoEstado.filter( (libro) => libro.id !== action.id)
            return nuevoEstado;
        }
        default:
            return state;
    }
}

// Selector
 export const getLibroRedux = (state) => state.libro;