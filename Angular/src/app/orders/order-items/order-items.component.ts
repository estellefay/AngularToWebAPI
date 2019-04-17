import { Component, OnInit, Inject } from '@angular/core';
// Import les datas qui sont passer en arguments dans orderComponen 
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
//Import des models
import { OrderItem } from 'src/app/shared/order-item.model';
import { Item } from 'src/app/shared/item.model';
//Import des services
import { ItemService } from 'src/app/shared/item.service';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {

  formData:OrderItem;
  itemList: Item[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<OrderItemsComponent>,
    private itemService:ItemService
  ) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    this.formData = {
      OrderItemID:null,
      OrderID: this.data.OrderID,
      ItemID:0,
      ItemName:'',
      Price:0,
      Quantity:0,
      Total:0
    }
  }
}
