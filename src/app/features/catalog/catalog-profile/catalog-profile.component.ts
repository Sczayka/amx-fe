import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// PrimeNG
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';

// Components
import { CatalogNavbarComponent } from '../catalog-navbar/catalog-navbar.component';
import { ClientsFormComponent } from '@features/clients/clients-form/clients-form.component';
import { OrderService } from '@services/order.service';
import { Order } from '@shared/interfaces/order.interface';

@Component({
  selector: 'app-catalog-profile',
  standalone: true,
  imports: [CommonModule, CatalogNavbarComponent, ClientsFormComponent, MenubarModule, CardModule, ToastModule, DataViewModule],
  providers: [MessageService],
  templateUrl: './catalog-profile.component.html',
  styleUrl: './catalog-profile.component.scss'
})
export class CatalogProfileComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user')!) || JSON.parse(sessionStorage.getItem('user')!);

  public step = 'orders';

  public items = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => this.step = 'profile'
    },
    {
      label: 'Orders',
      icon: 'pi pi-book',
      command: () => this.step = 'orders'
    }
  ]

  public orders: Order[] = []

  constructor(private orderService: OrderService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.findOrdersByUser()
  }

  private async findOrdersByUser() {
    try {
      this.orders = await this.orderService.findByClientId(this.user.client.id)
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch orders' })
    }
  }
}
