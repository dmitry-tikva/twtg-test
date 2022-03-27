export class ErrorsModel {
  meta: {
    validationError: {
      errors: any;
      params: object;
    };
  };
  code: string;
  description: string;
  errors: { [key: string]: string } = {};
}
