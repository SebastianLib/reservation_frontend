import { UserEntity } from "./user";

export interface FileEntity {
  id: number;
  filename: string;
  path: string;
  mimetype: string;
  uploadedAt: Date;
}
