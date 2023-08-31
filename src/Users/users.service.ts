import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { CreateUserDTO } from "../Dtos/users.dto";
import { ConflictException } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { userDTO } from "../Dtos/users.dto";
import { NotFoundException } from "@nestjs/common";
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly jwtService: JwtService,private userRepository: UserRepository) {}

    private EXPIRATION_TIME = "7 days";
    private ISSUER = "Driven";
    private AUDIENCE = "users";

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
        const { email, password } = user;

        const usuario = await this.userRepository.getUserByEmail(email);
        if (!usuario) throw new UnauthorizedException(`Email or password not valid.`);
    
        const valid = await bcrypt.compare(password, usuario.password);
        if (!valid) throw new UnauthorizedException(`Email or password not valid.`);
    
        return this.createToken(usuario);
    }

    async getUserById (id: number) {
        const user = await this.userRepository.getUserById(id)
        if (user) {
            return user;
        } else {
            throw new NotFoundException('NOT FOUND')
        }
    }

    private async createToken(user: userDTO) {
        const { id,email} = user;
    
        const token = this.jwtService.sign({ email}, {
          expiresIn: this.EXPIRATION_TIME,
          subject: String(id),
          issuer: this.ISSUER,
          audience: this.AUDIENCE
        });
    
        return { token }
      }

      checkToken(token: string) {
        const data = this.jwtService.verify(token, {
          audience: this.AUDIENCE,
          issuer: this.ISSUER
        });
    
        return data;
      }
}

