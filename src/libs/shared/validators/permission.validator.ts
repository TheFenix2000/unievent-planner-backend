import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AppPermissions } from '../consts/permissions.const';

interface Permission {
  action: string;
  subject: string;
}

const VALID_PERMISSIONS: Permission[] = Object.values(AppPermissions).flatMap(
  (permissionGroup) => Object.values(permissionGroup),
);

@ValidatorConstraint({ async: false })
export class IsValidPermission implements ValidatorConstraintInterface {
  validate(permission: Permission): boolean {
    return VALID_PERMISSIONS.some(
      (validPermission) =>
        validPermission.action === permission.action &&
        validPermission.subject === permission.subject,
    );
  }
}
