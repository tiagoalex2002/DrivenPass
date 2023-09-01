import { Injectable } from "@nestjs/common";
import { PrismaService } from "../Prisma/prisma.service";
import { CreateNotesDTOV2 } from "../Dtos/notes.dto";

@Injectable()
export class NotesRepository {
    constructor (private prisma : PrismaService) {}

    async createNotes(note: CreateNotesDTOV2) {
        return await this.prisma.safenotes.create({data: {note}})
    }

    async getNotes() {
        return await this.prisma.safenotes.findMany()
    }

    async getNoteById(id: number) {
        return await this.prisma.safenotes.findFirst({where: {id}})
    }

    async getNoteByTitle (title: string) {
        return await this.prisma.safenotes.finfFirst({where: {title}})
    }

    async deleteNote(id: number) {
        return await this.prisma.safenotes.delete({where: {id}})
    }
}