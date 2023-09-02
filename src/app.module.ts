import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './Cards/cards.module';
import { NotesModule } from './Safe Notes/notes.module';
import { UsersModule } from './Users/users.module';
import { CredentialsModule } from './Credentials/credentials.module';
import { PrismaModule } from './Prisma/prisma.module';

@Module({
  imports: [PrismaModule, CardsModule, NotesModule, UsersModule, CredentialsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
