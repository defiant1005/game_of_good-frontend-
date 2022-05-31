export interface iUser {
    date_joined: string,
    email: string,
    first_name: string,
    groups: Array<number>,
    id: number,
    is_active: boolean,
    is_staff: boolean,
    is_superuser: boolean,
    last_login: string,
    last_name: string,
    password: string,
    user_permissions: Array<number>,
    username: string
}