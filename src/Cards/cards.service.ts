import { Injectable } from "@nestjs/common";
import { CardsRepository } from "./cards.repository";
import { CreateCardDTO } from "../Dtos/cards.dto";
import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";

@Injectable()
export class CardsService {
    constructor (private cardsRepository: CardsRepository) {}

    async createCard(card: CreateCardDTO, @User() user) {
        const exists = await this.cardsRepository.getCardByTitle(card.title)
        if (exists) {
            if (user.id !== exists.userId) {
                const Cryptr = require('cryptr');
                const cryptr = new Cryptr(process.env.JWT_SECRET);
                const encryptedString = cryptr.encrypt(card.password);
                const body = {title: card.title, cardNumber: card.cardNumber, userId: user.id, 
                    password: encryptedString, isVirtual: card.isVirtual, expireDate: card.expireDate,
                     type: card.type }
                return this.cardsRepository.createCard(body)
            } else {
                throw new ConflictException('CONFLICT')
            }
        } else {
            const Cryptr = require('cryptr');
                const cryptr = new Cryptr(process.env.JWT_SECRET);
                const encryptedString = cryptr.encrypt(card.password);
                const body = {title: card.title, cardNumber: card.cardNumber, userId: user.id, 
                    password: encryptedString, isVirtual: card.isVirtual, expireDate: card.expireDate,
                     type: card.type }
                return this.cardsRepository.createCard(body)
        }
    }

    async getCards() {
        return await this.cardsRepository.getCards()
    }

    async getCardById(id: number, @User() user) {
        const exists= await this.cardsRepository.getCardById(id)
        if(exists) {
            if(exists.userId !== user.id) {
                throw new ForbiddenException('FORBIDDEN')
            } else {
                return exists;
            }
        } else {
            throw new NotFoundException('NOT FOUND')
        }
    }

    async deleteCard(id: number, @User() user) {
        const exists= await this.cardsRepository.getCardById(id)
        if(exists) {
            if(exists.userId !== user.id) {
                throw new ForbiddenException('FORBIDDEN')
            } else {
                return await this.cardsRepository.deleteNote(id)
            }
        } else {
            throw new NotFoundException('NOT FOUND')
        }
    }
}