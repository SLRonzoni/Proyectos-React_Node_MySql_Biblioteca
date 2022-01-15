import { createStore, combineReducers } from 'redux';
import { categoriaReducer } from './categoria';
import { libroReducer } from './libro';
import { personaReducer } from './persona';

export const store = createStore(
    combineReducers({
        categoria: categoriaReducer,
        libro: libroReducer,
        persona: personaReducer,
    })
);