import { Route, Response, Get, Post, Patch, Header, Body, Security, Controller, Path } from 'tsoa';
import { validate} from "class-validator";
import { forEach, pick} from 'lodash';

import { IBookCreateRequest, IBookUpdateRequest} from '../request';
import { IBookResponse, IErrorResponse} from '../responses'
import { createAuthToken } from '../../business-layer/security/token-helpers';

import { BookDataAgent } from '../../data-layer/data-agents/BookDataAgent';
import { BookModel } from '../../data-layer/models/BookModel';

import { logger } from '../../middleware/common/logging';


@Route('Book')
export class BookController extends Controller{











}
