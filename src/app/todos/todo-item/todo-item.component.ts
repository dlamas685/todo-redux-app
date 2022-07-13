import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!:Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;
  chkCompletado!: FormControl;
  txtInput!: FormControl;
  editando:boolean = false;

  constructor(
    private store: Store<AppState>
  ) {
    this.chkCompletado = new FormControl();
    this.txtInput = new FormControl();
    // this.chkCompletado = new FormControl(this.todo.completado);
    // this.txtInput = new FormControl(this.todo.texto, Validators.required);
  }

  ngOnInit(): void {

    this.txtInput.setValue(this.todo.texto);
    this.chkCompletado.setValue(this.todo.completado);
    this.txtInput.addValidators(Validators.required);

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch(actions.toggle({id: this.todo.id}));
    });
  }

  editar(){
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 50);
  }

  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid) return;
    if (this.txtInput.value === this.todo.texto) return;
    this.store.dispatch(actions.editar({id:this.todo.id, texto:this.txtInput.value}));
  }

  borrar(){
    this.store.dispatch(actions.borrar({id:this.todo.id}));
  }
}