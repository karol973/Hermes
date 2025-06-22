import type RequestConfig from '../requests/RequestConfig';
import type ApiResponse from '../types/responses/ApiResponse';
import { processResponseAsync } from './responseHelper';
import { getBaseUrl } from '../configuration/apiConfig';
import { prepareQuery } from '../helpers/urlHelper';
 
 const baseUrl = getBaseUrl();

function getAsync<T>(resource: string, params?: any): Promise<ApiResponse<T>> {
	return executeRequestAsync<T>({
		url: baseUrl,
		method: 'GET',
		resource: resource + prepareQuery(params),
		contentType: 'application/x-www-form-urlencoded',
	});
}

 
function postAsync<T>(resource: string, data: any): Promise<ApiResponse<T>> {
	return executeRequestAsync<T>({
		url: baseUrl,
		method: 'POST',
		resource: resource,
		contentType: 'application/json',
		data: JSON.stringify(data),
	});
}

function postFormAsync<T>(resource: string, data: FormData): Promise<ApiResponse<T>> {
	return executeRequestAsync<T>({
		url: baseUrl,
		method: 'POST',
		resource: resource,
		data: data
	});
}

function putAsync<T>(resource: string, data: any): Promise<ApiResponse<T>> {
	return executeRequestAsync<T>({
		url: baseUrl,
		method: 'PUT',
		resource: resource,
		contentType: 'application/json',
		data: JSON.stringify(data),
	});
}

function patchAsync<T>(resource: string, data: any): Promise<ApiResponse<T>> {
	return executeRequestAsync<T>({
		url: baseUrl,
		method: 'PATCH',
		resource: resource,
		contentType: 'application/json',
		data: JSON.stringify(data),
	});
}

function deleteAsync<T>(resource: string): Promise<ApiResponse<T>> {
	return executeRequestAsync<T>({
		url: baseUrl,
		method: 'DELETE',
		resource: resource,
	});
}

async function executeRequestAsync<T>(config: RequestConfig): Promise<ApiResponse<T>> {
	try {
		const response: Response = await fetchAsync(config);
		const apiResponse: ApiResponse<T> = await processResponseAsync<T>(response);
		return apiResponse;
	} 
   catch (err: any) {
		console.error('Error during executing a request', err);

		return {
			isSuccess: false,
			message: (err),
			data: null,
		};
	}
}
 
function fetchAsync(config: RequestConfig): Promise<Response> {
	const requestUrl: string = `${config.url}${config.resource}`;

	const headers: HeadersInit = {};

	if (config.contentType) {
		headers['Content-Type'] = config.contentType;
	}

	return fetch(requestUrl, {
		method: config.method,
		body: config.data,
		headers,
		credentials: 'include',
		mode: 'cors',
	});
}


export { getAsync, postAsync, postFormAsync, putAsync, patchAsync, deleteAsync, fetchAsync };