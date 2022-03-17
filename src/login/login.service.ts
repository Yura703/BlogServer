import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import bcrypt from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UserService,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}
  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({ select: ['id', 'password'], where: { login: loginDto.login } });
    if (!user) {
      throw new ForbiddenException('login is bad');
    }

    const passwordHash = user.password;
    const comparePasswords = this.usersService.checkHash(
      loginDto.password,
      passwordHash,
    );

    if (!comparePasswords) {
      throw new ForbiddenException('login is bad');
    }
    const token = this.getNewJWT(user);

    return { token: token };
  }

  //   const { JWT_SECRET_KEY, SALT } = CONFIG;
  // const routesName = ["users", "boards", "tasks"];

  getNewJWT(user: User) {
    return jsonwebtoken.sign(
      { userId: user.id, login: user.login },
      this.JWT_SECRET_KEY || 'secret-key',
      { expiresIn: '6h' },
    );
  }
}
