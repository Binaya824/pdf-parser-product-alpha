class ResponseCodes {
    static USER_NOT_FOUND = {
        code: 404,
        message: "User not found. Please Register"
    } as const;

    static INTERNAL_SERVER_ERROR = {
        code: 500,
        message: "Internal server error"
    };

    static LOGIN_SUCCESS = {
        code: 200,
        message: "User login success"
    };

    static INVALID_CREDENTIALS = {
        code: 401,
        message: "Invalid credentials"
    };

    static REGISTRATION_SUCCESS = {
        code: 201, 
        message: "User registration success"
    };

    static USER_ALREADY_EXISTS = {
        code: 409,
        message: "User already exists"
    };
    static OTP_SENT = {
        code: 200,
        message: "OTP sent successfully"
    };
    static INVALID_OTP = {
        code: 401,
        message: "Invalid OTP"
    };
    static OTP_VERIFIED = {
        code: 200,
        message: "Invalid OTP"
    };
    static VERIFICATION_FAILED = {
        code: 400,
        message: "Verification failed"
    };
    static PASSWORD_RESET_SUCCESS = {
        code: 200,
        message: "Password reset successfully"
    };
    static UPLOAD_SUCCESS = {
        code: 200,
        message: "File Uploaded successfully"
    };
    static UPLOAD_FAILED = {
        code: 400,
        message: "Failed to upload file"
    };
    
}

export { ResponseCodes };
