const illegalChars = /[!@#\$%\^\&*\)\(+=._-]+/g;

export const validUsername = (username: string): boolean => {
    const trimedUsername = username.trim();
    if (trimedUsername.length === 0) {
        return false;
    }
    if (illegalChars.test(trimedUsername)) {
        return false;
    }
    return true;
}

export const validPassword = (password: string): boolean => {
    const trimedPassword = password.trim();
    if (trimedPassword.length === 0) {
        return false;
    }
    if (illegalChars.test(trimedPassword)) {
        return false;
    }
    return true;
}

export const validSjnumber = (sjnumber: string): boolean => {
    const trimedSjnumber = sjnumber.trim();
    if (trimedSjnumber.length === 0) {
        return false;
    }
    if (illegalChars.test(trimedSjnumber)) {
        return false;
    }
    return true;
}