import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

// Service
import { ClientService } from '@services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, CheckboxModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private MOCK_LOGINS = [
    {
      email: "admin@hotmail.com",
      password: "!Admin123",
      role: "admin"
    },
    {
      email: "seller@hotmail.com",
      password: "!Seller123",
      role: "seller"
    }
  ]

  public form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    stayLogged: false
  })

  public isLoading = false;

  public showErrorMessage = false;

  constructor(private fb: FormBuilder, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.isLogged();
  }

  private isLogged(): void {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');

    if (user) this.router.navigate(['/panel/dashboard'])
  }

  public async login() {
    this.isLoading = true;

    const form = this.form.getRawValue();
    const login = this.MOCK_LOGINS.find(login => login.email === form.email);

    if (login) {
      if (form.password === login.password) {
        const data = { email: login.email, role: login.role }

        form.stayLogged ?
          localStorage.setItem('user', JSON.stringify(data)) :
          sessionStorage.setItem('user', JSON.stringify(data))

        this.router.navigate(['/panel/dashboard'])

        setTimeout(() => location.reload(), 2000);
      } else {
        this.showErrorMessage = true
        this.isLoading = false;
      }
    } else {
      const client = await this.clientService.findByEmail(form.email!);

      if (client) {
        const data = { client, role: "client" }

        form.stayLogged ?
          localStorage.setItem('user', JSON.stringify(data)) :
          sessionStorage.setItem('user', JSON.stringify(data))

        setTimeout(() => this.router.navigate(['/home']), 2000);
      }
    }
  }
}
