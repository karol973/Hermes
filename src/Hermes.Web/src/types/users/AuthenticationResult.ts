import { Role } from "./Role";

 
 
export default interface AuthenticationResult {
   isSuccess: boolean;
   username: string;
   role: Role;
}