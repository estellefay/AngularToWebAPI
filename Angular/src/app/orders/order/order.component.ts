import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  //Inclure Order service dans le constructeur 
  constructor(public service:OrderService,
    //Objet dialogue 
    private dialog:MatDialog) { }

  ngOnInit() {
    this.resetForm();
  }

  // generate form vide
  resetForm(form?:NgForm) {
    //Si le 
    if(form=null)
      form.resetForm();
    this.service.formData= {
      OrderID: null,
      OrderNo: Math.floor(100000+Math.random()*900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal:0
    };
    this.service.orderItems=[];
  }

  //edit or add in new pop pup
  AddOrEditeOrderItem(orderItemIndex, OrderID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {orderItemIndex, OrderID};
    //J'ouvre un fenetre de dialogue contenant OrderItemComenent
    this.dialog.open(OrderItemsComponent, dialogConfig);
  }

  //Remove item in array
  onDeleteOrderItem(orderItemID: number, i:number){
    this.service.orderItems.splice(i,1);

  }

}
