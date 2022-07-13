import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actionsFiltro from '../filtro/filtro.actions';
import * as actionsTodo from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actionsFiltro.filtrosValidos = 'todos';
  filtros: actionsFiltro.filtrosValidos [] = ['todos','compleatados', 'pendientes'];
  pendientes: number = 0;

  constructor(
    private store:Store<AppState>
  ) { }

  ngOnInit(): void {
    // this.store.select('filtro').subscribe(filtro => this.filtroActual = filtro);

    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    })
  }

  seleccionarFiltro(filtro:actionsFiltro.filtrosValidos){
    this.store.dispatch(actionsFiltro.setFiltro({filtro}));
  }

  limpiarCompletados(){
    this.store.dispatch(actionsTodo.limpiarCompletados())
  }

}
