namespace Hermes.Api.Web.Configuration.Options
{
    internal sealed class AuthCookieOptions
    {
        public string Issuer { get; set; }
        public int ExpirationMinutes { get; set; }
        public int AbsoluteExpirationMinutes { get; set; }
    }
}
