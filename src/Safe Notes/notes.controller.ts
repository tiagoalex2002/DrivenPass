import { Controller, Get, Post, Delete, Body, UseGuards, HttpException, Param } from "@nestjs/common";
import { CreateNotesDTO } from "../Dtos/notes.dto";
import { NotesService } from "./notes.service";
import { AuthGuard } from "../Guards/authGuard";
import { HttpStatus } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesControllers {
    constructor (private notesService: NotesService) {}

    @Post()
    createNote(@Body() body: CreateNotesDTO, @User() user) {
        try {
            return this.notesService.createNote(body, user)
        } catch(error) {
            if (error.message === 'NOT FOUND') {
                throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND)
            } else if( error.message === 'FORBIDDEN') {
                throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
            }
        }
    }

    @Get()
    getNotes() {
        return this.notesService.getNotes()
    }

    @Get('/:id')
    async getNoteById(@Param('id') id: string, @User() user) {
        try {
            return await this.notesService.getNoteById(Number(id), user)
        } catch(error) {
            if (error.message === 'NOT FOUND') {
                throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND)
            } else if (error.message === 'FORBIDDEN') {
                throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
            }
        }
    }

    @Delete('/:id')
    async deleteNote(@Param('id') id: string, @User() user) {
        try {
            return await this.notesService.deleteNote(Number(id), user)
        } catch(error) {
            if (error.message === 'NOT FOUND') {
                throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND)
            } else if (error.message === 'FORBIDDEN') {
                throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
            }
        }
    }
}