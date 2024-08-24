import { ResponseCodes } from "./responseCodes";

class ReturnResponseObject {
    public static internalServerError() {
        return {
            status: ResponseCodes.INTERNAL_SERVER_ERROR.code,
            message: ResponseCodes.INTERNAL_SERVER_ERROR.message
        }
    }
}

export {ReturnResponseObject}