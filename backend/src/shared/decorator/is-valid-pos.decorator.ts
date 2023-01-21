import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'IsGreaterThanEqual', async: false })
export class IsValidPos<T> implements ValidatorConstraintInterface {
  async validate(value: number, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName] as T[];
    if (value >= relatedValue.length) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must not exceed size of ${relatedPropertyName}`;
  }
}
