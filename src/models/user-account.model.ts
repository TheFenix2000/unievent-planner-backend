import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import mongoose from 'mongoose';
import { FieldConstraints } from '../libs';
import { BaseClass } from './base.model';

@Schema()
export class UserAccount extends BaseClass {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    sparse: true,
    maxlength: FieldConstraints.USERNAME.MAX_LENGTH,
  })
  username!: string;

  @Prop({
    required: false,
    maxlength: FieldConstraints.FIRST_NAME.MAX_LENGTH,
  })
  firstName?: string;

  @Prop({
    required: false,
    maxlength: FieldConstraints.LAST_NAME.MAX_LENGTH,
  })
  lastName?: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({
    required: true,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Role',
  })
  role!: mongoose.Types.ObjectId[];

  @Prop({
    required: true,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Group',
  })
  groups!: mongoose.Types.ObjectId[];
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
