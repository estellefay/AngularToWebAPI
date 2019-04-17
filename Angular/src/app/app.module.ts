import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
//Routing
import { AppRoutingModule } from './app-routing.module';
//Componenet
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
//Service
import { OrderService } from './shared/order.service';

//Material Angular
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
