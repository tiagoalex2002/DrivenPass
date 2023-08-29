import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { CreateUserDTO } from "../Dtos/users.dto";
import { ConflictException } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser ( user: CreateUserDTO) {
        const exists = await this.userRepository.getUserByEmail(user.email)
        if (exists) {
            throw new ConflictException('CONFLICT')
        } else {
            const bcrypt = require('bcrypt')
            const saltRounds = 10;
            let senha;
            bcrypt.hash(user.password, saltRounds, function(err, hash) {
                senha = hash
              });
            const usuario = {email: user.email, password: senha}
            return await this.userRepository.createUser(usuario)
              
        }
    }

    async Login (user: CreateUserDTO) {
        const exists = await this.userRepository.getUserByEmail(user.email)
        if (exists) {
            let correctPsswd
            bcrypt.compare(user.password, exists.password, function(err, result) {
                correctPsswd= result
              });
            if(correctPsswd){
        
            } else {
                throw new UnauthorizedException('WRONG PASSWORD')
            }
            
        } else {
            throw new UnauthorizedException('UNREGISTERED USER')
        }
    }
}

