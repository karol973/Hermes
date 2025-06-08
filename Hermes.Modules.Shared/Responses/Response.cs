namespace Hermes.Modules.Shared.Response
{
    public class Response
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public long ObjectOid { get; set; }

        public static Response Success() => new() { IsSuccess = true };
        public static Response Success(long oid) => new() { IsSuccess = true, ObjectOid = oid };
        public static Response Failure(string message) => new() { IsSuccess = false, Message = message };
    }
}
