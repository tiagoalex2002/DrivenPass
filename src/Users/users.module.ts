import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { PrismaModule } from "../Prisma/prisma.module";
import { Global } from "@nestjs/common";

@Global() // opcional
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  }), PrismaModule], // PrismaModule se necessário
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {

}