export interface IMessageResponse{
  id: string;
  userRef: string; //user Id
  messageType: string;
  messageText: string;
  reviewedAt: Date
  modifiedAt: Date
  createdAt: Date
}

export type IMessageResponses = IMessageResponse[];
