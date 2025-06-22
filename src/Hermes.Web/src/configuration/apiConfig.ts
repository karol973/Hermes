const devUrl: string = 'http://localhost:40300/api/';
 const prodUrl: string  = ''

function getBaseUrl(): string {
    return import.meta.env.DEV ? devUrl 
    : prodUrl;
}

export { getBaseUrl };