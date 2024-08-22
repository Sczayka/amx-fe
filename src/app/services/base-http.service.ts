import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService<T> {
  constructor(
    public http: HttpClient,
    @Inject('path') private path: string
  ) { }

  public find(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.http.get<T[]>(`${environment.BASE_API}/${this.path}`)
        .subscribe({
          next: (res: T[]) => resolve(res),
          error: (err) => reject(err)
        })
    })
  }

  public findById(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.get<T>(`${environment.BASE_API}/${this.path}/${id}`)
        .subscribe({
          next: (res: T) => resolve(res),
          error: (err) => reject(err)
        })
    })
  }

  public create(payload: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.post<T>(`${environment.BASE_API}/${this.path}`, payload)
        .subscribe({
          next: (res: T) => resolve(res),
          error: (err) => reject(err)
        })
    })
  }

  public update(id: string, payload: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.put<T>(`${environment.BASE_API}/${this.path}/${id}`, payload)
        .subscribe({
          next: (res: T) => resolve(res),
          error: (err) => reject(err)
        })
    })
  }

  public remove(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.delete<T>(`${environment.BASE_API}/${this.path}/${id}`)
        .subscribe({
          next: (res: T) => resolve(res),
          error: (err) => reject(err)
        })
    })
  }
}
