import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateNotesDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    note: string
}

export class CreateNotesDTOV2 {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    note: string

    @IsNumber()
    @IsNotEmpty()
    userId: number
}