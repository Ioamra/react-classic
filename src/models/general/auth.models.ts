export declare module AuthModels {
  type IError = {
    isInvalid: boolean;
    errorMessage: string;
  };

  type ILoginRequest = {
    email_users: string;
    password_users: string;
    rememberMe: boolean;
  };

  type ILoginFormError = {
    email_users: IError;
    password_users: IError;
    rememberMe: IError;
  };

  type IRegisterRequest = {
    name_users: string;
    email_users: string;
    password_users: string;
  };

  type IRegisterForm = {
    name_users: string;
    email_users: string;
    passwordOne: string;
    passwordTwo: string;
  };

  type IRegisterFormError = {
    name_users: IError;
    email_users: IError;
    passwordOne: IError;
    passwordTwo: IError;
  };
}
