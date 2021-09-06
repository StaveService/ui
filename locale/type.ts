type IMessages = Record<
  | "email"
  | "familyname"
  | "givenname"
  | "signout"
  | "signoutSuccessful"
  | "signin"
  | "signinSuccessful"
  | "signup"
  | "signupSuccessful"
  | "password"
  | "passwordConfirmation"
  | "nickname",
  string
>;
export default IMessages;
