import { Controller,Body,Param,Get,Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { HttpException, HttpStatus, HttpCode } from "@nestjs/common";
import { CreateUserDTO } from "../Dtos/users.dto";

@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}

    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() body: CreateUserDTO) {
      return  this.userService.createUser(body)
    }
  
    // login
    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    signIn(@Body() body: CreateUserDTO) {
      return this.userService.Login(body)
    }

}