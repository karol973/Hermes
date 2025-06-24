const devUrl: string = 'https://hermes-api-hehrcabth2ccfsfx.polandcentral-01.azurewebsites.net/api/';
const prodUrl: string  = 'https://hermes-api-hehrcabth2ccfsfx.polandcentral-01.azurewebsites.net/api/';


function getBaseUrl(): string {
    return import.meta.env.DEV ? devUrl 
    : prodUrl;
}

export { getBaseUrl };