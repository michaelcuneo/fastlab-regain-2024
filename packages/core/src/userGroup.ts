export * as User from './user';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { randomUUID } from 'crypto';

const client = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(client);

export const fromId = async (id: string) => {
	// Set the parameters for the GetCommand
	const params = {
		TableName: Table.UserGroups.tableName, // The name of the Users table
		Key: {
			id: id // The id of the user to retrieve
		}
	};

	// Execute the GetCommand and get the data
	const data = await documentClient.send(new GetCommand(params));

	// If data came back, and it contains Items, return the Items, otherwise undefined
	return data && data.Item ? data.Item : JSON.stringify(undefined);
};

export async function create(email: string) {
	// Set the parameters for the PutCommand
	// The parameters contain the name of the Users table and the user data to create
	const params = {
		TableName: Table.UserGroups.tableName,
		Item: {
			id: randomUUID().toString(), // Generate a new id for the user
			email: email // Set the email of the user
		}
	};

	// Execute the PutCommand to create the user
	const data = await documentClient.send(new PutCommand(params));

	// If the PutCommand was successful (status code 200), get the user data
	if (data.$metadata.httpStatusCode === 200) {
		const userParams = {
			TableName: Table.UserGroups.tableName, // The name of the Users table
			Key: {
				email: email // The email of the user to retrieve
			}
		};

		// Retrieve the user data from the Users table
		const user = await documentClient.send(new GetCommand(userParams));

		// If data came back, and it contains Items, return the Items, otherwise undefined
		// The Items are the user data
		// The JSON string "undefined" is returned if the data is undefined
		return user && user.Item ? user.Item : JSON.stringify(undefined);
	} else {
		// If the PutCommand was not successful, return undefined
		return JSON.stringify(undefined);
	}
}
