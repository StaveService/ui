import { IUser } from "../../interfaces";

export interface ISignErrorResponse<T> {
  errors: T;
  success: false;
}
export interface ISignInFormValues {
  email: string;
  password: string;
}
export interface ISignSuccessResponse {
  data: IUser;
}
export interface ISignUpFormValues extends ISignInFormValues {
  nickname: string;
  familyname: string;
  givenname: string;
  ["password_confirmation"]: string;
}
