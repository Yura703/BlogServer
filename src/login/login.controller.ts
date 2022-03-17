import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'issuance of a token' })
  @Post()
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
}
