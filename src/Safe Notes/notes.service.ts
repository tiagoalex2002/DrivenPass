import { Injectable } from "@nestjs/common";
import { NotesRepository } from "./notes.repository";
import { CreateNotesDTO } from "../Dtos/notes.dto";
import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";

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
            throw new NotFoundException('NOT FOUND')
        }
    }
}