import { IsString, IsStrongPassword, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password : string



}