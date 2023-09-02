import { Injectable } from "@nestjs/common";
import { NotesRepository } from "./notes.repository";
import { CreateNotesDTO } from "../Dtos/notes.dto";
import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";

@Injectable()
export class NotesService {
    constructor (private notesRepository: NotesRepository) {}

    async createNote(note: CreateNotesDTO, @User() user) {
        const exists = await this.notesRepository.getNoteByTitle(note.title)
        if (exists) {
            if (user.id !== exists.userId) {
                const body = {title: note.title, note: note.note, userId: user.id}
                return this.notesRepository.createNotes(body)
            } else {
                throw new ConflictException('CONFLICT')
            }
        } else {
            const body = {title: note.title, note: note.note, userId: user.id}
            return this.notesRepository.createNotes(body)
        }
    }

    async getNotes(@User() user) {
        return await this.notesRepository.getNotes(user.id)
    }

    async getNoteById(id: number, @User() user) {
        const exists= await this.notesRepository.getNoteById(id)
        if(exists) {
            if(exists.userId !== user.id) {
                throw new ForbiddenException('FORBIDDEN')
            } else {
                return exists;
            }
        } else {
            throw new NotFoundException('NOT FOUND')
        }
    }

    async deleteNote(id: number, @User() user) {
        const exists= await this.notesRepository.getNoteById(id)
        if(exists) {
            if(exists.userId !== user.id) {
                throw new ForbiddenException('FORBIDDEN')
            } else {
                return await this.notesRepository.deleteNote(id)
            }
        } else {
            throw new NotFoundException('NOT FOUND')
        }
    }
}