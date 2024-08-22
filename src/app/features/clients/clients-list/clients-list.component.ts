import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';

// Interfaces
import { Client } from '@shared/interfaces/clients.interface';

// Services
import { ClientService } from '@services/client.service';
import { FormatPhoneNumberPipe } from '@shared/pipes/format-phone-number.pipe';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, TableModule, TieredMenuModule, ButtonModule, ToastModule, ConfirmDialogModule, FormatPhoneNumberPipe],
  providers: [MessageService, ConfirmationService],
  templateUrl: './clients-list.component.html',
})
export class ClientsListComponent {
  public clients!: Client[];

  public selectedClient!: Client;

  public items: MenuItem[] = [
    {
      label: 'Open',
      command: () => this.router.navigate(['/panel/clients', this.selectedClient.id])
    },
    {
      label: 'Remove',
      command: () => this.openRemoveConfirmDialog()
    }
  ]

  constructor(private router: Router, private clientService: ClientService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.findClients()
  }

  private openRemoveConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete confirmation',
      icon: 'pi pi-exclamation-triangle text-xl',
      acceptButtonStyleClass: "p-button-text p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-secondary",
      accept: () => this.removeClient(this.selectedClient)
    });
  }

  public async findClients() {
    try {
      this.clients = await this.clientService.find()
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch clients' })
    }
  }

  private async removeClient(client: Client) {
    try {
      await this.clientService.remove(client.id!)

      this.findClients();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle removed' })
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to remove vehicle' })
    }
  }
}
