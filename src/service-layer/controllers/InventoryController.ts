import { Route, Response, Get, Post, Patch, Header, Body, Security, Controller, Path } from 'tsoa';
import { validate} from "class-validator";
import { forEach, pick} from 'lodash';

import { IInventoryCreateRequest, IInventoryUpdateRequest} from '../request';
import { IInventoryResponse, IErrorResponse} from '../responses'
import { createAuthToken } from '../../business-layer/security/token-helpers';

import { InventoryDataAgent } from '../../data-layer/data-agents/InventoryDataAgent';
import { InventoryModel } from '../../data-layer/models/InventoryModel';

import { logger } from '../../middleware/common/logging';


@Route('Inventory')
export class InventoryController extends Controller{











}
