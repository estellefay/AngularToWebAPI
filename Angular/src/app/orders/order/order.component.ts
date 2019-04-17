import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  //Inclure Order service dans le constructeur 
  constructor(private service:OrderService,
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

  AddOrEditeOrderItem(orderItemIndex, OrderID){
    //J'ouvre un fenetre de dialogue contnant OrderItemComenent
    this.dialog.open(OrderItemsComponent);
  }

}
