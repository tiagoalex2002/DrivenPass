import { IsString, IsStrongPassword, IsNotEmpty, IsEmail, IsNumber } from "class-validator";

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

export class userDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password : string

    @IsNotEmpty()
    @IsNumber()
    id: number
}