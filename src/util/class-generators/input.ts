export const generateClassName = (
    isValid: boolean,
    isTouched: boolean,
    classToAdd: string
): string => (!isValid && isTouched ? classToAdd : '');
