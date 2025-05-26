import { environment } from "../../environment";

export abstract class BaseApiService {
    protected readonly baseUrl = environment.apiBaseUrl;
  
    protected getApiUrl(endpoint: string): string {
      return `${this.baseUrl}/${endpoint}`;
    }
  }