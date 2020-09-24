


// convert a string to link

export const linkfyString = (string) => string.trim().split(' ').join('-').toLocaleLowerCase();


// Validates an email address
export const validateEmail = (email) => {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) return false;
    if (email.length > 256) return false;
    if (!tester.test(email)) return false;
    // Further checking of some things regex can't handle
    const [account, address] = email.split('@');
    if (account.length > 64) return false;

    const domainParts = address.split('.');
    return !domainParts.some(function (part) {
        return part.length > 63;
    });

}

// validates a password input
export const validatePassword =(password, minLength) => {
    if(!password) return 'Password cannot be empty'
    if (minLength && password.length < minLength) return `password length should be more than ${minLength} `
    return null

}