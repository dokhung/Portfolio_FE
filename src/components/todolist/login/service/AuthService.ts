import {AuthApi} from "../api/authApi.ts";
import type {LoginRequestDTO} from "../dto/LoginRequestDTO.ts";
import type {LoginResponseDTO} from "../dto/LoginResponseDTO.ts";

export class AuthService {
    private readonly authApi: AuthApi;

    constructor(authApi: AuthApi) {
        this.authApi = authApi;
    }

    public async loginAsync(req: LoginRequestDTO): Promise<void> {
        const result: LoginResponseDTO = await this.authApi.loginAsync(req);
        sessionStorage.setItem("access_token", result.accessToken);
    }

    public logout(): void {
        sessionStorage.removeItem("access_token");
    }

    public isAuthenticated(): boolean {
        const token: string | null = sessionStorage.getItem("access_token");
        return token !== null && token.length > 0;
    }
}

export const authService: AuthService = new AuthService(new AuthApi());