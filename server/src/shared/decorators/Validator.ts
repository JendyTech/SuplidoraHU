import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

@ValidatorConstraint({ async: false })
export class IsBase64ImageConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const base64ImagePattern =
      /^data:image\/(jpeg|png|gif|bmp|webp);base64,[A-Za-z0-9+/]+={0,2}$/
    return typeof text === 'string' && base64ImagePattern.test(text)
  }

  defaultMessage(args: ValidationArguments) {
    return 'The string ($value) is not a valid base64 encoded image'
  }
}

export const IsBase64Image = (validationOptions?: ValidationOptions) => {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBase64ImageConstraint,
    })
  }
}
