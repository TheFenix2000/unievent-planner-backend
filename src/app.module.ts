import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConnectionString, PermissionGuard } from './libs';
import { MongooseModels } from './models';
import { GroupsController } from './core/groups/controllers';
import { GroupsService } from './core/groups/service';
import { GroupsModule } from './core/groups/groups.module';
import { UpserDefaultsService } from './upser-defaults/upser-defaults.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: getMongoConnectionString(configService),
      }),
    }),
    MongooseModule.forFeature(MongooseModels),
    GroupsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    UpserDefaultsService,
    Logger,
  ],
})
export class AppModule {}
