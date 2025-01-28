import { StackContext, Api, use } from "sst/constructs";
import { TableStack } from "./TableStack";
import { ConfigStack } from "./ConfigStack";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { emailService, emailHost, emailPort, emailUser, emailAppPass } =
    use(ConfigStack);
  const {
    usersTable,
    userGroupsTable,
    statsTable,
    groupTable,
    groupExercisesTable,
    exerciseTable,
    messageTable,
    sessionTable,
  } = use(TableStack);
  const { bucket } = use(StorageStack);

  const api = new Api(stack, "regainApi", {
    cors: {
      allowCredentials: true,
      allowHeaders: ["content-type"],
      allowMethods: ["ANY"],
      allowOrigins: [`http://localhost:3000`, `https://regain.soci.org.au`],
    },
    defaults: {
      function: {
        bind: [
          bucket,
          usersTable,
          userGroupsTable,
          statsTable,
          groupTable,
          groupExercisesTable,
          exerciseTable,
          messageTable,
          sessionTable,
          emailService,
          emailHost,
          emailPort,
          emailUser,
          emailAppPass,
        ],
      },
    },
    routes: {
      // S3 Presigned URL
      "GET /presignedurl/{uploadId}":
        "packages/functions/src/presignedurl.handler",
      // Exercise
      "GET /exercise/list": "packages/functions/src/exercise.listHandler",
      "POST /exercise/create": "packages/functions/src/exercise.createHandler",
      "GET /exercise/get/{id}": "packages/functions/src/exercise.getHandler",
      "PUT /exercise/update": "packages/functions/src/exercise.updateHandler",
      "DELETE /exercise/delete":
        "packages/functions/src/exercise.deleteHandler",
      // Group
      "GET /group/list": "packages/functions/src/group.listHandler",
      "POST /group/create": "packages/functions/src/group.createHandler",
      "GET /group/get/{id}": "packages/functions/src/group.getHandler",
      "PUT /group/update": "packages/functions/src/group.updateHandler",
      "DELETE /group/delete": "packages/functions/src/group.deleteHandler",
      // Group Exercise
      "GET /groupExercise/list":
        "packages/functions/src/groupExercise.listHandler",
      "POST /groupExercise/create":
        "packages/functions/src/groupExercise.createHandler",
      "GET /groupExercise/get/{id}":
        "packages/functions/src/groupExercise.getHandler",
      "PUT /groupExercise/update":
        "packages/functions/src/groupExercise.updateHandler",
      "DELETE /groupExercise/delete":
        "packages/functions/src/groupExercise.deleteHandler",
      // Stat
      "GET /stat/list": "packages/functions/src/stat.listHandler",
      "POST /stat/create": "packages/functions/src/stat.createHandler",
      "GET /stat/get/{id}": "packages/functions/src/stat.getHandler",
      "PUT /stat/update": "packages/functions/src/stat.updateHandler",
      "DELETE /stat/delete": "packages/functions/src/stat.deleteHandler",
      // Message
      /*
      "GET /message/list": "packages/functions/src/message.listHandler",
      "POST /message/create": "packages/functions/src/message.createHandler",
      "GET /message/get/{id}": "packages/functions/src/message.getHandler",
      "PUT /message/update": "packages/functions/src/message.updateHandler",
      "DELETE /message/delete": "packages/functions/src/message.deleteHandler",
      */
      // User
      "GET /user/list": "packages/functions/src/user.listHandler",
      "POST /user/create": "packages/functions/src/user.createHandler",
      "GET /user/getUserByEmail/{id}":
        "packages/functions/src/user.fromEmailHandler",
      "PUT /user/update": "packages/functions/src/user.updateHandler",
      "DELETE /user/delete": "packages/functions/src/user.deleteHandler",
      // User Group
      "GET /userGroup/list": "packages/functions/src/userGroup.listHandler",
      "POST /userGroup/create":
        "packages/functions/src/userGroup.createHandler",
      "GET /userGroup/get/{id}": "packages/functions/src/userGroup.getHandler",
      "PUT /userGroup/update": "packages/functions/src/userGroup.updateHandler",
      "DELETE /userGroup/delete":
        "packages/functions/src/userGroup.deleteHandler",
      // Session
      "GET /session/list": "packages/functions/src/session.listHandler",
      "POST /session/create": "packages/functions/src/session.createHandler",
      "GET /session/get/{id}": "packages/functions/src/session.getHandler",
      "PUT /session/update": "packages/functions/src/session.updateHandler",
      "DELETE /session/delete": "packages/functions/src/session.deleteHandler",
    },
  });

  // API PERMISSIONS
  api.attachPermissions("*");

  // API OUTPUTS
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api };
}
