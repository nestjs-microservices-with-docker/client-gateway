import { Controller, Get, Post, Inject, Body, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from '../config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces';
import { AuthGuard } from './guards/auth';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      
      const user = await firstValueFrom(this.client.send({ cmd: 'auth.register.user' }, registerUserDto));
      return user
    } catch (error) {
      throw new RpcException(error)
    }
  }

  

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await firstValueFrom(this.client.send({ cmd: 'auth.login.user' }, loginUserDto));
      return user;

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@User() user: CurrentUser, @Token() token: string) {
    // return this.client.send({ cmd: 'auth.verify.token' }, {});
    return { user, token };
  }
}
