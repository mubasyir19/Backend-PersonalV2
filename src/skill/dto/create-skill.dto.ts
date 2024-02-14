import { IsString } from 'class-validator';
import { CategorySkill } from './CategorySkill';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsString()
  picture: string;

  @IsString()
  category: CategorySkill;
}
