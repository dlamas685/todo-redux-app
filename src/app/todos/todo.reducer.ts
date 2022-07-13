import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, limpiarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoIncial:Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje de Iroman'),
    new Todo('Robar escudo del Capitan America')
];

export const todoReducer = createReducer(
  estadoIncial,
  on(crear, (state, {texto}) => [...state, new Todo(texto)]),
  on(toggle, (state, {id}) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {...todo, completado: !todo.completado}
      }
      else {
        return todo;
      }
    });
  }),
  on(editar, (state, {id, texto}) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {...todo, texto: texto}
      }
      else {
        return todo;
      }
    });
  }),
  on(borrar, (state, {id})=> state.filter(todo => todo.id !== id)),
  on(toggleAll, (state, {completado})=> state.map(todo => ({...todo, completado:completado}))),
  on(limpiarCompletados, state => state.filter(todo => !todo.completado))
);