import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateAuthDto) {
    const checkUser = await this.accountService.findUser(dto.username);
    if (checkUser) {
      const checkPassword = await bcrypt.compare(
        dto.password,
        checkUser.password,
      );
      if (checkPassword) {
        const user = {
          id: checkUser.id,
          fullname: checkUser.fullname,
          biography: checkUser.biography,
          job: checkUser.job,
          username: checkUser.username,
        };

        return {
          access_token: await this.jwtService.signAsync(user, {
            secret: '2349032rn2309tj23t11=2niucqw1',
          }),
        };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
    // return 'Hello';
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
