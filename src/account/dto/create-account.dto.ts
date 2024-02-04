import { IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  fullname: string;

  @IsString()
  biography: string;

  @IsString()
  job: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
