interface User {
  username: string;
  userid: number;
  name: string;
  profileImage: string;
  gender: string;
  badges?: string[]; // Optional badges array
}

export interface StoryType {
  _id: string;
  userId: User; // or populated User object
  media: {
    url: string;
    type: "image" | "video";
  };

  expiresAt: string; // ISO string
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  message: string;
}
