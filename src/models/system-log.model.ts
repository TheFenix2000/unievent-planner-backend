import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseClass } from './base.model';
import { FieldConstraints, SystemLogContext, SystemLogAction } from '../libs';

@Schema()
export class SystemLog extends BaseClass {
  @Prop({
    required: true,
    enum: SystemLogAction,
    default: SystemLogAction.CREATE,
  })
  action!: SystemLogAction;

  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.DESCRIPTION.MAX_LENGTH,
  })
  message!: string;

  @Prop({
    required: true,
    enum: SystemLogContext,
    default: SystemLogContext.SYSTEM,
  })
  context!: SystemLogContext;

  @Prop({ required: true })
  relatedObjectId!: string;
}

export const SystemLogSchema = SchemaFactory.createForClass(SystemLog);
