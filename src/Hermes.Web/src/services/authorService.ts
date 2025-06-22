import type ApiResponse from '../types/responses/ApiResponse';
import { toLoadResultAsync } from '../helpers/storeHelper';
import { getAsync } from '../helpers/requestHelper';
import AuthorDto from '../types/authors/authorDto';

export default class AuthorService {
    public async getAuthorsAsync(): Promise<AuthorDto[]> {
        const response: ApiResponse<AuthorDto[]> = await getAsync<AuthorDto[]>('authors');
        return toLoadResultAsync<AuthorDto[]>(response);
    }
}