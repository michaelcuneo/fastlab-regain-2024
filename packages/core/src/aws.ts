export * as AWS from "./aws";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(client);

export const getItem = async (TableName: string, key: {}) => {
  const params = {
    TableName,
    Key: key,
  };
  
  const data = await documentClient.send(new GetCommand(params));

  return data && data.Item ? data.Item : JSON.stringify(undefined);
};

export const listItems = async (TableName: string) => {
  const command = new ScanCommand({
    TableName
  });

  const data = await documentClient.send(command);

  return data && data.Items ? data.Items : JSON.stringify(undefined);
};

export const createItem = async (TableName: string, item: {}, key: {}) => {
  const params = {
    TableName,
    Item: item,
  };

  const data = await documentClient.send(new PutCommand(params));

  if (data.$metadata.httpStatusCode === 200) {
    const params = {
      TableName,
      Key: key,
    };

    const data = await documentClient.send(new GetCommand(params));

    return data && data.Item ? data.Item : JSON.stringify(undefined);
  } else {
    return JSON.stringify(undefined);
  }
};

export const updateItem = async (TableName: string, id: string) => {
  const params = {
    TableName,
    Key: {
      id: id,
    },
  };

  const data = await documentClient.send(new UpdateCommand(params));

  if (data.$metadata.httpStatusCode === 200) {
    return data && data.Attributes ? data.Attributes : JSON.stringify(undefined);
  } else {
    return JSON.stringify(undefined);
  }
};

export const deleteItem = async (TableName: string, id: string) => {
  const params = {
    TableName,
    Key: {
      id: id,
    },
  };

  const data = await documentClient.send(new DeleteCommand(params));

  if (data.$metadata.httpStatusCode === 200) {
    return data && data.Attributes ? data.Attributes : JSON.stringify(undefined);
  } else {
    return JSON.stringify(undefined);
  }
}
