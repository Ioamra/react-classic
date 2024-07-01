export declare module AlertModels {

    interface ITimedAlert {
        show: boolean,
        type: "error" | "warning" | "success",
        message: string,
        duration: number
    }
}