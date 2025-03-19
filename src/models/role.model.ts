import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Action, FieldConstraints, Subject } from '../libs';
import { BaseClass } from './base.model';

export class PermissionRule {
  @Prop({
    required: true,
    trim: true,
    lowercase: true,
  })
  action!: Action;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
  })
  subject!: Subject;
}

@Schema()
export class Role extends BaseClass {
  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.NAME.MAX_LENGTH,
  })
  name!: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
    maxlength: FieldConstraints.CODE.MAX_LENGTH,
    pattern: FieldConstraints.CODE.PATTERN,
  })
  code!: string;

  @Prop({
    default: [],
    type: () => Object,
    _id: false,
    set: (value) => {
      if (value instanceof Array) {
        return value;
      } else {
        return [value];
      }
    },
  })
  permissions!: PermissionRule[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
