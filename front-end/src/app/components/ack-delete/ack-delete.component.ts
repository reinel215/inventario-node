import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ack-delete',
  templateUrl: './ack-delete.component.html',
  styleUrls: ['./ack-delete.component.scss']
})
export class AckDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AckDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }



  eliminar(){

    this.dialogRef.close(true);
  }



  cancelar(){

    this.dialogRef.close(false);

  }

}
