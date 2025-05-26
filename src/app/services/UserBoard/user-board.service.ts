import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, of } from 'rxjs';
import { LoadingService } from '../Loading/loading.service';
import { ApiResponseWithData } from '../../models/api-response';
import { GetAllByUserResponse } from '../../models/UserBoard/Responses/get-all-response.model';
import { AddBoardRequest } from '../../models/UserBoard/Requests/add-board-request.model';
import { AddUserToDeviceRequest } from '../../models/UserBoard/Requests/add-user-to-device-request.model';

@Injectable({ providedIn: 'root' })
export class UserBoardService {
  private apiUrl = '/api/user-board';

  constructor(private http: HttpClient, private loading: LoadingService) {}

  getAll(): Observable<ApiResponseWithData<GetAllByUserResponse>> {
    this.loading.show();
    return this.http.get<any>(`${this.apiUrl}/get-all`).pipe(
      finalize(() => this.loading.hide())
    );
  }

  addBoard(request: AddBoardRequest): Observable<ApiResponseWithData<boolean>> {
    return this.http.post<any>(`${this.apiUrl}/add`, request);
  }

  addUserToDevice(request: AddUserToDeviceRequest) {
    return this.http.post<any>(`${this.apiUrl}/add-user`, request);
  }

  updateDeviceName(boardId: string, newCustomName: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, {
      boardId,
      newCustomName,
    });
  }
}
