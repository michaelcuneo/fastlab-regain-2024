import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Bucket } from "sst/node/bucket";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const uploadId = event?.pathParameters?.uploadId || ("" as string);
  console.log(uploadId);

  const command = new GetObjectCommand({
    Key: uploadId,
    Bucket: Bucket.public.bucketName,
  });
  const url = await getSignedUrl(new S3Client({}), command);

  return {
    statusCode: 200,
    body: JSON.stringify({ url }),
  };
};
