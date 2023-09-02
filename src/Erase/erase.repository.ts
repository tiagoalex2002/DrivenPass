import { Injectable } from "@nestjs/common";
import { PrismaService } from "../Prisma/prisma.service";

@Injectable()
export class EraseRepository {
    constructor (private prisma : PrismaService) {}

    async deleteCardByUserId(userId: number) {
        return await this.prisma.cards.delete({where: {userId}})
    }

    async deleteNoteByUserId(userId: number) {
        return await this.prisma.safenotes.delete({where: {userId}})
    }

    async deleteCredentialByUserId(userId: number) {
        return await this.prisma.credentials.delete({where: {userId}})
    }

    async deleteUser(id: number) {
        return await this.prisma.users.delete({where : {id}})
    }
}