import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';

// Services
import { BaseHttpService } from './base-http.service';

// Interfaces
import { Order } from '@shared/interfaces/order.interface';
import { Preload } from '@shared/interfaces/preload.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseHttpService<Order> {
  private STATUS_PATH = 'orders-status';

  constructor(public override http: HttpClient) {
    super(http, 'orders')
  }

  public findOrderStatus(): Promise<Preload[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Preload[]>(`${environment.BASE_API}/${this.STATUS_PATH}`)
        .subscribe({
          next: (res: Preload[]) => resolve(res),
          error: (err) => reject(err)
        })
    })
  }

  public findByClientId(id: string): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Order[]>(`${environment.BASE_API}/orders?clientId=${id}`)
        .subscribe({
          next: (res: Order[]) => resolve(res),
          error: (err) => reject(err)
        })
    })
  }
}
