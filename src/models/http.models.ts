export declare module HttpModels {
    interface IQueryResponseWithoutData {
        message: string;
        status: number;
    }

    interface IQueryResponse<T> extends IQueryResponseWithoutData {
        data: T;
    }
}