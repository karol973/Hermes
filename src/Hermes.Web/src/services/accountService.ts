import { getAsync, patchAsync, postAsync } from '../helpers/requestHelper';
import { toUpdateResultAsync } from '../helpers/storeHelper';
import type ApiResponse from '../types/responses/ApiResponse';
import { CommandResponse } from '../types/responses/CommandResponse';
import AuthenticateQuery from '../types/users/AuthenticateQuery';
import AuthenticationResult from '../types/users/AuthenticationResult';
import ChangePasswordCommand from '../types/users/ChangePasswordCommand';
import UserDto from '../types/users/UserDto';
 

export default class AccountService {

   public signInAsync(username: string, password: string): Promise<ApiResponse<AuthenticationResult>> {
      const request: AuthenticateQuery = {
         username: username,
         password: password
      };

      return postAsync<AuthenticationResult>('account/signin', request);
   }

   public signOutAsync(): Promise<ApiResponse> {
      return postAsync('account/signout', null);
   }

   public checkAuthorizationAsync(): Promise<ApiResponse> {
      return getAsync('account/authorization');
   }

   public async changePasswordAsync(id: number, newPassword: string): Promise<void> {
      const command: ChangePasswordCommand = {
          id: id,
          passwordHash: newPassword,
       };
      
    const response = await patchAsync<CommandResponse>(`account/${id}`, command);
 
    return toUpdateResultAsync(response);
      }
   }