import { StackContext, Api, use } from "sst/constructs";
import { TableStack } from "./TableStack";
import { ConfigStack } from "./ConfigStack";

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
    imageTable,
    videoTable,
    messageTable,
    sessionTable,
  } = use(TableStack);

  const api = new Api(stack, "regainApi", {
    cors: {
      allowCredentials: true,
      allowHeaders: ["content-type"],
      allowMethods: ["ANY"],
      allowOrigins: [
        `http://localhost:3000`,
        `https://regain.soci.org.au`,
        "http://localhost:3001",
        "http://localhost:4172",
      ],
    },
    defaults: {
      function: {
        bind: [
          usersTable,
          userGroupsTable,
          statsTable,
          groupTable,
          groupExercisesTable,
          exerciseTable,
          imageTable,
          videoTable,
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
      // Exercises
      "GET /exercise/list": "packages/functions/src/exercise.list",
      "POST /exercise/create": "packages/functions/src/exercise.create",
      "GET /exercise/get/{id}": "packages/functions/src/exercise.get",
      "PUT /exercise/update": "packages/functions/src/exercise.update",
      "DELETE /exercise/delete": "packages/functions/src/exercise.delete",
      // Groups
      "GET /group/list": "packages/functions/src/group.list",
      "POST /group/create": "packages/functions/src/group.create",
      "GET /group/get/{id}": "packages/functions/src/group.get",
      "PUT /group/update": "packages/functions/src/group.update",
      "DELETE /group/delete": "packages/functions/src/group.delete",
      // Group Exercises
      "GET /groupExercise/list": "packages/functions/src/groupExercise.list",
      "POST /groupExercise/create":
        "packages/functions/src/groupExercise.create",
      "GET /groupExercise/get/{id}": "packages/functions/src/groupExercise.get",
      "PUT /groupExercise/update":
        "packages/functions/src/groupExercise.update",
      "DELETE /groupExercise/delete":
        "packages/functions/src/groupExercise.delete",
      // Images
      "GET /image/list": "packages/functions/src/image.list",
      "POST /image/create": "packages/functions/src/image.create",
      "GET /image/get/{id}": "packages/functions/src/image.get",
      "PUT /image/update": "packages/functions/src/image.update",
      "DELETE /image/delete": "packages/functions/src/image.delete",
      // Videos
      "GET /video/list": "packages/functions/src/video.list",
      "POST /video/create": "packages/functions/src/video.create",
      "GET /video/get/{id}": "packages/functions/src/video.get",
      "PUT /video/update": "packages/functions/src/video.update",
      "DELETE /video/delete": "packages/functions/src/video.delete",
      // Stats
      "GET /stat/list": "packages/functions/src/stat.list",
      "POST /stat/create": "packages/functions/src/stat.create",
      "GET /stat/get/{id}": "packages/functions/src/stat.get",
      "PUT /stat/update": "packages/functions/src/stat.update",
      "DELETE /stat/delete": "packages/functions/src/stat.delete",
      // Messages
      "GET /message/list": "packages/functions/src/message.list",
      "POST /message/create": "packages/functions/src/message.create",
      "GET /message/get/{id}": "packages/functions/src/message.get",
      "PUT /message/update": "packages/functions/src/message.update",
      "DELETE /message/delete": "packages/functions/src/message.delete",
      // Users
      "GET /user/list": "packages/functions/src/user.list",
      "POST /user/create": "packages/functions/src/user.createHandler",
      "GET /user/getUserByEmail/{email}":
        "packages/functions/src/user.fromEmailHandler",
      "PUT /user/update": "packages/functions/src/user.update",
      "DELETE /user/delete": "packages/functions/src/user.delete",
      // User Groups
      "GET /userGroup/list": "packages/functions/src/userGroup.list",
      "POST /userGroup/create": "packages/functions/src/userGroup.create",
      "GET /userGroup/get/{id}": "packages/functions/src/userGroup.get",
      "PUT /userGroup/update": "packages/functions/src/userGroup.update",
      "DELETE /userGroup/delete": "packages/functions/src/userGroup.delete",
      // Sessions
      "GET /session/list": "packages/functions/src/session.list",
      "POST /session/create": "packages/functions/src/session.create",
      "GET /session/get/{id}": "packages/functions/src/session.get",
      "PUT /session/update": "packages/functions/src/session.update",
      "DELETE /session/delete": "packages/functions/src/session.delete",
    },
  });

  // API PERMISSIONS
  api.attachPermissions("*");

  // API OUTPUTS
  stack.addOutputs({
    ApiEndpoint: api.url,
    ApiId: api.id,
  });

  return { api };
}
