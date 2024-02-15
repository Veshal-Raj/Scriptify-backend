

export function validateEmail(email: string): boolean {
    console.log('email in validateEmail --> ', email)
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);

}

export function validatePassword(password: string): boolean {
    console.log('password in validatePassword --> ', password)
    const passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
}

export function validateUsername(fullname: string): boolean {
    console.log('fullname in validateUsername --> ', fullname)
    const usernameRegex: RegExp = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    return usernameRegex.test(fullname);
}
