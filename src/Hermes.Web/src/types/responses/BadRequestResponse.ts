interface BadRequestResponse {
    type: string;
    title: string;
    errors: object;
}

function isBadRequestResponse(object: any): object is BadRequestResponse  {
    return object != null
      && 'title' in object && typeof object.title === 'string'
      && 'errors' in object;
}

export { type BadRequestResponse, isBadRequestResponse };