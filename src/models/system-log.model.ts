import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseClass } from './base.model';
import { SystemContext, SystemLogAction } from 'src/libs';

@Schema()
export class SystemLog extends BaseClass {
  @Prop({
    required: true,
    enum: SystemLogAction,
    default: SystemLogAction.CREATE,
  })
  action!: SystemLogAction;

  @Prop({ required: true, trim: true, maxlength: 1000 })
  message!: string;

  @Prop({ required: true, enum: SystemContext, default: SystemContext.SYSTEM })
  context!: SystemContext;

  @Prop({ required: true })
  relatedObjectId!: string;
}

export const SystemLogSchema = SchemaFactory.createForClass(SystemLog);
