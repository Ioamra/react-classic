import { AuthModels } from '../../models/general/auth';
import { HttpClientModels } from '../../models/http-client';
import Http from '../http-client';

export const login = (data: AuthModels.ILoginRequest): Promise<HttpClientModels.IQueryResponse<string>> => {
    return new Http().post<HttpClientModels.IQueryResponse<string>>('auth/login', data)
}

export const register = (data: AuthModels.IRegisterRequest): Promise<HttpClientModels.IQueryResponse<string>> => {
    return new Http().post<HttpClientModels.IQueryResponse<string>>('auth/register', data);
} 