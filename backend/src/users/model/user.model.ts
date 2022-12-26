export default abstract class User {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version: number;
}
