import { Controller, Body, Delete, UseGuards } from "@nestjs/common";
import { EraseDTO } from "../Dtos/erase.dto";
import { EraseService } from "./erase.service";
import { HttpStatus, HttpException } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";
import { AuthGuard } from "../Guards/authGuard";
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Erase')
@Controller('erase')
export class EraseController {
    constructor (private eraseService: EraseService) {}

    @Delete()
    @ApiOperation({summary: "A route which deletes user's account and all its information"})
    @ApiResponse({ status: HttpStatus.OK, description: "User's account has been erased" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "User has submitted the wrong password" })
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