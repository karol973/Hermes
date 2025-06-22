export default interface AddressDto{
    street: string;
    city: string;
    postalCode: string;
    country: string;
    stateOrRegion?: string;
    apartmentNumber?: string
}