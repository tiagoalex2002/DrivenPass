import { Injectable } from "@nestjs/common";
import { CreateCredentialsDTOV2 } from "../Dtos/credentials.dto";
import { PrismaService } from "../Prisma/prisma.service";

@Injectable()
export class CredentialsRepository {
    constructor(private prisma : PrismaService) {}

    async createCredential ( credential: CreateCredentialsDTOV2) {
        return await this.prisma.credentials.create({data: credential})
    }

    async getCredentials () {
        return await this.prisma.credentials.findMany()
    }

    async getCredentialById(id: number) {
        return await this.prisma.credentials.findUnique({where: {id}})
    }

    async getCredentialByTitle(title: string) {
        return await this.prisma.credentials.findFirst({where: {title}})
    }

    async deleteCredential(id:number) {
        return await this.prisma.credentials.delete({where: {id}})
    }
}