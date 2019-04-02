import { Route, Response, Get, Post, Patch, Header, Body, Security, Controller, Path } from 'tsoa';
import { validate} from "class-validator";
import { forEach, pick} from 'lodash';

import { ICommentCreateRequest, ICommentUpdateRequest} from '../request';
import { ICommentResponse, IErrorResponse} from '../responses'
import { createAuthToken } from '../../business-layer/security/token-helpers';

import { CommentDataAgent } from '../../data-layer/data-agents/CommentDataAgent';
import { CommentModel } from '../../data-layer/models/CommentModel';

import { logger } from '../../middleware/common/logging';


@Route('Comment')
export class CommentController extends Controller{











}
