import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// Components
import { VehiclesFormComponent } from "@features/vehicles/vehicles-form/vehicles-form.component";
import { VehiclesListComponent } from "@features/vehicles/vehicles-list/vehicles-list.component";

// PrimeNG
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, CardModule, RouterModule, VehiclesFormComponent, VehiclesListComponent],
  templateUrl: './vehicles.component.html',
})
export class VehiclesComponent implements OnInit {
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
