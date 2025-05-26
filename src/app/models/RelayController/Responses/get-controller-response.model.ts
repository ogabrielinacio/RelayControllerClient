import { RoutineResponse } from './routine-response.model';

export interface GetRelayControllerBoardResponse {
  id: string;
  isActive: boolean;
  isEnable: boolean;
  routines: RoutineResponse[];
}
