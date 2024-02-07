import IUser from './IUser';

export default interface IUserModel {
  findOne(email: string): Promise<IUser | null>
}
