export default interface CreateUserCommand {
    username: string;
    passwordHash: string;
    isActive: boolean;
}