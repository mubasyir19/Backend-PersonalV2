import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SkillModule } from './skill/skill.module';
import { ProjectModule } from './project/project.module';
import { AccountModule } from './account/account.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [AuthModule, SkillModule, ProjectModule, AccountModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
