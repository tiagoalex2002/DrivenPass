import { Injectable} from "@nestjs/common";
import { CreateCredentialsDTO, CreateCredentialsDTOV2 } from "../Dtos/credentials.dto";
import { CredentialsRepository } from "./credentials.repository";
import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common";
import bcrypt from 'bcrypt'
import { User } from "../Decorators/user.decorators";

@Injectable()
export class CredentialsService {
    constructor(private credentialsRepository: CredentialsRepository ) {}

    async createCredential(credential: CreateCredentialsDTO, @User() user) {
        const exists = await this.credentialsRepository.getCredentialByTitle(credential.title)
        if (exists) {
            if(user.id === exists.userId) {
                throw new ConflictException('CONFLICT')
            } else {
                const Cryptr = require('cryptr');
            const cryptr = new Cryptr(process.env.JWT_SECRET);
            const encryptedString = cryptr.encrypt(credential.password);
            const body = {title: credential.title, userId: user.id, username: credential.username, password: encryptedString, url: credential.url  }
                return await this.credentialsRepository.createCredential(body)
            }
        } else {
            const Cryptr = require('cryptr');
            const cryptr = new Cryptr(process.env.JWT_SECRET);
            const encryptedString = cryptr.encrypt(credential.password);
            const body = {title: credential.title, userId: user.id, username: credential.username, password: encryptedString, url: credential.url  }
            return await this.credentialsRepository.createCredential(body)
        }
    }

    async getCredentials() {
        const credentials = []
        const info = await this.credentialsRepository.getCredentials()
        if( info.length === 0) {
            return credentials;
        } else {
            for ( let i=0; i < info.length; i++) {
                let credential = info[i];
                const Cryptr = require('cryptr');
                const cryptr = new Cryptr('myTotallySecretKey');
                const decryptedString = cryptr.decrypt(info[i].password)
                const body = {title: credential.title, userId: credential.userId, username: credential.username, password: decryptedString, url: credential.url  }
                credentials.push(body)
            }
            return credentials;
        }
    }

    async getCredentialById(id: number, @User() user ) {
        const credential = await this.credentialsRepository.getCredentialById(id)
        if(!credential) {
            throw new NotFoundException('NOT FOUND')
        } else {
            if (credential.userId !== user.id) {
                throw new ForbiddenException('FORBIDDEN')
            } else {
                return credential;
            }
        }
    }

    async deleteCredential(id: number, @User() user ) {
        const credential = await this.credentialsRepository.getCredentialById(id)
        if(!credential) {
            throw new NotFoundException('NOT FOUND')
        } else {
            if (credential.userId !== user.id) {
                throw new ForbiddenException('FORBIDDEN')
            } else {
                return this.credentialsRepository.deleteCredential(id);
            }
        }
    }
}
