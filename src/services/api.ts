import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "../contexts/AuthContext";

export function setUpAPIClient(context = undefined) {
    let cookies = parseCookies(context);

    const api = axios.create({
        // Run the Pizzapp Backend project first, then put your IP
        baseURL: "http://yourip:3333",
        headers: {
            Authorization: `Bearer ${cookies["@pizzapp.token"]}`,
        },
    });

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            if (error.response.status === 401) {
                if (typeof window !== undefined) {
                    signOut();
                } else {
                    return Promise.reject(new AuthTokenError());
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
}
