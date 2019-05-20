import { HttpStatus} from './http-status.enum';


/**
 * @tsoaModel
 */

export class ApplicationError extends Error {
    meta: any;
    status: number;
  constructor(message?: string, status?: number, meta?: any) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || 'Something went wrong. Please try again.';

    this.status = status || HttpStatus.INTERNAL_SERVER_ERROR;

    this.meta = meta || {}
  }
}
/*
  status 409
 */
export class Conflict_409 extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Fields are in conflict', HttpStatus.CONFLICT);
  }
}

/*
  status 422
 */
export class Unprocessable_422 extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Not all the required fields were provided', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
/*
  status 400
 */
export class Invalid_400 extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Not all the required fields were provided', HttpStatus.BAD_REQUEST);
  }
}

/*
  status 401
 */
export class Authentication_401 extends ApplicationError {
  constructor(message?: string) {
    super(message || 'This request did not have the valid authentication. Please log back in.', HttpStatus.UNAUTHORIZED);
  }
}

/*
  status 403
 */
export class Authorized_403 extends ApplicationError {
  constructor(message?: string) {
    super(message || 'This user does not have access to this data.', HttpStatus.FORBIDDEN);
  }
}

/*
  status 404
 */
export class NotFound_404 extends ApplicationError {
  constructor(message?: string) {
    super(message || 'This data does not exist.', HttpStatus.NOT_FOUND);
  }
}

