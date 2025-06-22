import type { CommandResponse } from '../types/responses/CommandResponse';
import type ApiResponse from '../types/responses/ApiResponse';

async function toLoadResultAsync<T>(response: ApiResponse<T>): Promise<T> {
   return response.isSuccess
      ? Promise.resolve<T>(response.data as T)
      : Promise.reject<T>(response.message);
}

async function toCreateResultAsync<T>(response: ApiResponse<CommandResponse>, data: T): Promise<T> {
   return response.isSuccess
      ? Promise.resolve<T>(data)
      : Promise.reject<T>(response.message);
}

async function toUpdateResultAsync(response: ApiResponse<CommandResponse>): Promise<void> {
   return response.isSuccess
      ? Promise.resolve()
      : Promise.reject(response.message);
}

async function toDeleteResultAsync(response: ApiResponse<CommandResponse>): Promise<void> {
   return response.isSuccess
      ? Promise.resolve()
      : Promise.reject(response.message);
}

export { toLoadResultAsync, toCreateResultAsync, toUpdateResultAsync, toDeleteResultAsync };