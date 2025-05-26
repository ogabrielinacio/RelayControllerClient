export interface GetAllByUserResponse {
  userId: string; // Guid = string
  boards: BoardInfo[];
}
export interface BoardInfo {
  relayControllerBoardId: string; // Guid = string
  customName: string;
  role: string;
}
