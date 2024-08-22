import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// PrimeNG
import { CardModule } from 'primeng/card';

// Components
import { OrdersFormComponent } from '@features/orders/orders-form/orders-form.component';
import { OrdersListComponent } from '@features/orders/orders-list/orders-list.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, CardModule, RouterModule, OrdersListComponent, OrdersFormComponent],
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  public step!: string;

  public cardTitle!: string;

  public cardSubTitle!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.step = data['step'];

      this.cardTitle = data['cardTitle'];

      this.cardSubTitle = data['cardSubTitle'];
    })
  }
}
