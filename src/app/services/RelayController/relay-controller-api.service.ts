import { ApiResponse } from './../../models/api-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { LoadingService } from '../Loading/loading.service';
import { BaseApiService } from '../base-api.service';
import { ApiResponseWithData } from '../../models/api-response';
import { GetRelayControllerBoardResponse } from '../../models/RelayController/Responses/get-controller-response.model';
import { RoutineRequest } from '../../models/RelayController/Requests/routine-request.model';

@Injectable({
  providedIn: 'root',
})
export class RelayControllerApiService extends BaseApiService {
  private readonly apiUrl = this.getApiUrl('relay-controller');

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
    super();
  }

  getControllerById(
    id: string
  ): Observable<ApiResponseWithData<GetRelayControllerBoardResponse>> {
    this.loadingService.show();
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  enableController(id: string): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}/${id}/enable`, {}).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  disableController(id: string): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}/${id}/disable`, {}).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  AddRoutine(newRoutine: RoutineRequest): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}/add-routine`, newRoutine).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  RemoveRoutine(request: {
    boardId: string;
    routineId: string;
  }): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http
      .delete<ApiResponse>(`${this.apiUrl}/delete-routine`, {
        body: request,
      })
      .pipe(finalize(() => this.loadingService.hide()));
  }

  SetAutoMode(id: string): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}/${id}/auto-mode`, {}).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  SetManualMode(id: string): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}/${id}/manual-mode`, {}).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
  
  ActivateRoutine(boardId: string, routineId: string): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}/activate-routine`, {boardId, routineId}).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
  DeactivateRoutine(boardId: string, routineId: string): Observable<ApiResponse> {
    this.loadingService.show();
    return this.http.post<any>(`${this.apiUrl}/deactivate-routine`, {boardId, routineId}).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
