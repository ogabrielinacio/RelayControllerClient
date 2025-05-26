import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, of } from 'rxjs';
import { LoadingService } from '../Loading/loading.service';
import { BaseApiService } from '../base-api.service';
import { RegisterRequest } from '../../models/User/Requests/register-request.model';
import { LoginRequest } from '../../models/User/Requests/login-request.model';
import { ApiResponseWithData } from '../../models/api-response';
import { RegisterResponse } from '../../models/User/Responses/register-response.model';
import { LoginResponse } from '../../models/User/Responses/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {
  private readonly apiUrl = this.getApiUrl('user');

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
    super();
  }

  register(
    registerRequest: RegisterRequest
  ): Observable<ApiResponseWithData<RegisterResponse>> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  login(
    loginRequest: LoginRequest
  ): Observable<ApiResponseWithData<LoginResponse>> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}/login`, loginRequest).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
