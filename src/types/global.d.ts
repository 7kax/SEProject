interface AuthUser {
    username: string;   // student number or staff number
    token: string;      // JWT token
    isAdmin: boolean;   // is admin or not
}

interface UserInfo {
    username: string;   // student number or staff number
    name: string;       // full name
    email: string;      // email
    phone: string;      // phone number
    address: string;    // address
}