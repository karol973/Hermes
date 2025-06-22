import { Role } from "./Role";

export default interface UpdateUserCommand {
    id: number;
    username: string;
    role: Role;
    isActive: boolean;
}