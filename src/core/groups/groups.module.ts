import { Module } from '@nestjs/common';
import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './service/groups.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModels } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature(MongooseModels), // Register Group schema
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
