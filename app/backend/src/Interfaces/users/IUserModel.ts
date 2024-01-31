import IUser from './IUser';

export default interface IUserModel {
  // findById(id: number): Promise<IUser | null>;
  findOne(email: string): Promise<IUser | null>
}
