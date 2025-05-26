export interface ValidationErrorDetail {
  error: string;
  detail: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  errors: ValidationErrorDetail[];
}

export interface ApiResponseWithData<T> extends ApiResponse {
  data: T;
}
