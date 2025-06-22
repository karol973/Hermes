export default interface ApiResponse<T = null> {
    isSuccess: boolean;
    statusCode?: number;
    message?: string;
    data?: T | null;
}