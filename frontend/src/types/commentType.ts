export interface CommentMedia {
  url: string[]; // multiple images/videos
  type: "image" | "video" | "gif" | null;
}

export interface CommentUser {
  _id: string;
  name: string;
  email: string;
  userid: number;
  avatar?: string;
  profileImage: string;
}

export interface CommentType {
  _id: string;

  postId: string; // populated হলে Object আসবে
  commentUserId: CommentUser | string; // populated / non-populated দুটোই handle করবে

  text: string;

  media: CommentMedia;

  createdAt: string;
  updatedAt: string;
}
