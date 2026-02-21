export class ApiResponse<T> {
  readonly code: number;
  readonly message: string;
  readonly data: T;

  private constructor(code: number, message: string, data: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<T>(data: T, message = 'OK'): ApiResponse<T> {
    return new ApiResponse(0, message, data);
  }

  static error(message: string, code = -1): ApiResponse<null> {
    return new ApiResponse(code, message, null);
  }
   asJsonString():string {
    return JSON.stringify(this);
  }
}