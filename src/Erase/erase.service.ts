import { Injectable } from "@nestjs/common";
import { EraseRepository } from "./erase.repository";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";
import { UserRepository } from "../Users/users.repository";
import { EraseDTO } from "../Dtos/erase.dto";
import bcrypt from 'bcrypt'

@Injectable()
export class EraseService {
    constructor (private eraseRepository: EraseRepository, private userRepository: UserRepository) {}

    async eraseData(password: EraseDTO, @User() user) {
        const usuario = await this.userRepository.getUserById(user.id)
        const valid = await bcrypt.compare(password, usuario.password);
        if (!valid) {
            throw new UnauthorizedException(`Wrong password, please insert the right one`);
        } else {
            await this.eraseRepository.deleteCardByUserId(user.id)
            await this.eraseRepository.deleteCredentialByUserId(user.id)
            await this.eraseRepository.deleteNoteByUserId(user.id)
            return await this.eraseRepository.deleteUser(user.id)
        }
    }
}