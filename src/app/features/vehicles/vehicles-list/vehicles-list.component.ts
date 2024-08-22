// Angular
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MenuItem, MenuItemCommandEvent, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// Services
import { VehicleService } from '@services/vehicle.service';

// Interfaces
import { Vehicle } from '@shared/interfaces/vehicles.interface';


@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [CommonModule, TableModule, TieredMenuModule, ButtonModule, ToastModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './vehicles-list.component.html',
})
export class VehiclesListComponent implements OnInit {
  public vehicles!: Vehicle[];

  public selectedVehicle!: Vehicle;

  public items: MenuItem[] = [
    {
      label: 'Open',
      command: () => this.router.navigate(['/panel/vehicles', this.selectedVehicle.id])
    },
    {
      label: 'Remove',
      command: () => this.openRemoveConfirmDialog()
    }
  ]

  constructor(private router: Router, private vehicleService: VehicleService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.findVehicles()
  }

  private openRemoveConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete confirmation',
      icon: 'pi pi-exclamation-triangle text-xl',
      acceptButtonStyleClass: "p-button-text p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-secondary",
      accept: () => this.removeVehicle(this.selectedVehicle)
    });
  }

  public async findVehicles() {
    try {
      this.vehicles = await this.vehicleService.find()
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch vehicles' })
    }
    
  }

  private async removeVehicle(vehicle: Vehicle) {
    try {
      await this.vehicleService.remove(vehicle.id!)

      this.findVehicles();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle removed' })
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to remove vehicle' })
    }
  }
}
