import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";

const client = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(client);
export const listHandler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const command = new ScanCommand({
      TableName: Table.Users.tableName,
    });

    const data = await documentClient.send(command);

    return {
      statusCode: 200,
      body: data.Items ? JSON.stringify(data.Items) : JSON.stringify("Error: Users not listed"),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
};
