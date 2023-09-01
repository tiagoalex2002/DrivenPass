import { Module } from "@nestjs/common"
import { NotesControllers } from "./notes.controller";
import { NotesService } from "./notes.service";
import { NotesRepository } from "./notes.repository";
import { PrismaModule } from "../Prisma/prisma.module";
import { PrismaService } from "../Prisma/prisma.service";

@Module({
  imports: [PrismaModule], 
  controllers: [NotesControllers],
  providers: [NotesService, NotesRepository, PrismaService],
  exports: [NotesService]
})
export class NotesModule {}