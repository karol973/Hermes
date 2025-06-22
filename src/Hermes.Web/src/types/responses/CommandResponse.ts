interface CommandResponse {
    isSuccess: boolean;
    message: string;
}

function isCommandResponse(object: any): object is CommandResponse  {
    return object != null
      && 'isSuccess' in object && typeof object.isSuccess === 'boolean'
      && 'message' in object && (typeof object.message === 'string' || typeof object.message === 'object');
}

export { type CommandResponse, isCommandResponse };