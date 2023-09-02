import { Injectable } from "@nestjs/common";
import { CreateCardDTOV2 } from "../Dtos/cards.dto";
import { PrismaService } from "../Prisma/prisma.service";

@Injectable()
export class CardsRepository {
    constructor (private prisma: PrismaService) {}

    async createCard(card: CreateCardDTOV2) {
        return await this.prisma.cards.create({data: card})
    }

    async getCards() {
        return await this.prisma.cards.findMany()
    }

    async getCardById(id: number) {
        return await this.prisma.cards.findFirst({where: {id}})
    }

    async getCardByTitle (title: string) {
        return await this.prisma.cards.findFirst({where: {title}})
    }

    async deleteNote(id: number) {
        return await this.prisma.cards.delete({where: {id}})
    }
}