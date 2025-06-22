import BookDto from "../books/BookDto";

export default interface AuthorDto {
    id: number;
    name: string;
    surname: string;
    book: BookDto
}