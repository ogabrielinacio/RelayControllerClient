import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { LoadingService } from '../Loading/loading.service';
import { BaseApiService } from '../base-api.service';
import { ApiResponse, ApiResponseWithData } from '../../models/api-response';
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
    return this.http.put<any>(`${this.apiUrl}/add-routine`, newRoutine).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
