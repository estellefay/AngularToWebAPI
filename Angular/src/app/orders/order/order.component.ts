import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/costumer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  customerList: Customer[];
  isValid: boolean = true;

  //Inclure Order service dans le constructeur 
  constructor(
    public service:OrderService,
    //Objet dialogue 
    private dialog:MatDialog,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.customerService.getCustomerList().then(res =>
      this.customerList = res as Customer[]);
  }

  // generate form vide
  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formData = {
      OrderID: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0,
    };
    this.service.orderItems = [];
}

  //edit or add in new pop pup
  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
}

  //Remove item in array
  onDeleteOrderItem(orderItemID: number, i:number){
    this.service.orderItems.splice(i,1);
    this.updateGrandTotal();
  }

  // Prix total de la commande
  updateGrandTotal() {
    this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
}

  //Verifier que le form est valid
  validateForm() {
    this.isValid = true;
    //Id du client non valide
    if (this.service.formData.CustomerID==0) {
      this.isValid = false;
      //Si la comande est vide
    } else if (this.service.orderItems.length==0) {
      this.isValid = false;
    }
    return this.isValid;   
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        //On repasse à un formulaire vide ( comme lorsqu'ont refresh la page)
        debugger
        this.resetForm();
        this.toastr.success('Submitted Successfully', 'Restaurant App'); 
        this.router.navigate(['/orders']);  
      })
    }
  }
}


