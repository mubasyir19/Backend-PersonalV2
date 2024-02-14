import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  async create(createSkillDto: CreateSkillDto) {
    try {
      const checkSkill = await this.findSkill(createSkillDto.name);
      if (checkSkill) {
        throw new ConflictException('skill already entered');
      }

      const newSkill = await this.prisma.skill.create({ data: createSkillDto });

      return {
        message: 'success add skill',
        data: newSkill,
      };
    } catch (error) {
      throw new ConflictException('fail add data');
    }
  }

  async findAll() {
    try {
      const skills = await this.prisma.skill.findMany();

      return {
        message: 'success get all data skills',
        data: skills,
      };
    } catch (error) {
      throw new ConflictException('a problem occured');
    }
  }

  async findOne(id: string) {
    try {
      const skill = await this.prisma.skill.findFirst({
        where: { id },
      });

      return {
        message: 'success get data',
        data: skill,
      };
    } catch (error) {
      throw new ConflictException('fail get data');
    }
  }

  async findSkill(name: string) {
    try {
      const skill = await this.prisma.skill.findFirst({
        where: { name },
      });

      return skill;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    try {
      const updateSkill = await this.prisma.skill.update({
        where: { id },
        data: updateSkillDto,
      });

      return {
        message: 'success update data skill',
        data: updateSkill,
      };
    } catch (error) {
      throw new ConflictException('failed update data');
    }
  }

  async remove(id: string) {
    try {
      const skill = await this.prisma.skill.findFirst({
        where: { id },
      });

      if (skill) {
        await this.prisma.skill.delete({ where: { id } });
      }
      return {
        message: `skill ${skill.name} has been deleted`,
      };
    } catch (error) {
      throw new ConflictException('failed delete data');
    }
  }
}
