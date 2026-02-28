type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  oLevel: { subject: string; grade: string }[];
  tokens: number;
};

type UserLogin = {
  message: string;
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

type Subject = {
  _id: string;
  code: string;
  name: string;
  questionCount: number;
};

type Question = {
  _id: string;
  text: string;
  subject: { _id: string; name: string };
  options: string[];
  correctIndex: number;
  explanation?: string;
  image?: string;
  year?: number;
};

type NewQuestion = Omit<Question, "_id"> & { _tempId: number };

type UpdateQuestion = Partial<Question>;

type LeaderboardEntry = {
  referrer: {
    _id: string;
    firstName: string;
    username: string;
  };
  count: number;
};

type ReferralHistory = {
  _id: string;
  referred: {
    _id: string;
    firstName: string;
    username: string;
  };
  paid: boolean;
  createdAt: string;
};
