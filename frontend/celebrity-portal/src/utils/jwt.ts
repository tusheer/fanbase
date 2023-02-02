import jwtDecode from 'jwt-decode';

export const verifyJwt = <T>(token: string): T | null => {
    const decoded = jwtDecode(token) as T;
    return decoded;
};
