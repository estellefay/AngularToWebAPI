import { Component, OnInit, Inject } from '@angular/core';
// Import les datas qui sont passer en arguments dans orderComponen 
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
//Import des models
import { OrderItem } from 'src/app/shared/order-item.model';
import { Item } from 'src/app/shared/item.model';
//Import des services
import { ItemService } from 'src/app/shared/item.service';
import { OrderService } from '../../shared/order.service';
//Import Form
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {

  formData:OrderItem;
  itemList: Item[];
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<OrderItemsComponent>,
    private itemService:ItemService,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    //Requete HTTP pour récupere la liste des item ( donc leurs prix ,nom ect)
    this.itemService.getItemList().then(
      //La reponse est stocker dans le tableau
      res => this.itemList = res as Item[]
    );

    // Si les info sont de l'index sont null je met un formulaire non remplie
    if (this.data.orderItemIndex==null) {
      // Initialiser le formulaire
      this.formData = {
        OrderItemID:null,
        OrderID: this.data.OrderID,
        ItemID:0,
        ItemName:'',
        Price:0,
        Quantity:0,
        Total:0
      }
      //Sinon je le préremplie
    } else {
        // Avec les donner récupérer ( Update des info )
        this.formData = Object.assign({},this.orderService.orderItems[this.data.orderItemIndex]);
    }
  }


  // Mise à jour de prix en fonciton de la selection
  updatePrice(ctrl) {
    if(ctrl.selectedIndex==0){
      this.formData.Price = 0;
      this.formData.ItemName = '';

    } else {
      this.formData.Price = this.itemList[ctrl.selectedIndex-1].Price
      this.formData.ItemName = this.itemList[ctrl.selectedIndex-1].Name
    }
    this.updateTotal();
  }

  //Mise a jour du prix en fonction des quantité
  updateTotal(){
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2))
  }

  //Action lors de la validation du formulaire
  onSubmit(form:NgForm){
    //
    if (this.validateForm(form.value)) {
      //Si l'index est égale à nul
      if(this.data.orderItemIndex==null)
        this.orderService.orderItems.push(form.value);
      else
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();  
    }
  }

  // Si quantity oy itemID sont egale à zero on retourne FALSE
  validateForm(formData:OrderItem){
    this.isValid = true;
    if (formData.ItemID==0)
      this.isValid = false;    
    else if (formData.Quantity==0)
      this.isValid = false;    
    return this.isValid;
  }
}
