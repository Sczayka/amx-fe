import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

// Services
import { MessageService } from 'primeng/api';
import { OrderService } from '@services/order.service';
import { ClientService } from '@services/client.service';
import { VehicleService } from '@services/vehicle.service';

// Interfaces
import { Preload } from '@shared/interfaces/preload.interface';
import { Vehicle } from '@shared/interfaces/vehicles.interface';
import { Client } from '@shared/interfaces/clients.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '@shared/interfaces/order.interface';

@Component({
  selector: 'app-orders-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ToastModule, DropdownModule],
  providers: [MessageService],
  templateUrl: './orders-form.component.html'
})
export class OrdersFormComponent implements OnInit {
  private id!: string;

  public form = this.fb.group({
    vehicleId: ['', Validators.required],
    vehicleModel: ['', Validators.required],
    clientId: ['', Validators.required],
    clientName: ['', Validators.required],
    statusId: ['', Validators.required],
    statusName: ['', Validators.required],
    createdAt: [''],
    updatedAt: [''],
  });

  public orderStatus: Preload[] = [];

  public vehicles: Vehicle[] = [];

  public clients: Client[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private orderService: OrderService, private vehicleService: VehicleService, private clientService: ClientService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) this.findOrder();
    });

    this.findOrdersStatus();

    this.findVehicles();

    this.findClients();
  }

  public handleDropdownChange(event: DropdownChangeEvent, controlName: string, controlValue: string, options: Preload[] | Vehicle[] | Client[],) {
    const find: any = options.find((el: Preload | Vehicle | Client) => el.id === event.value);

    if (!find) return;

    this.form.get(controlName)?.setValue(find[controlValue]);
  }

  private async findOrder() {
    try {
      const order = await this.orderService.findById(this.id);

      this.form.patchValue(order)
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch order' })
    }
  }

  private async findOrdersStatus() {
    try {
      this.orderStatus = await this.orderService.findOrderStatus();
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch order status' })
    }
  }

  private async findVehicles() {
    try {
      this.vehicles = await this.vehicleService.find();
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch vehicles' })
    }
  }

  private async findClients() {
    try {
      this.clients = await this.clientService.find();
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch clients' })
    }
  }

  public async create() {
    const form = {
      ...this.form.getRawValue(),
      createdAt: new Date().toISOString(),
    }

    try {
      const order = await this.orderService.create(form as Order)

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order created' });

      setTimeout(() => this.router.navigate(['/panel/orders', order.id]), 2000);
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create order' })
    }
  }

  public async update() {
    const form = {
      ...this.form.getRawValue(),
      updatedAt: new Date().toISOString(),
    }

    try {
      await this.orderService.update(this.id, form as Order)

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order updated' });
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update the order' })
    }
  }

  public onSave() {
    if (this.form.invalid) return;

    if (this.id) this.update();
    else this.create()
  }

  public clear() {
    this.form.reset();
  }
}
