import { IsString,IsNotEmpty, IsNumber, IsBoolean } from "class-validator";

export class CreateCardDTO {

    @IsNotEmpty()
    @IsNumber()
    cardNumber: number

    @IsNotEmpty()
    @IsString()
    expireDate: Date

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsBoolean()
    isVirtual: boolean

    @IsNotEmpty()
    @IsString()
    type: string

    @IsNotEmpty()
    @IsString()
    title: string

}

export class CreateCardDTOV2 {

    @IsNotEmpty()
    @IsNumber()
    cardNumber: number

    @IsNotEmpty()
    @IsString()
    expireDate: Date

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsBoolean()
    isVirtual: boolean

    @IsNotEmpty()
    @IsString()
    type: string

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsString()
    title: string


}