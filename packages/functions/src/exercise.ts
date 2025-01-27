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

export const getHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const key = event?.pathParameters?.id || '';

  try {
    const command = new GetCommand({
      TableName: Table.Exercises.tableName,
      Key: {
        id: key,
      },
    });

    const data = await documentClient.send(command);

    return {
      statusCode: 200,
      body: data.Item ? JSON.stringify(data.Item) : JSON.stringify("Error: Exercise not found"),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
}

export const createHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body || "{}");

  try {
    const command = new PutCommand({
      TableName: Table.Exercises.tableName,
      Item: { ...body },
    });

    const data = await documentClient.send(command);

    return {
      statusCode: 200,
      body: data.Attributes ? JSON.stringify(data.Attributes) : JSON.stringify("Error: Exercise not created"),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
}

export const listHandler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const command = new ScanCommand({
      TableName: Table.Exercises.tableName,
    });

    const data = await documentClient.send(command);

    return {
      statusCode: 200,
      body: data.Items ? JSON.stringify(data.Items) : JSON.stringify("Error: Exercises not listed"),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
};

export const updateHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body || "{}");

  try {
    const command = new UpdateCommand({
      TableName: Table.Exercises.tableName,
      Key: {
        id: body.id,
      },
      UpdateExpression: "SET #title = :title, #time = :time, #description = :description, #thumbnailId = :thumbnailId, #videoId = :videoId, #updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#title": "title",
        "#time": "time",
        "#description": "description",
        "#thumbnailId": "thumbnailId",
        "#videoId": "videoId",
        "#updatedAt": "updatedAt",
      },
      ExpressionAttributeValues: {
        ":title": body.title,
        ":time": body.time,
        ":description": body.description,
        ":thumbnailId": body.thumbnailId,
        ":videoId": body.videoId,
        ":updatedAt": new Date().toISOString(),
      },
    });

    const data = await documentClient.send(command);

    return {
      statusCode: 200,
      body: data.Attributes ? JSON.stringify(data.Attributes) : JSON.stringify("Error: Exercise not updated"),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
}

export const deleteHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const body = JSON.parse(event.body || "{}");

  try {
    const command = new DeleteCommand({
      TableName: Table.Exercises.tableName,
      Key: {
        id: body.id,
      },
    });

    const data = await documentClient.send(command);

    return {
      statusCode: 200,
      body: data.Attributes ? JSON.stringify(data.Attributes) : JSON.stringify("Error: Exercise not deleted"),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
}