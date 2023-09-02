import { IsNotEmpty, IsString} from "class-validator";

export class EraseDTO {
    @IsNotEmpty()
    @IsString()
    password: string
}