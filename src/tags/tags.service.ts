import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    try {
      const tags = await this.prisma.tags.create({ data: createTagDto });

      return {
        message: 'success add tags',
        data: tags,
      };
    } catch (error) {
      throw new ConflictException('failed add data');
    }
  }

  async findAll() {
    try {
      const tags = await this.prisma.tags.findMany();

      return {
        message: 'success get all tags',
        data: tags,
      };
    } catch (error) {
      throw new ConflictException('failed get data');
    }
  }

  async findOne(id: string) {
    try {
      const tags = await this.prisma.tags.findFirst({
        where: { id },
      });

      return {
        message: 'success get tag',
        data: tags,
      };
    } catch (error) {
      throw new ConflictException('failed get data');
    }
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    try {
      const tags = await this.prisma.tags.update({
        where: { id },
        data: updateTagDto,
      });

      return {
        message: 'success update tags',
        data: tags,
      };
    } catch (error) {
      throw new ConflictException('failed update data');
    }
  }

  async remove(id: string) {
    try {
      const tags = await this.prisma.tags.delete({
        where: { id },
      });

      return {
        message: `skill ${tags.name} has been deleted`,
      };
    } catch (error) {
      throw new ConflictException('failed delete data');
    }
  }
}
