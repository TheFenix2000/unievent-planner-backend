import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModels } from '../../models/index';
import { RolesController } from './controllers/roles.controller';
import { RoleService } from './services/roles.service';
import { Role, RoleSchema } from '../../models/index';
import { UpserDefaultsService } from '../../upser-defaults/upser-defaults.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature(MongooseModels),
  ],
  controllers: [RolesController],
  providers: [RoleService, UpserDefaultsService],
})
export class RolesModule {}
