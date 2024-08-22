import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';

// Services
import { BaseHttpService } from './base-http.service';

// Interfaces
import { Client } from '@shared/interfaces/clients.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseHttpService<Client> {
  constructor(public override http: HttpClient) {
    super(http, 'clients')
  }

  findByEmail(email: string): Promise<Client> {
    return new Promise((resolve, reject) => {
      this.http.get<Client[]>(`${environment.BASE_API}/clients?email=${email}`)
        .subscribe({
          next: (res: Client[]) => resolve(res[0]),
          error: (err) => reject(err)
        })
    })
  }
}
