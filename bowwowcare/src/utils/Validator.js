export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;

    if (!re.test(email) || !email || email.length <= 0) {
        return false;
    }

    return true;
};

export const passwordValidator = (password) => {
    if (!password || password.length < 8) {
        return false;
    }

    return true;;
};

export const nameValidator = (name) => {
    const re = /^[a-zA-Z\u3130-\u318F\uAC00-\uD7AF]{2,15}$/;    // 가-힣 (x) => \u3130-\u318F\uAC00-\uD7AF (o)

    if (!re.test(name) || !name || name.length <= 0) {
        return false;
    }

    return true;
};
