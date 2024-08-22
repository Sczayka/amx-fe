import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '@services/order.service';
import { Order } from '@shared/interfaces/order.interface';
import { MenuItem, MessageService } from 'primeng/api';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, TableModule, TieredMenuModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent {
  public orders!: Order[];

  public selectedOrder!: Order;

  public items: MenuItem[] = [
    {
      label: 'Open',
      command: () => this.router.navigate(['/panel/orders', this.selectedOrder.id])
    },
  ]

  constructor(private router: Router, private orderService: OrderService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.findOrders()
  }

  public async findOrders() {
    try {
      this.orders = await this.orderService.find()
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch orders' })
    }
  }
}
