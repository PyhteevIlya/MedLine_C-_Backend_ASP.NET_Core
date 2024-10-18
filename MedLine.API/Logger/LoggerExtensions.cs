namespace MedLine.API.Logger
{
    public static class LoggerExtensions
    {
        public static IDisposable Scope(this Microsoft.Extensions.Logging.ILogger self, string key, object value)
        {
            return self.BeginScope(new Dictionary<string, object?>
            {
                [key] = value
            });
        }

        public static IDisposable Scope(this Microsoft.Extensions.Logging.ILogger self, string key, object? value, HttpContext? httpContext)
        {
            if (httpContext != null)
            {
                var itemKey = $"Log{key.TrimStart('@')}";
                if (httpContext.Items.ContainsKey(itemKey))
                {
                    httpContext.Items[itemKey] = value;
                }
                else
                {
                    httpContext.Items.Add(itemKey, value);
                }
            }

            return self.BeginScope(new Dictionary<string, object?>
            {
                [key] = value
            });
        }
    }
}
