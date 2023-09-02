import { Module } from "@nestjs/common";
import { EraseController } from "./erase.controller";
import { EraseService } from "./erase.service";
import { EraseRepository } from "./erase.repository";
import { PrismaModule } from "../Prisma/prisma.module";
import { PrismaService } from "../Prisma/prisma.service";

@Module({
    imports: [PrismaModule], 
    controllers: [EraseController],
    providers: [EraseService, EraseRepository, PrismaService],
    exports: [EraseService]
  })

export class EraseModule {}