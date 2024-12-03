import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from "aws-lambda";
import { create, fromEmail } from "@fastlab-regain-2024/core/user";

export const createHandler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const email = JSON.parse(event?.body || "");

  try {
    const user = await create(email);

    return {
      statusCode: 200,
      body: user ? JSON.stringify(user) : JSON.stringify("User not created"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export const fromEmailHandler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const email = event?.pathParameters?.email || "";

  try {
    const user = await fromEmail(email);

    return {
      statusCode: 200,
      body: user ? JSON.stringify(user) : JSON.stringify("User doesn't exist"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
