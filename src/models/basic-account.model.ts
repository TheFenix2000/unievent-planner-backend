import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import mongoose from 'mongoose';
import { BasicClass } from './basic.model';

export abstract class BasicAccount extends BasicClass {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, readonly: true })
  initials!: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({
    required: true,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Role',
  })
  roles!: mongoose.Types.ObjectId[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BasicAccount',
    readonly: true,
    select: false,
  })
  createdBy?: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BasicAccount',
  })
  updatedBy!: mongoose.Types.ObjectId;
}
