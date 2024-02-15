

export function validateEmail(email: string): boolean {
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);

}

export function validatePassword(password: string): boolean {
    const passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
}

export function validateUsername(fullname: string): boolean {
    const usernameRegex: RegExp = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    return usernameRegex.test(fullname);
}
