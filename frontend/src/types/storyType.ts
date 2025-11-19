export interface StoryTextOverlay {
  text: string;
  position:
    | "top-left"
    | "top-right"
    | "center"
    | "bottom-left"
    | "bottom-right";
  style?: {
    fontSize?: number;
    color?: string;
    bold?: boolean;
  };
}

export interface StoryType {
  _id: string;
  userId: string; // or populated User object
  media: {
    url: string;
    type: "image" | "video";
  };
  textOverlay?: StoryTextOverlay;
  expiresAt: string; // ISO string
  createdAt: string;
  updatedAt: string;
}
