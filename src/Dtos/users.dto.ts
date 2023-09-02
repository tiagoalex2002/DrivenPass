import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword, IsNotEmpty, IsEmail, IsNumber } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: "tiagoalex@gmail.com", description: "username for user" })
    email : string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({ example: "OpaEai!2023", description: "password for user" })
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