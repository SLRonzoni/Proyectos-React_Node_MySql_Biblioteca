const estadoInicial = [];

export function categoriaReducer(state = estadoInicial, action) {
    let nuevoEstado = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'categoria/completarCategoria':{
            nuevoEstado = action.categoria;
            return nuevoEstado;
        }
        case 'categoria/agregarCategoria':{
            return estadoInicial;
        }
        case 'categoria/eliminarCategoria':{
            nuevoEstado = nuevoEstado.filter( (categoria) => categoria.id !== action.id)
            return nuevoEstado;
        }
        case 'categoria/modificarCategoria':{
            nuevoEstado = nuevoEstado.map( categoria => categoria.id === action.id ? { ...categoria, nombre: action.nombre.toUpperCase() } : categoria)
            return nuevoEstado;
        }
        default:
            return state;
    }
}

// Selector
export const getCategoriaRedux = (state) => state.categoria;