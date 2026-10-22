import type {LoginRequestDTO} from "../dto/LoginRequestDTO.ts";
import type {LoginResponseDTO} from "../dto/LoginResponseDTO.ts";
import type {AxiosInstance, AxiosResponse} from "axios";
import {axiosClient} from "../../../../api/axiosClient.ts";

export class AuthApi {

    private readonly client: AxiosInstance;

    constructor(client: AxiosInstance = axiosClient) {
        this.client = client;
    }

    public async loginAsync(data: LoginRequestDTO) : Promise<LoginResponseDTO> {
        const rep: AxiosResponse<LoginResponseDTO> = await this.client.post("/auth/login", data);
        return rep.data;
    }
}