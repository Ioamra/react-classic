export declare module AuthModels {

    interface ILoginRequest {
        email_users: string;
        password_users: string;
        rememberMe: boolean;
    }

    interface IRegisterRequest {
        username_users: string;
        name_users: string;
        email_users: string;
        password_users: string;
    }
}