import { AuthModels } from '../../models/general/auth.models';
import { HttpModels } from '../../models/http.models';
import Http from '../http.service';

export const login = (data: AuthModels.ILoginRequest): Promise<HttpModels.IQueryResponse<string>> => {
    return new Http().post<HttpModels.IQueryResponse<string>>('auth/login', data)
}

export const register = (data: AuthModels.IRegisterRequest): Promise<HttpModels.IQueryResponse<string>> => {
    return new Http().post<HttpModels.IQueryResponse<string>>('auth/register', data);
} 