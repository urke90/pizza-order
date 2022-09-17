// export const HAS_MIN_LENGTH = (charNum: number, value: string): boolean =>
//     charNum <= value.trim().length;

// export const HAS_MAX_LENGTH = (charNum: number, value: string): boolean =>
//     charNum >= value.trim().length;

// export const IS_REQUIRED = (value: string): boolean => value.trim().length >= 1;

export const validateInput = (value: string, name: string): boolean => {
    switch (name) {
        case 'email': {
            const emailRegex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(value);
        }
        case 'password': {
            return value.trim().length >= 6;
        }
        case 'username': {
            return value.trim().length >= 3;
        }

        default:
            return false;
    }
};
