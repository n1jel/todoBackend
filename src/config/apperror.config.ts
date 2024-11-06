const appError = (statusCode: number, message: string) => {
    const error = new Error(message) as any;
    error.status = statusCode;               // Set status code on the error
    error.isOperational = true;              // Mark it as operational (if you use that in your handler)
    return error;
}
export default appError;