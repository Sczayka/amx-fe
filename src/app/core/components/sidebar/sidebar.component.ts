import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface SidebarItem {
  path: string
  title: string
  icon: string
  active: boolean,
  permissions: string[]
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  public sidebarItems: SidebarItem[] = [
    {
      path: 'panel/dashboard',
      title: 'Dashboard',
      icon: 'home',
      permissions: ['admin', 'seller'],
      active: false,
    },
    {
      path: 'panel/vehicles',
      title: 'Vehicles',
      icon: 'car',
      permissions: ['admin'],
      active: false,
    },
    {
      path: 'panel/orders',
      title: 'Orders',
      icon: 'book',
      permissions: ['admin', 'seller'],
      active: false,
    },
    {
      path: 'panel/clients',
      title: 'Clients',
      icon: 'users',
      permissions: ['admin', 'seller'],
      active: false,
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.sidebarItems.forEach(item => {
      item.active = location.pathname.includes(item.path);
    })

    this.filterSidebarByRoles()
  }

  public filterSidebarByRoles() {
    const user = JSON.parse(localStorage.getItem('user')!) || JSON.parse(sessionStorage.getItem('user')!);
    
    this.sidebarItems = this.sidebarItems.filter((item) => item.permissions.includes(user.role))
  }

  public navigate(item: SidebarItem) {
    this.sidebarItems.forEach(item => item.active = false);

    item.active = true;

    this.router.navigate([`/${item.path}`]);
  }

  public disconnect(): void {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')

    location.reload()
  }
}
