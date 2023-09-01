import { Controller, Get, Post, Delete, Body, UseGuards, HttpException, Param } from "@nestjs/common";
import { CreateCredentialsDTO } from "../Dtos/credentials.dto";
import { CredentialsService } from "./credentials.service";
import { AuthGuard } from "../Guards/authGuard";
import { HttpStatus } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {

    constructor (private credentialsService: CredentialsService) {}

    @Post()
    createCredential(@Body() body: CreateCredentialsDTO, @User() user) {
        try{ 
            return this.credentialsService.createCredential(body, user);
        } catch (error) {
            if (error.message === 'CONFLICT') {
                throw new HttpException('Cannot create credential', HttpStatus.CONFLICT)
            }
        }
        
    }

    @Get()
    getCredentials() {
        return this.credentialsService.getCredentials()
    }

    @Get('/:id')
    getCredentialById(@Param('id') id: string, @User() user) {
        try {
            return this.credentialsService.getCredentialById(Number(id), user);
        } catch(error) {
            if(error.message === 'NOT FOUND') {
                throw new HttpException('Credential has not been found', HttpStatus.NOT_FOUND)
            } else if (error.message === 'FORBIDDEN') {
                throw new HttpException('This credential does not belong to you', HttpStatus.FORBIDDEN)
            }
        }
    }

    @Delete('/:id')
    deleteCredential(@Param('id') id: string, @User() user) {
        try {
            return this.credentialsService.deleteCredential(Number(id), user);
        } catch(error) {
            if(error.message === 'NOT FOUND') {
                throw new HttpException('Credential has not been found', HttpStatus.NOT_FOUND)
            } else if (error.message === 'FORBIDDEN') {
                throw new HttpException('This credential does not belong to you', HttpStatus.FORBIDDEN)
            }
        }
    }
}