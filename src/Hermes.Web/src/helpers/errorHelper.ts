function getErrorMessage(error: any): string {
    return error instanceof Error ? error.message: String(error)
}

function getBadRequestMessage(responseData: any): string {
    let message = '';
    
    for (const prop in responseData) {
        if (Object.prototype.hasOwnProperty.call(responseData, prop) && Array.isArray(responseData[prop])) {
            responseData[prop].forEach(function (error: string) {
                  message += `${error}\n`;
            });
        }
    }

    return message;
}

export { getErrorMessage, getBadRequestMessage };