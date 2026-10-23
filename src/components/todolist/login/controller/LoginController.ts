import {type Dispatch, type SetStateAction, useState} from "react";
import {type NavigateFunction, useNavigate} from "react-router";
import type {LoginRequestDTO} from "../dto/LoginRequestDTO.ts";
import {authService} from "../service/AuthService.ts";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../store/authSlice.ts";

type LoginControllerState = {
    nickName : string;
    setNickName : Dispatch<SetStateAction<string>>

    password : string;
    setPassword : Dispatch<SetStateAction<string>>

    loading: boolean
    error: string;

    loginAsync:() => Promise<void>;
}

export default function useLoginController(): LoginControllerState {
    const navigate:NavigateFunction = useNavigate();
    const dispatch = useDispatch();

    const [nickName, setNickName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const loginAsync = async (): Promise<void> => {
        setLoading(true);
        setError("");

        try {
            const req: LoginRequestDTO = {
                nickName,
                password
            };

            await authService.loginAsync(req);
            dispatch(loginSuccess(nickName));
            navigate("/dashboard", { replace: true });

        } catch {
            setError("Login failed.");

        } finally {
            setLoading(false);
        }
    };

    return {
        nickName,
        setNickName,
        password,
        setPassword,
        loading,
        error,
        loginAsync
    };
}