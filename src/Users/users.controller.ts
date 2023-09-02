import { Controller,Body,Param,Get,Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { HttpException, HttpStatus, HttpCode } from "@nestjs/common";
import { CreateUserDTO } from "../Dtos/users.dto";
import { ApiTags,ApiResponse,ApiOperation } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}

    @Post('sign-up')
    @ApiOperation({summary: 'Creates a new user on the platform'})
    @ApiResponse({ status: HttpStatus.CREATED, description: "User has been created" })
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() body: CreateUserDTO) {
      return  this.userService.createUser(body)
    }
  
    // login
    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Log in the user'})
    @ApiResponse({ status: HttpStatus.CREATED, description: "User has logged in successfully " })
    signIn(@Body() body: CreateUserDTO) {
      return this.userService.Login(body)
    }

}