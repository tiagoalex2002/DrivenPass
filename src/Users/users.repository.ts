import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../Dtos/users.dto";
import { PrismaService } from "../Prisma/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async createUser (user : CreateUserDTO) {
        return await this.prisma.users.create({data : user})
    }

    async getUserByEmail (email: string) {
        return await this.prisma.users.findFirst({where : {email}})
    }
}