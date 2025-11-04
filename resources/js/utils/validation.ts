export interface ValidationErrors {
    [key: string]: string;
}

export interface ValidationRules {
    [key: string]: Array<(value: any) => string | null>;
}

/**
 * Email format validation rule (does not check if required)
 */
export const emailFormatRule = (value: string): string | null => {
    if (!value) {
        return null; // Allow empty, use requiredRule separately if needed
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
    }
    return null;
};

/**
 * Email validation rule (combines required and format validation for convenience)
 */
export const emailRule = (value: string): string | null => {
    if (!value) {
        return 'Email is required';
    }
    return emailFormatRule(value);
};

/**
 * Required field validation rule
 */
export const requiredRule = (fieldName: string) => (value: string): string | null => {
    if (!value || value.trim() === '') {
        return `${fieldName} is required`;
    }
    return null;
};

/**
 * Minimum length validation rule
 */
export const minLengthRule = (min: number, fieldName: string) => (value: string): string | null => {
    if (value && value.length < min) {
        return `${fieldName} must be at least ${min} characters`;
    }
    return null;
};

/**
 * Maximum length validation rule
 */
export const maxLengthRule = (max: number, fieldName: string) => (value: string): string | null => {
    if (value && value.length > max) {
        return `${fieldName} must not exceed ${max} characters`;
    }
    return null;
};

/**
 * Password confirmation validation rule
 */
export const passwordConfirmationRule = (password: string) => (confirmation: string): string | null => {
    if (confirmation !== password) {
        return 'Password confirmation does not match';
    }
    return null;
};

/**
 * Validate form data against rules
 * @param data - Form data to validate
 * @param rules - Validation rules for each field
 * @returns Object containing validation errors for each field
 */
export const validateForm = <T extends Record<string, unknown>>(data: T, rules: ValidationRules): ValidationErrors => {
    const errors: ValidationErrors = {};

    Object.keys(rules).forEach((field) => {
        const fieldRules = rules[field];
        const value = data[field];

        for (const rule of fieldRules) {
            const error = rule(value);
            if (error) {
                errors[field] = error;
                break; // Stop at first error for this field
            }
        }
    });

    return errors;
};
