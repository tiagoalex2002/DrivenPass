import { Controller, Body, Delete, UseGuards } from "@nestjs/common";
import { EraseDTO } from "../Dtos/erase.dto";
import { EraseService } from "./erase.service";
import { HttpStatus, HttpException } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";
import { AuthGuard } from "../Guards/authGuard";

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
    constructor (private eraseService: EraseService) {}

    @Delete()
    async eraseData(@Body() body:EraseDTO, @User() user) {
        try {
            return await this.eraseService.eraseData(body,user)
        } catch(error) {
            if(error.message === 'UNAUTHORIZED') {
                throw new HttpException('Wrong password, try again!', HttpStatus.UNAUTHORIZED)
            }
        }
    }
}