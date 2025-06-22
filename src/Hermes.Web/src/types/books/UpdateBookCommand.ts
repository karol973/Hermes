import BookCategory from "./BookCategory";

export default interface UpdateBookCommand {
    id: number;
    name: string;
    publishYear: number;
    price: number;
    quantity: number;
    isAvailable: boolean;
    bookImage?: string;
    authorId: number;
    authorName: string;
    authorSurname: string;
    publisherId: number;
    publisherName: string;
    category: BookCategory; 
    antiqueShopId: number;
}