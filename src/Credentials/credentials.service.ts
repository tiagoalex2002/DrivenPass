import { Injectable} from "@nestjs/common";
import { CreateCredentialsDTO, CreateCredentialsDTOV2 } from "../Dtos/credentials.dto";
import { CredentialsRepository } from "./credentials.repository";
import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common";
import bcrypt from 'bcrypt'

@Injectable()
export class CredentialsService {
    constructor(private credentialsRepository: CredentialsRepository ) {}

    async createCredential(credential: CreateCredentialsDTO) {
        const exists = this.credentialsRepository.getCredentialByTitle(credential.title)
    }
}
