import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

// PrimeNG
import { ProgressBarModule } from 'primeng/progressbar';

// Components
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent, ProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public renderOutside = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!location.pathname.includes('panel')) this.renderOutside = true
    else this.isLogged();
  }

  private isLogged(): void {
    const user = JSON.parse(localStorage.getItem('user')!) || JSON.parse(sessionStorage.getItem('user')!);

    if (user?.role === 'client') {
      this.renderOutside = true;

      this.router.navigate(['/home']);
    }

    if (!user) {
      this.renderOutside = true;

      this.router.navigate(['/login'])
    }
  }
}
