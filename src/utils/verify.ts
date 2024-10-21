const illegalChars = /[!@#\$%\^\&*\)\(+=._-]+/g;

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

export const validID = (id: string): boolean => {
    const trimedID = id.trim();
    if (trimedID.length === 0) {
        return false;
    }
    if (illegalChars.test(trimedID)) {
        return false;
    }
    return true;
}

export const validUsername = (username: string): boolean => {
    return true;
}