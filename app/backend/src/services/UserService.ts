import { compareSync } from 'bcryptjs';
import IUserModel from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import jwtUtil from '../utils/jwtUtil';
import { Login } from '../types/Login';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  async login(loginData: Login) {
    let serviceResponse: ServiceResponse<Token>;
    const foundUser = await this.userModel.findOne(loginData.email);

    if (!foundUser || !compareSync(loginData.password, foundUser.password)) {
      console.log(`
      ${foundUser?.password}
      ${loginData.password}`);
      if (foundUser?.password) {
        console.log(compareSync(loginData.password, foundUser.password));
      }
      serviceResponse = {
        status: 'UNAUTHORIZED', data: { message: `${foundUser?.password}` },
        // status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' },
      };
      return serviceResponse;
    }
    // if (!foundUser || !compareSync(loginData.password, foundUser.password)) {
    //   serviceResponse = {
    //     status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' },
    //   };
    //   return serviceResponse;
    // }

    const { id, email } = foundUser;
    const token = jwtUtil.signToken({ id, email });
    serviceResponse = { status: 'SUCCESSFUL', data: { token } };

    return serviceResponse;
  }
}
