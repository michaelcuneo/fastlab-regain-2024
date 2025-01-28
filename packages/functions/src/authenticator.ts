import { Config } from "sst/node/config";
import { AuthHandler, LinkAdapter } from "sst/node/auth";
import { mailer } from "@fastlab-regain-2024/core/nodemailer";
import jwt from "jsonwebtoken";
import { Table } from "sst/node/table";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(client);

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userId: string;
    };
  }
}

export type User = {
  id: string;
  email: string;
};

export const handler = AuthHandler({
  providers: {
    magicLink: LinkAdapter({
      onLink: async (link, claims) => {
        // Send an email.
        await mailer({
          email: claims.email,
          authUrl: link,
        });

        return {
          statusCode: 200,
          body: "Email sent",
        };
      },
      onSuccess: async (response) => {
        const params = {
          TableName: Table.Users.tableName,
          Key: {
            email: response.email!,
          },
        };

        const result = await documentClient.send(new GetCommand(params));
        const user: User = result.Item as unknown as User;

        if (user === undefined) {
          return {
            statusCode: 200,
            body: "User not found",
          };
        }

        const token = jwt.sign(
          { userId: user && user.id, email: user && user.email },
          Config.JWT_SECRET,
          {
            expiresIn: "3m",
          }
        );

        return {
          statusCode: 302,
          headers: {
            Location: process.env.IS_LOCAL
              ? `http://localhost:3000/auth/callback?token=${token}`
              : `https://fastlab.soci.org.au/auth/callback?token=${token}`,
          },
          body: JSON.stringify({
            type: "user",
            properties: {
              userId: user && user.id,
              email: user && user.email,
            },
          }),
        };
      },
      onError: async () => {
        return {
          statusCode: 500,
          body: "Something went wrong",
        };
      },
    }),
  },
});
