import type ApiResponse from '../types/responses/ApiResponse';
import { toCreateResultAsync, toLoadResultAsync, toUpdateResultAsync } from '../helpers/storeHelper';
import { getBaseUrl } from '../configuration/apiConfig';
import { getAsync, patchAsync, postAsync } from '../helpers/requestHelper';
import type { CommandResponse } from '../types/responses/CommandResponse';
import BookDto from '../types/books/BookDto';
import UpdateBookCommand from '../types/books/UpdateBookCommand';
import CreateBookCommand from '../types/books/CreateBookCommand';
import BookCategory from '../types/books/BookCategory';
import DictionaryItem from '../types/common/DictionaryItem';
import GetBooksByCategoryQuery from '../types/books/GetBooksByCategoryQuery';
import GetBookByAuthorQuery from '../types/books/GetBookByAuthorQuery';
import GetBookByIdQuery from '../types/books/GetBookByIdQuery';


export default class BookService {
    public async getBooksAsync(): Promise<BookDto[]> {
        const response: ApiResponse<BookDto[]> = await getAsync<BookDto[]>('books');
        return toLoadResultAsync<BookDto[]>(response);
    }
    public async getBookCategoryAsync(category: BookCategory): Promise<DictionaryItem[]> {
        const response: ApiResponse<DictionaryItem[]> = await getAsync<DictionaryItem[]>('books/category');
        return toLoadResultAsync<DictionaryItem[]>(response);
     }
     
     public async getCategoriesForView(): Promise<{label: string, value: number}[]> {
        const dictionaryItems = await this.getBookCategoryAsync(BookCategory.None);    
        
        return dictionaryItems.map(item => ({
            value: item.key,       
            label: item.value,      
        }));
    }
    public async getBookSByCategoryAsync(category: BookCategory): Promise<BookDto[]> {
        const query: GetBooksByCategoryQuery = {
           category: category
        };
        
        const response: ApiResponse<BookDto[]> = await getAsync<BookDto[]>(`books/booksbycategory`, query);
        return toLoadResultAsync<BookDto[]>(response);
     }
  
     public async getBooksByAuthorAsync(authorId: number): Promise<BookDto[]> {
        const query: GetBookByAuthorQuery = {
            authorId: authorId
        }
        const response = await getAsync<BookDto[]>(`books/booksbyauthor`,query);
        return toLoadResultAsync<BookDto[]>(response);
    }
    
    public async getBookByIdAsync(id: number): Promise<BookDto> {
        const response = await getAsync<BookDto>(`books/${id}/bookdetails`);
        return toLoadResultAsync<BookDto>(response);
    }

    public async updateBookAsync(id: number, book: BookDto): Promise<void> {
        const command: UpdateBookCommand = {
            id: id,
            name: book.name,
            isAvailable: book.isAvailable,
            category: book.category,
            price: book.price,
            publishYear: book.publishYear,
            publisherName: book.publisherName,
            quantity: book.quantity,
            bookImage: book.bookImage,
            antiqueShopId : book.antiqueShopId,
            publisherId: book.publisherId,
            authorId: book.authorId,
            authorName: book.authorName,
            authorSurname: book.authorSurname,

        };
        const response = await patchAsync<CommandResponse>(`books/${id}`, command)
              return toUpdateResultAsync(response);

    }

    public async createBookAsync(book: BookDto): Promise<BookDto> {
        const command: CreateBookCommand ={
            antiqueShopId : book.antiqueShopId,
            authorId: book.authorId,
            category: book.category,
            isAvailable: book.isAvailable,
            name: book.name,
            authorName: book.authorName,
            authorSurname: book.authorSurname,
            publisherId: book.publisherId,
            publishYear: book.publishYear,
            publisherName: book.publisherName,
            price: book.price,
            quantity: book.quantity,
            bookImage: book.bookImage  

        }
        const response: ApiResponse<CommandResponse> = await postAsync<CommandResponse>('books', command);
        return toCreateResultAsync(response, book)
    }
}