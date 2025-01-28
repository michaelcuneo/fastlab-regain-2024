import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";

const client = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(client);

export const getHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const key = event?.pathParameters?.id || "";

  try {
    const command = new GetCommand({
      TableName: Table.Users.tableName,
      Key: {
        id: key,
      },
    });

    const data = await documentClient.send(command);

    return {
      statusCode: 200,
      body: data.Item
        ? JSON.stringify(data.Item)
        : JSON.stringify("Error: Users not listed"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export const createHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body || "{}");

  try {
    const command = new PutCommand({
      TableName: Table.Users.tableName,
      Item: { ...body },
    });

    const data = await documentClient.send(command);

    return {
      statusCode: 200,
      body: data.Attributes
        ? JSON.stringify(data.Attributes)
        : JSON.stringify("Error: Users not listed"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export const updateHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event?.body || "");

  try {
    const params = {
      TableName: Table.Users.tableName,
      Key: { email: body.email },
      UpdateExpression:
        "SET = groups = :groups, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":groups": body.groups,
        ":updatedAt": new Date().toISOString(),
      },
    };

    const command = new UpdateCommand(params);

    const updateResult = await documentClient.send(command);

    return {
      statusCode: 200,
      body: updateResult.Attributes
        ? JSON.stringify(updateResult.Attributes)
        : JSON.stringify("Error: Users not listed"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};


export const listHandler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const command = new ScanCommand({
      TableName: Table.Users.tableName,
    });

    const data = await documentClient.send(command);

    return {
      statusCode: 200,
      body: data.Items
        ? JSON.stringify(data.Items)
        : JSON.stringify("Error: Users not listed"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export const deleteHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body || "{}");

  try {
    const command = new DeleteCommand({
      TableName: Table.Users.tableName,
      Key: {
        id: body.id,
      },
    });

    const data = await documentClient.send(command);
    return {
      statusCode: 200,
      body: data
        ? JSON.stringify(data)
        : JSON.stringify("Error: Users not deleted"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};