import type HttpMethod from './HttpMethod';
import type ContentType from './ContentType';

export default interface RequestConfig {
   url: string;
   resource: string;
   method: HttpMethod;
   contentType?: ContentType;
   data?: any;
}