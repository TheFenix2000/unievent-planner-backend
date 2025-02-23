import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../../models/index';
import { EventsController } from './controllers/event.controller';
import { UpserDefaultsService } from '../../upser-defaults/upser-defaults.service';
import { UserAccount, UserAccountSchema } from '../../models/index';
import { EventsService } from './services/events.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: UserAccount.name, schema: UserAccountSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService, UpserDefaultsService],
})
export class EventsModule {}
