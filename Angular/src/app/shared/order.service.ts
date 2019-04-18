import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //Model order
  formData: Order;
  orderItems: OrderItem[];

  constructor(private http:HttpClient) { }

  //HTTP CLIENT post des données
  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      OrderIems: this.orderItems
    };
  return this.http.post(environment.apiURL + '/Order', body);
  }
}
