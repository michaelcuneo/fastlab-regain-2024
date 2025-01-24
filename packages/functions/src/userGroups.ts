import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from "aws-lambda";
import { AWS } from "@fastlab-regain-2024/core/aws";
import { Table } from "sst/node/table";

export const listHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const table = JSON.parse(event?.body || "");

  try {
    const listResult = await AWS.listItems(
      table
    )

    return {
      statusCode: 200,
      body: listResult ? JSON.stringify(listHandler) : JSON.stringify("Error: Users not listed"),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
};

export const createHandler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const body = JSON.parse(event?.body || "");

  try {
    const createResult = await AWS.createItem(
      Table.Users.tableName,
      body,
      {
        email: body.email,
      }
    )
    return {
      statusCode: 200,
      body: createResult ? JSON.stringify(createResult) : JSON.stringify("Error: User not created"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export const getHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const email = event?.pathParameters?.id || '';

	try {
    const user = await AWS.getItem(Table.Users.tableName, { email: email });
   
		return {
			statusCode: 200,
			body: user ? JSON.stringify(user) : JSON.stringify("Error: User doesn't exist")
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify(err)
		};
	}
};

export const updateHandler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  const user = JSON.parse(event?.body || "");

  try {
    const updateResult = await AWS.updateItem(Table.Users.tableName, user);

    return {
      statusCode: 200,
      body: updateResult ? JSON.stringify(updateResult) : JSON.stringify("Error: User not updated"),
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
    const deleteResult = await AWS.deleteItem(Table.Users.tableName, userId);

    return {
      statusCode: 200,
      body: deleteResult ? JSON.stringify(deleteResult) : JSON.stringify("Data not deleted"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
