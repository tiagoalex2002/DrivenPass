import { Module } from "@nestjs/common"
import { CardsController } from "./cards.controller";
import { CardsRepository } from "./cards.repository";
import { CardsService } from "./cards.service";
import { PrismaModule } from "../Prisma/prisma.module";
import { PrismaService } from "../Prisma/prisma.service";

@Module({
  imports: [PrismaModule], 
  controllers: [CardsController],
  providers: [CardsService, CardsRepository, PrismaService],
  exports: [CardsService]
})
export class CardsModule {}