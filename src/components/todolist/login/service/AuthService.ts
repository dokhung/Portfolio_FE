import type {LoginRequestDTO} from "../dto/LoginRequestDTO.ts";
import type {LoginResponseDTO} from "../dto/LoginResponseDTO.ts";
import AuthApi from "../api/authApi.ts";

export class AuthService {
    private readonly authApi: AuthApi;
    private static readonly TOKEN_KEY: string = "access_token";

    constructor(authApi: AuthApi) {
        this.authApi = authApi;
    }

    public async loginAsync(req: LoginRequestDTO): Promise<void> {
        const result: LoginResponseDTO = await this.authApi.loginAsync(req);

        sessionStorage.setItem(AuthService.TOKEN_KEY, result.accessToken);
    }

    public logout(): void {
        sessionStorage.removeItem(AuthService.TOKEN_KEY);
    }

    public isAuthenticated(): boolean {
        const token: string | null = sessionStorage.getItem(AuthService.TOKEN_KEY);
        return token !== null && token.length > 0;
    }
}

export const authService: AuthService = new AuthService(new AuthApi());