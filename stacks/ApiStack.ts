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
  } = use(TableStack);

  const api = new Api(stack, "api", {
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
          emailService,
          emailHost,
          emailPort,
          emailUser,
          emailAppPass,
        ],
      },
    },
    routes: {
      "GET /presignedurl/{uploadId}":
        "packages/functions/src/presignedurl.handler",
      "POST /user/create": "packages/functions/src/user.createHandler",
      "GET /user/getUserByEmail/{email}":
        "packages/functions/src/user.fromEmailHandler",
      "POST /exercise/create": "packages/functions/src/exercise.create",
      "PUT /exercise/update": "packages/functions/src/exercise.update",
      "GET /exercise/list": "packages/functions/src/exercise.list",
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
