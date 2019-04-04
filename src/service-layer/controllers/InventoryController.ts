import { Route, Response, Get, Post, Patch, Header, Body, Security, Controller, Path } from 'tsoa';
import { forEach, pick} from 'lodash';

import { IInventoryCreateRequest, IInventoryUpdateRequest } from '../request';
import { IInventoryResponse, IErrorResponse, ICommentResponse } from '../responses';

import { InventoryDataAgent } from '../../data-layer/data-agents/InventoryDataAgent';
import { InventoryModel } from '../../data-layer/models/InventoryModel';

import { logger } from '../../middleware/common/logging';


@Route('Inventory')
export class InventoryController extends Controller{
  inventoryDataAgent:InventoryDataAgent = new InventoryDataAgent();

  @Security('api_key')
  @Post()
  public async CreateNewInventory(
    @Body()  request:IInventoryCreateRequest,
    @Header('x-access-token') authentication: string
  ): Promise<IInventoryResponse> {
      let result = await this.inventoryDataAgent.createNewInventory(request);
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
      let result = await this.inventoryDataAgent.updateInventory(request);
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
      const result = await this.inventoryDataAgent.getInventoryByBookRef(bookId)
      if(result.id){
         return <IInventoryResponse >( new InventoryModel(result));
      }else{
          throw result;
      }
  }

}
