import { Controller, Get, Post, Delete, Body, UseGuards, HttpException, Param } from "@nestjs/common";
import { CreateCredentialsDTO } from "../Dtos/credentials.dto";
import { CredentialsService } from "./credentials.service";
import { AuthGuard } from "../Guards/authGuard";
import { HttpStatus } from "@nestjs/common";
import { User } from "../Decorators/user.decorators";
import { ApiOperation , ApiTags, ApiParam, ApiResponse, ApiBearerAuth} from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Credentials')
@Controller('credentials')
export class CredentialsController {

    constructor (private credentialsService: CredentialsService) {}

    @Post()
    @ApiOperation({summary: 'It creates a new credential for the user, regarding the business restritions related to this feature'})
    @ApiResponse({ status: HttpStatus.CREATED, description: "Credential has been created" })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: "This Credentials's title is has already been used by you!" })
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
    @ApiOperation({summary: 'It retrieves all users credentials '})
    @ApiResponse({ status: HttpStatus.OK, description: "Credentials retrieved" })
    getCredentials(@User() user) {
        return this.credentialsService.getCredentials(user)
    }

    @Get('/:id')
    @ApiOperation({summary: 'It retrieves a credential, as long as it belongs to the user '})
    @ApiResponse({ status: HttpStatus.OK, description: "Credentials retrieved" })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Item does not belong to the user" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Item has not been found, probably it has not been created yet" })
    @ApiParam({ name: "id", description: "Credential's id", example: "1" })
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
    @ApiOperation({summary: 'It deletes a specific credential, as long as it belongs to the user '})
    @ApiResponse({ status: HttpStatus.OK, description: "Credential has been deleted" })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Item does not belong to the user" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Item has not been found, probably it has not been created yet" })
    @ApiParam({ name: "id", description: "Credential's id", example: "1" })
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