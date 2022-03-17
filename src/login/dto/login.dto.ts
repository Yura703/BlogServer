import { IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString({ message: 'Should be a string' })
  public login: string;

  @IsOptional()
  @IsString({ message: 'Should be a string' })
  public password: string;
}
