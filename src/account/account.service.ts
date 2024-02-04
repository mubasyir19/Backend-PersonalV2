import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async register(createAccountDto: CreateAccountDto) {
    const checkUser = await this.findUser(createAccountDto.username);
    if (checkUser) {
      throw new ConflictException('username has been registered');
    }

    const newUser = await this.prisma.account.create({
      data: {
        ...createAccountDto,
        password: await hash(createAccountDto.password, 10),
      },
    });

    const { password, ...user } = newUser;

    return user;
  }

  async findUser(username: string) {
    try {
      const user = await this.prisma.account.findFirst({
        where: { username },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all account`;
  }

  async findOne(id: string) {
    const user = await this.prisma.account.findUnique({
      where: { id },
    });

    const { password, ...data } = user;
    return data;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
