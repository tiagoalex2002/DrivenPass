
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "../Users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.userService.checkToken((authorization ?? "").split(" ")[1]);
      const user = await this.userService.getUserById(parseInt(data.sub));
      request.user = user;
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;

  }

}