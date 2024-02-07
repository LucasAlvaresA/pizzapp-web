import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { ReactNode, createContext, useState } from "react";
import { api } from "../services/apiClient";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
    id: string;
    name: string;
    email: string;
};

type SignInProps = {
    email: string;
    password: string;
};

type SignUpProps = {
    name: string;
    email: string;
    password: string;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, "@pizzapp.token");
        Router.push("/");
    } catch (error) {
        console.log("signOut error");
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            const { id, name, token } = response.data;

            setCookie(undefined, "@pizzapp.token", token, {
                maxAge: 60 * 60 * 24 * 30, // Expires in 1 month,
                path: "/", // All routes have access to this cookie
            });

            setUser({
                id,
                name,
                email,
            });

            // Set the user token to all next requests
            api.defaults.headers["Authorization"] = `Bearer ${token}`;

            Router.push("/dashboard");

            console.log(response.data);
        } catch (error) {
            console.log("login error", error);
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post("/register", {
                name,
                email,
                password,
            });

            Router.push("/");
        } catch (error) {
            console.log("sign up error", error);
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signOut, signUp }}
        >
            {children}
        </AuthContext.Provider>
    );
}
