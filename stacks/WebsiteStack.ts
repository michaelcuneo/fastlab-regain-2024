import { StackContext, SvelteKitSite, use } from "sst/constructs";
import { ConfigStack } from "./ConfigStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack";
import { TableStack } from "./TableStack";
import { ApiStack } from "./ApiStack";

export function WebsiteStack({ stack }: StackContext) {
  const { bucket } = use(StorageStack);
  const { api } = use(ApiStack);
  const { auth } = use(AuthStack);
  const {
    emailService,
    emailHost,
    emailPort,
    emailUser,
    emailAppPass,
    jwtSecret,
  } = use(ConfigStack);
  const { usersTable } = use(TableStack);

  const website = new SvelteKitSite(stack, "Website", {
    bind: [
      auth,
      api,
      usersTable,
      emailService,
      emailHost,
      emailPort,
      emailUser,
      emailAppPass,
      jwtSecret,
      bucket,
    ],
    path: "packages/sveltekit",
    edge: true, // Set to true because we do need this app to be international to share with Loughborough
    environment: {
      API_URL: api.url,
    },
    customDomain: {
      domainName: "regain.soci.org.au",
      hostedZone: "soci.org.au",
    },
  });

  stack.addOutputs({
    WebsiteUrl: website.url,
  });

  return { website };
}
