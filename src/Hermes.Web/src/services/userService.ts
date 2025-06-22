import type ApiResponse from '../types/responses/ApiResponse';
import { toCreateResultAsync, toLoadResultAsync, toUpdateResultAsync } from '../helpers/storeHelper';
import { getAsync, patchAsync, postAsync } from '../helpers/requestHelper';
import UserDto from '../types/users/UserDto';
import UpdateUserCommand from '../types/users/UpdateUserCommand';
import { CommandResponse } from '../types/responses/CommandResponse';
import CreateUserCommand from '../types/users/CreateUserCommand';

export default class UserService {
    public async getUsersAsync(): Promise<UserDto[]> {
        const response: ApiResponse<UserDto[]> = await getAsync<UserDto[]>('user');
        return toLoadResultAsync<UserDto[]>(response);
    }

     public async createUserAsync(user: UserDto): Promise<UserDto> {
        const command: CreateUserCommand ={
            username : user.username,
            passwordHash: user.passwordHash,
            isActive: user.isActive,
        }
        const response: ApiResponse<CommandResponse> = await postAsync<CommandResponse>('user', command);
        return toCreateResultAsync(response, user)}


    public async updateUserAsync(id: number, user: UserDto): Promise<void> {
    const command: UpdateUserCommand = {
        id: id,
        username: user.username,
        isActive: user.isActive,
        role: user.role,
    };
    
    const response = await patchAsync<CommandResponse>(`user/${id}`, command);
      return toUpdateResultAsync(response);
    }
}