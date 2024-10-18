using System.Text.RegularExpressions;

namespace MedLine.API.Logger
{
    public class LoggingEnrichmentMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public async Task Invoke(HttpContext context)
        {
            using var _0 = _logger.Scope("User", GetUser(context), context);
            using var _2 = _logger.Scope("IPAddress", context.Connection.RemoteIpAddress?.ToString(), context);
            await _next(context);
        }

        private static string GetUser(HttpContext context)
        {
            var name = context?.User?.Identity?.Name;
            if (string.IsNullOrEmpty(name)) return null;

            return Regex.Replace(name, "^(NOVATORRU\\\\)(.+)", "$2");
        }

        public LoggingEnrichmentMiddleware(
            RequestDelegate next,
            ILogger<LoggingEnrichmentMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }
    }
}
