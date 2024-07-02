export declare module AuthModels {

    type ILoginRequest = {
        email_users: string;
        password_users: string;
        rememberMe: boolean;
    }

    type IRegisterRequest = {
        username_users: string;
        name_users: string;
        email_users: string;
        password_users: string;
    }

    type ILoginErrors = {
        email_users: boolean;
        password_users: boolean;
    }

    type IRegisterErrors = {
        username_users: boolean;
        name_users: boolean;
        email_users: boolean;
        passwordOne: boolean;
        passwordTwo: boolean;
        passwordMatch: boolean;
    }

    type IForgotPasswordErrors = {
        forgotPassword: boolean;
    }

    type IFormErrors = {
        login: ILoginErrors;
        register: IRegisterErrors;
        forgotPassword: IForgotPasswordErrors;
    }

    type IFormType = keyof AuthModels.IFormErrors;
    type IFieldType<T> = keyof T;
}