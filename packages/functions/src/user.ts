import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from "aws-lambda";
import { User } from "@fastlab-regain-2024/core/user";

export const listHandler: APIGatewayProxyHandlerV2 = async () => {
  const data = await User.listUsers();
  return {
    statusCode: 200,
    body: "List users",
  };
}

export const createHandler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const email = JSON.parse(event?.body || "");

  try {
    const user = await User.createUser(email);

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
    const user = await User.userFromEmail(email);

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

export const updateHandler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  const user = JSON.parse(event?.body || "");

  try {
    const userResponse = await User.updateUser(user);

    return {
      statusCode: 200,
      body: userResponse ? JSON.stringify(userResponse) : JSON.stringify("User not updated"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export const deleteHandler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
  const id = JSON.parse(event?.body || "");

  try {
    const user = await User.deleteUser(id);

    return {
      statusCode: 200,
      body: user ? JSON.stringify(user) : JSON.stringify("User not deleted"),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
