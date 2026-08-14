export const ERROR_MESSAGES = {
    // change to language english
    // --- Error Sistem & Validation ---
    SYSTEM: {
        INTERNAL_SERVER_ERROR: 'An internal server error occurred.',
        NOT_FOUND: 'The requested resource or data was not found.',
        VALIDATION_FAILED: 'The submitted data does not meet the validation criteria.',
        RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
    },

    // --- Error Autentikasi (Login/Register) ---
    AUTH: {
        REGISTRATION_FAILED: 'Failed to register. Please try again later.',
        LOGIN_FAILED: 'Failed to login. Please check your credentials and try again.',
        UNAUTHORIZED: 'Invalid or expired session. Please login again.',
        FORBIDDEN: 'Access denied. You do not have permission (role) for this action.',
        TOKEN_MISSING: 'Authentication failed: Token not found.',
        EMAIL_NOT_VERIFIED: 'Your email has not been verified. Please check your inbox.',
        EMAIL_ALREADY_EXISTS: 'This email is already registered. Please use a different email.',
        USER_NOT_FOUND: 'User with the specified ID was not found.',
        PASSWORD_RESET_FAILED: 'Failed to reset password. Please try again later.',
        OTP_SEND_FAILED: 'Failed to send OTP. Please try again later.',
        EMAIL_VERIFICATION_FAILED: 'Failed to verify email. Please try again later.',
        LOGOUT_FAILED: 'Failed to logout. Please try again later.',
    },

    // --- Error Modul Device ---
    DEVICE: {
        NOT_FOUND: 'The device was not found or has been deleted.',
        OFFLINE: 'The device is currently offline or not connected to the internet.',
        ALREADY_REGISTERED: 'This device is already registered to your account.',
    },

    // --- Error Modul Quest / Misi ---
    QUEST: {
        NOT_FOUND: 'The quest was not found.',
        ALREADY_COMPLETED: 'This quest has already been completed.',
    }
} as const;