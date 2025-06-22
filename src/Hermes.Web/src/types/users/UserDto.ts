import AddressDto from "./AddressDto";
import { Role } from "./Role";

export default interface UserDto{
    id: number;
    username: string;
    role: Role;
    isActive: boolean;
    passwordHash: string;
    addressId: number;
    address?: AddressDto
}