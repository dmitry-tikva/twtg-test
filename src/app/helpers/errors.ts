import { Injectable } from '@angular/core';
import { ErrorsModel } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHelper {
  public handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => new Error(error.error));
  }

  public displayError(error: ErrorsModel): any {
    if (error && error.code === 'bad_params') {
      if (
        error.meta &&
        error.meta.validationError &&
        error.meta.validationError.errors
      ) {
        return error.meta.validationError.errors[0];
      } else {
        return error.code;
      }
    } else if (error && error.code && error.code.indexOf('_') !== -1) {
      return error.code.replace(/_/gi, ' ');
    } else if (error && error.description) {
      return error.description;
    } else {
      return 'Not Found!';
    }
  }
}
