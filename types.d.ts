type Session = {
  _id: string;
  current: boolean;
  device: string; // e.g., "Chrome on Android"
  location: string; // e.g., "Lagos, Nigeria"
  ipAddress: string; // from req.ip or headers
  accessToken?: string; // optional: for tracing
  refreshToken: string; // the only session identifier needed
  userAgent: string; // raw user-agent string
  browser?: string; // parsed (optional)
  os?: string; // parsed (optional)
  platform: "mobile" | "desktop";
  isMobile?: boolean; // optional
  lastUsed: Date; // update on refresh
  createdAt: Date;
};

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  oLevel: { subject: string; grade: string }[];
  tokens: number;
  role: "admin" | "user" | "parent";
  sessions: Session[];
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
  position: number | null;
  isCurrentUser: boolean;
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

type University = {
  id: string;
  name: string;
  requires_post_utme: boolean;
  requires_olevel_grades: boolean;
  requires_sittings: boolean;
};

type PredictionResult = {
  university: string;
  admission_probability: string;
  chance_label?: string;
  aggregate_score?: number;
  screening_score?: number;
  olevel_avg_points?: number;
  explanation?: string[];
  reason?: string;
  error?: string;
};
