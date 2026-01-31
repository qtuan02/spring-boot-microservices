import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '~/core/tokens/environment.token';

export interface RequestOptions {
  path: string;
  params?: HttpParams;
  context?: HttpContext;
}

@Injectable({ providedIn: 'root' })
export class BaseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(ENVIRONMENT).apiBaseUrl;

  protected get<T>({ path, params, context }: RequestOptions): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, {
      params,
      context,
    });
  }

  protected post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body);
  }

  protected put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body);
  }

  protected patch<T>(path: string, body: unknown): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body);
  }

  protected delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }
}
