import BookCategory from "./BookCategory";

export default interface BookDto{
    id: number;
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
    antiqueShopName: string;
    orderItemsCount: number;
    bookImage: string;
}