// string has min number of chars
const HAS_MIN_LENGTH = (charNum: number, value: string): boolean =>
    charNum <= value.trim().length;

// string has max number of chars
// export const HAS_MAX_LENGTH = (charNum: number, value: string): boolean =>
//     charNum >= value.trim().length;

// string should have at least 1 char
const IS_REQUIRED = (value: string): boolean => value.trim().length >= 1;

export const validateInput = (value: string, name: string): boolean => {
    const addressKey = ['city', 'zipCode', 'street', 'floor', 'apartment'].find(
        (item) => item === name
    );

    switch (name) {
        case 'email': {
            const emailRegex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(value);
        }
        case 'password':
        case 'phone': {
            return HAS_MIN_LENGTH(6, value);
        }
        case 'username': {
            return HAS_MIN_LENGTH(3, value);
        }
        case addressKey: {
            return IS_REQUIRED(value);
        }

        default:
            return false;
    }
};
