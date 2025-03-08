import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from '../config';
import { LoginUserDto, RegisterUserDto } from './dto';

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
  login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send({ cmd: 'auth.login.user' }, loginUserDto);
  }

  @Get('verify')
  verify() {
    return this.client.send({ cmd: 'auth.verify.token' }, {});
  }
}
