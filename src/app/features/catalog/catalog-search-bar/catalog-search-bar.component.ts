import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-catalog-search-bar',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './catalog-search-bar.component.html',
})
export class CatalogSearchBarComponent {
  
}
