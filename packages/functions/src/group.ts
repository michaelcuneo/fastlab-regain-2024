import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from "aws-lambda";
import { AWS } from "@fastlab-regain-2024/core/aws";
import { Table } from "sst/node/table";

export const listHandler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const listResult = await AWS.listItems(
      Table.Groups.tableName
    )

    return {
      statusCode: 200,
      body: listResult ? JSON.stringify(listResult) : JSON.stringify("Error: Groups not listed"),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
};
