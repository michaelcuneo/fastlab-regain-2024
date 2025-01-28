import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from "aws-lambda";
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

const client = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(client);

export const fromEmailHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const email = event?.pathParameters?.id || "";

  try {
    const command = new GetCommand({
      TableName: Table.Users.tableName,
      Key: { email: email },
    });

    const user = await documentClient.send(command);

    return {
      statusCode: 200,
      body: user.Item
        ? JSON.stringify(user.Item)
        : JSON.stringify("Error: User doesn't exist"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export const createHandler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const body = JSON.parse(event?.body || "");

  try {
    const command = new PutCommand({
      TableName: Table.Users.tableName,
      Item: body,
    });

    const createResult = await documentClient.send(command);

    return {
      statusCode: 200,
      body: createResult
        ? JSON.stringify(createResult)
        : JSON.stringify("Error: User not created"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export const updateHandler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const body = JSON.parse(event?.body || "");
  console.log(body);

  const params = {
    TableName: Table.Users.tableName,
    Key: { email: body.email },
    UpdateExpression:
      "SET onboard = :onboard, groups = :groups, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":onboard": body.onboard,
      ":groups": body.groups,
      ":updatedAt": new Date().toISOString(),
    },
  };

  try {
    const updateResult = await documentClient.send(new UpdateCommand(params));

    return {
      statusCode: 200,
      body: updateResult
        ? JSON.stringify(updateResult)
        : JSON.stringify("Error: User not updated"),
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

export const deleteHandler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const email = JSON.parse(event?.body || "");

  try {
    const params = {
      TableName: Table.Users.tableName,
      Key: {
        email: email,
      },
    };

    const deleteResult = await documentClient.send(new DeleteCommand(params));

    return {
      statusCode: 200,
      body: deleteResult
        ? JSON.stringify(deleteResult)
        : JSON.stringify("Data not deleted"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
