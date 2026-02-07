
export interface UploadResult {
  url: string;
  name: string;
  size: number;
  timestamp: number;
}

export interface ApiResult {
  url: string;
}

export interface ApiResponse {
  results: ApiResult[];
}

export enum UploadStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
