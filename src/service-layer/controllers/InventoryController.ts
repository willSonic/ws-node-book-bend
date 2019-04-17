import { Route, Response, Get, Post, Patch, Header, Body, Security, Controller, Path } from 'tsoa';
import { forEach, pick} from 'lodash';

import { IInventoryCreateRequest, IInventoryUpdateRequest } from '../request';
import { IInventoryResponse, IErrorResponse, ICommentResponse } from '../responses';

import { InventoryModel } from '../../data-layer/models/InventoryModel';

import { logger } from '../../middleware/common/logging';
import { DataAgentServices as dataAgent } from '../../data-layer/data-agents';


@Route('Inventory')
export class InventoryController extends Controller{

  @Security('api_key')
  @Post()
  public async CreateNewInventory(
    @Body()  request:IInventoryCreateRequest,
    @Header('x-access-token') authentication: string
  ): Promise<IInventoryResponse> {

      let result = await dataAgent.inventoryDA.createNewInventory(request);
      if(result.id){
         return <IInventoryResponse >( new InventoryModel(result));
      }else{
          throw result;
      }
  }

  @Security('api_key')
  @Patch()
  public async UpdateInventory(
    @Body()  request:IInventoryUpdateRequest,
    @Header('x-access-token') authentication: string
  ): Promise<IInventoryResponse> {
      let result = await dataAgent.inventoryDA.updateInventory(request);
      if(result.id){
         return <IInventoryResponse >( new InventoryModel(result));
      }else{
          throw result;
      }
  }

  @Security('api_key')
  @Get('byBook/{bookId}')
  public async GetInventoryByBookId(
    @Path() bookId: string,
    @Header('x-access-token') authentication: string
  ): Promise<IInventoryResponse> {
      const result = await dataAgent.inventoryDA.getInventoryByBookRef(bookId)
      if(result.id){
         return <IInventoryResponse >( new InventoryModel(result));
      }else{
          throw result;
      }
  }

}
