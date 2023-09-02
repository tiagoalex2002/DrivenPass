import { Controller, Get, Post, Delete, Body, UseGuards, HttpException, Param } from "@nestjs/common";
import { CreateCardDTO } from "../Dtos/cards.dto";
import { CardsService } from "./cards.service";
import { AuthGuard } from "../Guards/authGuard";
import { HttpStatus } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";
import { ApiBearerAuth,ApiOperation, ApiParam, ApiTags, ApiResponse } from "@nestjs/swagger";

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Cards')
@Controller('cards')
export class CardsController {

    constructor (private cardsService: CardsService) {}

    @Post()
    @ApiOperation({summary: 'It creates a new card for the user, regarding the business restritions related to this feature'})
    @ApiResponse({ status: HttpStatus.CREATED, description: "Card has been created" })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: "This Card's title  has already been used by the user!" })
    createCredential(@Body() body: CreateCardDTO, @User() user) {
        try{ 
            return this.cardsService.createCard(body, user);
        } catch (error) {
            if (error.message === 'CONFLICT') {
                throw new HttpException('Cannot create card', HttpStatus.CONFLICT)
            }
        }
        
    }

    @Get()
    @ApiOperation({summary: 'It retrieves cards, as long as they belong to the user '})
    @ApiResponse({ status: HttpStatus.OK, description: "Cards retrieved" })
    getCredentials(@User() user) {
        return this.cardsService.getCards(user)
    }

    @Get('/:id')
    @ApiOperation({summary: 'It retrieves a specific card, as long as it belongs to the user '})
    @ApiResponse({ status: HttpStatus.OK, description: "Card retrieved" })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Item does not belong to the user" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Item has not been found, probably it has not been created yet" })
    @ApiParam({ name: "id", description: "Card's id", example: "1" })
    getCardById(@Param('id') id: string, @User() user) {
        try {
            return this.cardsService.getCardById(Number(id), user);
        } catch(error) {
            if(error.message === 'NOT FOUND') {
                throw new HttpException('Card has not been found', HttpStatus.NOT_FOUND)
            } else if (error.message === 'FORBIDDEN') {
                throw new HttpException('This card does not belong to you', HttpStatus.FORBIDDEN)
            }
        }
    }

    @Delete('/:id')
    @ApiOperation({summary: 'It retrieves a specific card, as long as it belongs to the user '})
    @ApiResponse({ status: HttpStatus.OK, description: "Card retrieved" })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Item does not belong to the user" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Item has not been found, probably it has not been created yet" })
    @ApiParam({ name: "id", description: "Card's id", example: "1" })
    deleteCard(@Param('id') id: string, @User() user) {
        try {
            return this.cardsService.deleteCard(Number(id), user);
        } catch(error) {
            if(error.message === 'NOT FOUND') {
                throw new HttpException('Card has not been found', HttpStatus.NOT_FOUND)
            } else if (error.message === 'FORBIDDEN') {
                throw new HttpException('This card does not belong to you', HttpStatus.FORBIDDEN)
            }
        }
    }
}