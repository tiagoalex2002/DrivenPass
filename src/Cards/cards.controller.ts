import { Controller, Get, Post, Delete, Body, UseGuards, HttpException, Param } from "@nestjs/common";
import { CreateCardDTO } from "../Dtos/cards.dto";
import { CardsService } from "./cards.service";
import { AuthGuard } from "../Guards/authGuard";
import { HttpStatus } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {

    constructor (private cardsService: CardsService) {}

    @Post()
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
    getCredentials() {
        return this.cardsService.getCards()
    }

    @Get('/:id')
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
    deleteCard(@Param('id') id: string, @User() user) {
        try {
            return this.cardsService.deleteCard(Number(id), user);
        } catch(error) {
            if(error.message === 'NOT FOUND') {
                throw new HttpException('Credential has not been found', HttpStatus.NOT_FOUND)
            } else if (error.message === 'FORBIDDEN') {
                throw new HttpException('This credential does not belong to you', HttpStatus.FORBIDDEN)
            }
        }
    }
}