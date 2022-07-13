import { Action, createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.actions';

export const estadoIncial:filtrosValidos = 'todos';

export const filtroReducer = createReducer<filtrosValidos, Action>(
  estadoIncial,
  on(setFiltro, (state, {filtro}) => filtro)

);

