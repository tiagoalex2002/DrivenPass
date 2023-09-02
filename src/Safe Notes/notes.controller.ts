import { Controller, Get, Post, Delete, Body, UseGuards, HttpException, Param } from "@nestjs/common";
import { CreateNotesDTO } from "../Dtos/notes.dto";
import { NotesService } from "./notes.service";
import { AuthGuard } from "../Guards/authGuard";
import { HttpStatus } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";
import { ApiTags,ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Safe Notes')
@Controller('notes')
export class NotesControllers {
    constructor (private notesService: NotesService) {}

    @Post()
    @ApiOperation({summary: 'It creates a new safe note for the user, regarding the business restritions related to this feature'})
    @ApiResponse({ status: HttpStatus.CREATED, description: "Safe Note has been created" })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: "This Safe Note's title is has already been used by you!" })
    createNote(@Body() body: CreateNotesDTO, @User() user) {
        try {
            return this.notesService.createNote(body, user)
        } catch(error) {
            if( error.message === 'CONFLICT') {
                throw new HttpException('CONFLICT', HttpStatus.FORBIDDEN)
            }
        }
    }

    @Get()
    @ApiOperation({summary: 'It retrieves all users safe notes '})
    @ApiResponse({ status: HttpStatus.OK, description: "Safe Notes retrieved" })
    getNotes(@User() user) {
        return this.notesService.getNotes(user)
    }

    @Get('/:id')
    @ApiOperation({summary: 'It retrieves a specific safe note, as long as it belongs to the user '})
    @ApiResponse({ status: HttpStatus.OK, description: "Safe Note retrieved" })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Item does not belong to the user" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Item has not been found, probably it has not been created yet" })
    @ApiParam({ name: "id", description: "Safe Note's id", example: "1" })
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
    @ApiOperation({summary: 'It deletes a specific safe note '})
    @ApiResponse({ status: HttpStatus.OK, description: "Safe Note has been deleted from database" })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Item does not belong to the user" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Item has not been found, probably it has not been created yet" })
    @ApiParam({ name: "id", description: "Safe Note's id", example: "1" })
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