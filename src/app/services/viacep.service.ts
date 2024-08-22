import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViaCepResponse } from '@shared/interfaces/viacep.interface';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  constructor(private http: HttpClient) { }

  public findAddress(cep: string): Promise<ViaCepResponse> {
    return new Promise((resolve, reject) => {
      this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe({
          next: (res: ViaCepResponse) => {
            if (res.erro) reject()
            resolve(res)
          },
          error: (err) => reject(err)
        })
    })
  }
}
