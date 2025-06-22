import BookCategory from "./BookCategory";

export default interface CreateBookCommand {
    name: string;
    publishYear: number;
    price: number;
    quantity: number;
    isAvailable: boolean;
    authorId: number;
    authorName: string;
    authorSurname: string;
    publisherId: number;
    publisherName: string;
    category: BookCategory;
    antiqueShopId: number;
    bookImage: string  

}