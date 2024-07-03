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
}