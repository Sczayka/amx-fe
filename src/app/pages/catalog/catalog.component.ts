import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// PrimeNG
import { CarouselModule } from 'primeng/carousel';

// Components
import { CatalogNavbarComponent } from '@features/catalog/catalog-navbar/catalog-navbar.component';
import { CatalogSearchBarComponent } from '@features/catalog/catalog-search-bar/catalog-search-bar.component';
import { CatalogCardComponent } from '@features/catalog/catalog-card/catalog-card.component';

// Service
import { VehicleService } from '@services/vehicle.service';
import { Vehicle } from '@shared/interfaces/vehicles.interface';


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CarouselModule, CatalogNavbarComponent, CatalogSearchBarComponent, CatalogCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user')!) || JSON.parse(sessionStorage.getItem('user')!);

  public gallery = [
    "../../../assets/img/catalog-bg-1.jpeg",
    "../../../assets/img/catalog-bg-2.jpg",
    "../../../assets/img/catalog-bg-3.jpg",
  ]

  public vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }

  public ngOnInit(): void {
    if(this.user && this.user?.role != 'client')  {
      localStorage.removeItem('user')
      sessionStorage.removeItem('user')
  
      location.reload()
    }

    this.findVehicles()
  }

  private async findVehicles() {
    this.vehicles = await this.vehicleService.find();
  }

  public formatGalleryUrl(url: string) {
    return `background-image: url(${url})`
  }
}
