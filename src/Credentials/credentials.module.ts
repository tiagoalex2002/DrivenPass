import { Module } from "@nestjs/common"
import { CredentialsController } from "./credentials.controller";
import { CredentialsRepository } from "./credentials.repository";
import { CredentialsService } from "./credentials.service";
import { PrismaModule } from "../Prisma/prisma.module";
import { PrismaService } from "../Prisma/prisma.service";

@Module({
  imports: [PrismaModule], 
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository, PrismaService],
  exports: [CredentialsService]
})
export class CredentialsModule {}