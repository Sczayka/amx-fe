import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalog-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog-navbar.component.html',
  styleUrl: './catalog-navbar.component.scss'
})
export class CatalogNavbarComponent {
  public user = JSON.parse(localStorage.getItem('user')!) || JSON.parse(sessionStorage.getItem('user')!);

  constructor(private router: Router) { }

  get loginLink() {
    if (this.user) return `/home/profile/${this.user.client.id}`
    return '/login'
  }

  public disconnect(): void {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')

    this.router.navigate(['/home'])
    location.reload()
  }
}
