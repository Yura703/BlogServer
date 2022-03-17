import * as bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const { JWT_SECRET_KEY, SALT } = process.env;
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = await this.getHash(createUserDto.password);
    const newUser = { ...createUserDto, password };
    const userRespons = await this.userRepository.save(newUser);
    delete userRespons.password;
    return userRespons;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const editUser = await this.userRepository.findOne(id);
    if (!editUser) {
      return false;
    }
    const password = await this.getHash(updateUserDto.password);
    const _user = { ...editUser, ...updateUserDto, password };
    await this.userRepository.save(_user);

    return _user;
  }

  async remove(id: string) {
    const delUser = await this.userRepository.findOne(id);
    if (!delUser) {
      return false;
    }
    return this.userRepository.remove(delUser);
  }

  findByLogin(loginUser: string) {
    try {
      return this.userRepository.findOneOrFail({
        where: { login: loginUser },
        select: ['id', 'name', 'login', 'password'],
      });
    } catch (error) {
      return false;
    }
  }

  async getNewJWT(user: User) {
    return await jsonwebtoken.sign(
      { userId: user.id, login: user.login },
      JWT_SECRET_KEY || 'secret-key',
      { expiresIn: '6h' },
    );
  }

  async getHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(+SALT);

    const hashPass = await bcrypt.hash(password, salt);
    return hashPass;
  }

  async checkHash(password: string, hash: string): Promise<boolean> {
    const normPass = await bcrypt.compare(password, hash);
    return normPass;
  }
}
