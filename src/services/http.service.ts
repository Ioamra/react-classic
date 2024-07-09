export default class HttpService {
  baseUrl: string = "http://localhost:5000/";
  headers: {
    "Content-Type": string;
    Authorization?: string;
  } = {
    "Content-Type": "application/json",
  };
  accessToken: string | null = localStorage.getItem("accessToken");

  async get<T>(url: string): Promise<T> {
    try {
      if (this.accessToken) {
        this.headers.Authorization = this.accessToken;
      }
      const res = await fetch(this.baseUrl + url, {
        method: "GET",
        headers: this.headers,
      });
      const result = await res.json().then((data) => ({
        status: res.status,
        ...data,
      }));
      return result as T;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    try {
      if (this.accessToken) {
        this.headers.Authorization = this.accessToken;
      }
      const res = await fetch(this.baseUrl + url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      const result = await res.json().then((data) => ({
        status: res.status,
        ...data,
      }));
      return result as T;
    } catch (error) {
      throw error;
    }
  }

  async put<T>(url: string, data: any): Promise<T> {
    try {
      if (this.accessToken) {
        this.headers.Authorization = this.accessToken;
      }
      const res = await fetch(this.baseUrl + url, {
        method: "PUT",
        headers: this.headers,
        body: data,
      });
      const result = await res.json().then((data) => ({
        status: res.status,
        ...data,
      }));
      return result as T;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      if (this.accessToken) {
        this.headers.Authorization = this.accessToken;
      }
      const res = await fetch(this.baseUrl + url, {
        method: "DELETE",
        headers: this.headers,
      });
      const result = await res.json().then((data) => ({
        status: res.status,
        ...data,
      }));
      return result as T;
    } catch (error) {
      throw error;
    }
  }
}
