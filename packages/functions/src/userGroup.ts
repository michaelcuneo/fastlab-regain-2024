import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from "aws-lambda";
import { AWS } from "@fastlab-regain-2024/core/aws";
import { Table } from "sst/node/table";
import { randomUUID } from "crypto";

export const listHandler: APIGatewayProxyHandlerV2 = async () => {
  const data = await AWS.listItems();

  return {
    statusCode: 200,
    body: data ? JSON.stringify(data) : JSON.stringify("No users"),
  };
}

export const createHandler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const email = JSON.parse(event?.body || "");

  try {
    const createResult = await AWS.createItem(
      Table.UserGroups.tableName,
      {
        id: randomUUID().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        email: email,
      },
      {
        email: email,
      }
    )
    return {
      statusCode: 200,
      body: createResult ? JSON.stringify(createResult) : JSON.stringify("User not created"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export const updateHandler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  const user = JSON.parse(event?.body || "");

  try {
    const updateResult = await AWS.updateItem(user);

    return {
      statusCode: 200,
      body: updateResult ? JSON.stringify(updateResult) : JSON.stringify("User not updated"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export const deleteHandler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  const userId = JSON.parse(event?.body || "");

  try {
    const deleteResult = await AWS.deleteItem(userId);

    return {
      statusCode: 200,
      body: deleteResult ? JSON.stringify(deleteResult) : JSON.stringify("User not deleted"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
