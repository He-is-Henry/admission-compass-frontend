type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  oLevel: { subject: string; grade: string }[];
};

type UserLogin = {
  message;
  accessToken;
  user: {
    id: user._id;
    name: user.name;
    email: user.email;
  };
};
