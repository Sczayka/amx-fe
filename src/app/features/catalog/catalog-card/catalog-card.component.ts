import { Component, Input } from '@angular/core';
import { Vehicle } from '@shared/interfaces/vehicles.interface';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-catalog-card',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './catalog-card.component.html',
  styleUrl: './catalog-card.component.scss'
})
export class CatalogCardComponent {
  @Input() vehicle!: Vehicle

  get cardImage() {
    if (this.vehicle.gallery[0]) return this.vehicle.gallery[0].base64
    
    return '../../../../assets/img/placeholder.png'
  }

  get subHeader() {
    return `${this.vehicle.manufacturerName} - ${this.vehicle.year} - ${this.vehicle.fuelTypeName} - ${this.vehicle.colorName}`
  }
}
