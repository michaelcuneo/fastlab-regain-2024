type Mailer = {
  email: string;
  service: string;
  host: string;
  port: number;
  username: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type ExerciseGroup = {
  id: string;
  exerciseId: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
}

type Group = {
  id: string;
  title: string;
  users: User[];
  groups: Exercise[];
  createdAt: string;
  updatedAt: string;
}

type Area = {
  id: string;
  status: string;
}

type Exercise = {
  id: string;
  title: string;
  time: number;
  description?: string;
  thumbnail?: Image;
  exerciseVideoId?: string;
  exerciseThumbnailId?: string;
  groups?: object;
  video?: Video;
  exerciseGroups?: Group[];
  createdAt: string;
  updatedAt: string;
}

type Stat = {
  id: string;
  user: userType;
  exercise: exerciseType;
  pain: number;
  complexity: number;
  comments: string;
}

type Error = {
  status: boolean;
  message: string;
}

type UserToken = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};

type UserLookup = {
  id: string;
};

type Session = {
  id: string;
  userId: string;
};

type Message = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  isSent: boolean;
  messagesUserId: string;
};

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    user: User;
    userId: string;
  };
};
