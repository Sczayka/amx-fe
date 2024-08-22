import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle, VehiclesPreload } from '@shared/interfaces/vehicles.interface';
import { environment } from '@environments/environment.development';

// Service
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseHttpService<Vehicle> {
  private PRELOAD_PATH = 'vehicles-preload';

  constructor(public override http: HttpClient) { 
    super(http, 'vehicles')
  }

  public preload(): Promise<VehiclesPreload> {
    return new Promise((resolve, reject) => {
      this.http.get<VehiclesPreload>(`${environment.BASE_API}/${this.PRELOAD_PATH}`)
        .subscribe({
          next: (res: VehiclesPreload) => resolve(res),
          error: (err) => reject(err)
        })
    })
  }
}
