import { DayOfWeek } from '../../../enums/day-of-week.enum';
import { Repeat } from '../../../enums/repeat.enum';

export interface RoutineRequest {
  id: string // board id
  startTime: string; // format "HH:mm:ss"
  endTime?: string | null; // format "HH:mm:ss"
  repeat: Repeat;
}
