// usuario (correo) - contraseña

export interface SesionRequest {
    username: string;
    password: string;
}

export interface SessionResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
}
