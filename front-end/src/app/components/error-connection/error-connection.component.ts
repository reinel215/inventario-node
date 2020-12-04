import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-connection',
  templateUrl: './error-connection.component.html',
  styleUrls: ['./error-connection.component.scss']
})
export class ErrorConnectionComponent implements OnInit {

  @Output() reintentarEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }


  reintentar(){
    this.reintentarEvent.emit('reintentar');
  }

}
