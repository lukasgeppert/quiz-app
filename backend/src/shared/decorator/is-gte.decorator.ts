import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@Injectable()
@ValidatorConstraint({ name: 'IsGreaterThanEqual', async: false})
export class IsGte implements ValidatorConstraintInterface {
 
    async validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        if (typeof value === 'number' && typeof relatedValue === 'number') {
            return this._number(value, relatedValue);
        }
        else if (value instanceof Date && relatedValue instanceof Date) {
            return this._date(value, relatedValue);
        } else {
            return true;
        }
    }


    private _number(value: number, relatedValue: number) {
        return value >= relatedValue;
    }

    private _date(value: Date, relatedValue: Date) {
        return value >= relatedValue;
    }

    defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        return `${relatedPropertyName} must be greater than ${args.property}`;
    }
}