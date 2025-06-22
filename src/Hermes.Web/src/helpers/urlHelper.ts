function prepareQuery(params?: any): string {
    if(params == null) {
        return '';
    }
 
    const paramArray: string = Object.keys(params)
        .filter(key => params[key] != null)
        .map(key => prepareParam(key, params[key]))
        .join('&');
 
    return `?${new URLSearchParams(paramArray).toString()}`;
 }
 
 function prepareParam(paramName: string, paramValue: any): string {
    return Array.isArray(paramValue)
       ? paramValue.map((value) => `${encodeURIComponent(paramName)}=${encodeURIComponent(value)}`).join('&')
       : `${encodeURIComponent(paramName)}=${encodeURIComponent(paramValue)}`;
 }
 
 export { prepareQuery };