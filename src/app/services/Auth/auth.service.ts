import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, of } from 'rxjs';
import { LoadingService } from '../Loading/loading.service';
import { BaseApiService } from '../base-api.service';
import { RegisterRequest } from '../../models/User/Requests/register-request.model';
import { LoginRequest } from '../../models/User/Requests/login-request.model';
import { ApiResponse, ApiResponseWithData } from '../../models/api-response';
import { RegisterResponse } from '../../models/User/Responses/register-response.model';
import { LoginResponse } from '../../models/User/Responses/login-response.model';
import { GetProfileResponse } from '../../models/User/Responses/get-profile-response.model';
import { UpdatePasswordRequest } from '../../models/User/Requests/update-password-request.model';

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
    return this.http
      .post<any>(`${this.apiUrl}/register`, registerRequest)
      .pipe(finalize(() => this.loadingService.hide()));
  }

  login(
    loginRequest: LoginRequest
  ): Observable<ApiResponseWithData<LoginResponse>> {
    this.loadingService.show();
    return this.http
      .post<any>(`${this.apiUrl}/login`, loginRequest)
      .pipe(finalize(() => this.loadingService.hide()));
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  sendConfirmEmail(email: string): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http
      .post<any>(`${this.apiUrl}/send-confirm-email?email=${email}`, null)
      .pipe(finalize(() => this.loadingService.hide()));
  }

  confirmEmail(token: string): Observable<ApiResponse> {
    const headers = { Authorization: `Bearer ${token}` };
    this.loadingService.show();
    return this.http
      .post<any>(`${this.apiUrl}/confirm-email`, null, { headers })
      .pipe(finalize(() => this.loadingService.hide()));
  }

  sendRecoveryPasswordEmail(email: string): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http
      .post<any>(`${this.apiUrl}/send-recovery-password?email=${email}`, null)
      .pipe(finalize(() => this.loadingService.hide()));
  }

  ConfirmResetPassword(
    token: string,
    newPassword: string
  ): Observable<ApiResponse> {
    const headers = { Authorization: `Bearer ${token}` };
    this.loadingService.show();
    return this.http
      .post<any>(
        `${this.apiUrl}/reset-password?newPassword=${newPassword}`,
        null,
        { headers }
      )
      .pipe(finalize(() => this.loadingService.hide()));
  }

  getProfile(): Observable<ApiResponseWithData<GetProfileResponse>> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  updateName(newName: string): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http
      .put<ApiResponse>(
        `${this.apiUrl}/update-name?newName=${encodeURIComponent(newName)}`,
        null
      )
      .pipe(finalize(() => this.loadingService.hide()));
  }

  updateEmail(newEmail: string): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http
      .put<ApiResponse>(
        `${this.apiUrl}/update-email?newEmail=${encodeURIComponent(newEmail)}`,
        null
      )
      .pipe(finalize(() => this.loadingService.hide()));
  }

  updatePassword(request: UpdatePasswordRequest): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http
      .put<ApiResponse>(`${this.apiUrl}/update-password`, request)
      .pipe(finalize(() => this.loadingService.hide()));
  }

  deleteAccount(): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http
      .delete<ApiResponse>(`${this.apiUrl}/delete-account`)
      .pipe(finalize(() => this.loadingService.hide()));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
