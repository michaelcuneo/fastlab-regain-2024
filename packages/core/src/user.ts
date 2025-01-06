export * as User from "./user";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";
import { randomUUID } from "crypto";

const client = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(client);

export const userFromEmail = async (email: string) => {
  const params = {
    TableName: Table.Users.tableName,
    Key: {
      email: email,
    },
  };

  const data = await documentClient.send(new GetCommand(params));

  // If data came back, and it contains Items, return the Items, otherwise NULL
  return data && data.Item ? data.Item : JSON.stringify(undefined);
};

export const listUsers = async () => {
  const command = new ScanCommand({
    TableName: Table.Users.tableName,
  });

  const data = await documentClient.send(command);

  return data && data.Items ? data.Items : JSON.stringify(undefined);
};

export const createUser = async (email: string) => {
  const params = {
    TableName: Table.Users.tableName,
    Item: {
      id: randomUUID().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      email: email,
    },
  };

  const data = await documentClient.send(new PutCommand(params));

  if (data.$metadata.httpStatusCode === 200) {
    const params = {
      TableName: Table.Users.tableName,
      Key: {
        email: email,
      },
    };

    const user = await documentClient.send(new GetCommand(params));

    return user && user.Item ? user.Item : JSON.stringify(undefined);
  } else {
    return JSON.stringify(undefined);
  }
};

export const updateUser = async (email: string) => {
  const params = {
    TableName: Table.Users.tableName,
    Key: {
      email: email,
    },
  };

  const data = await documentClient.send(new UpdateCommand(params));

  if (data.$metadata.httpStatusCode === 200) {
    return data && data.Attributes ? data.Attributes : JSON.stringify(undefined);
  } else {
    return JSON.stringify(undefined);
  }
};

export const deleteUser = async (email: string) => {
  const params = {
    TableName: Table.Users.tableName,
    Key: {
      email: email,
    },
  };

  const data = await documentClient.send(new DeleteCommand(params));

  if (data.$metadata.httpStatusCode === 200) {
    return data && data.Attributes ? data.Attributes : JSON.stringify(undefined);
  } else {
    return JSON.stringify(undefined);
  }
}
