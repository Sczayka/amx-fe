import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
