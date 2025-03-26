export type UserParam = {
    uuid: string;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
};

export type AuthResponse = {
    data: {}|null;
    error: string | null;
};
