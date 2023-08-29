import { IsString, IsUrl, IsNotEmpty, IsEmail, IsNumber } from "class-validator";

export class CreateCredentialsDTO {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    username: string

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class CreateCredentialsDTOV2 {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    username: string

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsNumber()
    @IsNotEmpty()
    userId: number
}