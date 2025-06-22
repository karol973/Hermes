import type ApiResponse from '../types/responses/ApiResponse';
import { isCommandResponse } from '../types/responses/CommandResponse';
import { isBadRequestResponse } from '../types/responses/BadRequestResponse';
import { getBadRequestMessage } from '../helpers/errorHelper';

async function processResponseAsync<T>(response: Response): Promise<ApiResponse<T>> {
   if (response.status === 400) {
      const data: any = await response.json();

      return {
         isSuccess: false,
         message: isBadRequestResponse(data) ? getBadRequestMessage(data.errors) : response.statusText,
         data: null
      };
   }

   if (!response.ok) {
      return {
         isSuccess: false,
         message: await response.text() ?? response.statusText,
         data: null
      };
   }
   
   const data: any = await response.json();

   if (response.ok && isCommandResponse(data)) {
      return {
         isSuccess: data.isSuccess,
         message: data.message,
         data: null
      };
   }

   return {
      isSuccess: true,
      message: '',
      data: data as T
   };
}

export { processResponseAsync };