import { SSTConfig } from "sst";
import { ConfigStack } from "./stacks/ConfigStack";
import { TableStack } from "./stacks/TableStack";
import { ApiStack } from "./stacks/ApiStack";
import { StorageStack } from "./stacks/StorageStack";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "fastlab-regain-2024",
      region: "ap-southeast-2",
      profile: "default",
    };
  },
  stacks(app) {
    app
      .stack(ConfigStack)
      .stack(TableStack)
      .stack(ApiStack)
      .stack(StorageStack)
      .stack(AuthStack);
  },
} satisfies SSTConfig;
