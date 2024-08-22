import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// PrimeNG
import { CardModule } from 'primeng/card';

// Components
import { ClientsFormComponent } from '@features/clients/clients-form/clients-form.component';
import { ClientsListComponent } from '@features/clients/clients-list/clients-list.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, CardModule, RouterModule, ClientsFormComponent, ClientsListComponent],
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
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
