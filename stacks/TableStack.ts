import { StackContext, Table } from "sst/constructs";

export function TableStack({ stack }: StackContext) {
  // Define users table
  const usersTable = new Table(stack, "Users", {
    fields: {
      id: "string",
      email: "string",
      onboard: "binary",
      overallProgress: "number",
      createdAt: "string",
      updatedAt: "string",
    },
    primaryIndex: { partitionKey: "email" },
  });

  const userGroupsTable = new Table(stack, "UserGroups", {
    fields: {
      id: "string",
      userId: "string",
      groupId: "string",
      createdAt: "string",
      updatedAt: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  const statsTable = new Table(stack, "Stats", {
    fields: {
      id: "string",
      userId: "string",
      exerciseId: "string",
      pain: "number",
      complexity: "number",
      comments: "string",
      createdAt: "string",
      updatedAt: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  const groupTable = new Table(stack, "Groups", {
    fields: {
      id: "string",
      title: "string",
      createdAt: "string",
      updatedAt: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  const groupExercisesTable = new Table(stack, "GroupExercises", {
    fields: {
      id: "string",
      groupId: "string",
      exerciseId: "string",
      createdAt: "string",
      updatedAt: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  const exerciseTable = new Table(stack, "Exercises", {
    fields: {
      id: "string",
      title: "string",
      time: "string",
      thumbnail: "string",
      description: "string",
      video: "string",
      createdAt: "string",
      updatedAt: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  const messageTable = new Table(stack, "Messages", {
    fields: {
      id: "string",
      content: "string",
      createdAt: "string",
      updatedAt: "string",
      isSent: "binary",
      userId: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  const sessionTable = new Table(stack, "Sessions", {
    fields: {
      id: "string",
      userId: "string",
      createdAt: "string",
      updatedAt: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  stack.addOutputs({
    UsersTableName: usersTable.tableName,
    UserGroupsTableName: userGroupsTable.tableName,
    StatsTableName: statsTable.tableName,
    GroupTableName: groupTable.tableName,
    GroupExercisesTableName: groupExercisesTable.tableName,
    ExerciseTableName: exerciseTable.tableName,
    MessageTableName: messageTable.tableName,
    SessionTableName: sessionTable.tableName,
  });

  return {
    usersTable,
    userGroupsTable,
    statsTable,
    groupTable,
    groupExercisesTable,
    exerciseTable,
    messageTable,
    sessionTable,
  };
}
