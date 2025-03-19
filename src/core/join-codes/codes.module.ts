import { Module } from '@nestjs/common';
import { CodesService } from './service/code.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { MongooseModels } from 'src/models';
import { UpserDefaultsService } from '../../upser-defaults/upser-defaults.service';

@Module({
  imports: [MongooseModule.forFeature(MongooseModels)],
  providers: [CodesService, UpserDefaultsService],
  exports: [CodesService],
})
export class CodesModule {}
