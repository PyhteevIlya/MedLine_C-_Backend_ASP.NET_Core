using MedLine.Application.Services;
using MedLine.Core.Models;
using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using MedLine.API.JWTSettings;

namespace MedLine.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IJwtProvider _jwtProvider;
        private readonly IUserService _userService;
        private readonly JWTSettings.JWTSettings _options;

        public AuthController(IJwtProvider jwtProvider, IUserService userService, IOptions<JWTSettings.JWTSettings> optAccess)
        {
            _jwtProvider = jwtProvider;
            _userService = userService;
            _options = optAccess.Value;
        }

        [HttpPost("GenerateToken")]
        public string GenerateToken(User user)
        {
            List < Claim > claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, user.FullName));
            claims.Add(new Claim(ClaimTypes.Role, user.Role.ToString()));

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey));

            var jwt = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(1)),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        //private string GenerateRefreshToken()
        //{
        //    var randomNumber = new byte[32];
        //    using (var rng = RandomNumberGenerator.Create())
        //    {
        //        rng.GetBytes(randomNumber);
        //        return Convert.ToBase64String(randomNumber);
        //    }
        //}

        //private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        //{
        //    var tokenValidationParameters = new TokenValidationParameters
        //    {
        //        ValidateIssuer = false,
        //        ValidateAudience = false,
        //        ValidateLifetime = false,
        //        IssuerSigningKey =
        //            new SymmetricSecurityKey(
        //                Encoding.UTF8.GetBytes("SecretKeySecretKeySecretKeySecretKeySecretKeySecretKeySecretKey")),
        //        ValidateIssuerSigningKey = true
        //    };
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    SecurityToken securityToken;
        //    var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);

        //    var jwtToken = securityToken as JwtSecurityToken;
        //    if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
        //            StringComparison.InvariantCultureIgnoreCase))
        //        throw new SecurityTokenException("InvalidToken");

        //    return principal;
        //}

        //[HttpPost("refresh-token")]
        //public IActionResult RefreshToken(TokenModel tokenModel)
        //{
        //    var principal = GetPrincipalFromExpiredToken(tokenModel.AccessToken);
        //    if (principal == null)
        //    {
        //        return BadRequest("Invalid access token or refresh token");
        //    }

        //    var username = principal.Identity.Name;
        //}

        [HttpGet("Version")]
        public IActionResult GetVersion()
        {
            var version = Assembly.GetExecutingAssembly()
                .GetCustomAttribute<AssemblyInformationalVersionAttribute>()
                .InformationalVersion;
            return Ok(new {version});
        }

        [HttpPost("Auth")]
        [Authorize(AuthenticationSchemes = NegotiateDefaults.AuthenticationScheme)]
        public IActionResult GetUser(string? userId)
        {
            var userHttpContext = HttpContext.User;
            var windowsId = User.Identity as WindowsIdentity;
            var userSid = windowsId.User;

            if (userHttpContext.Identity.IsAuthenticated && userId == "null")
            {
                var user = _userService.GetUser(userSid).Result;

                var token = GenerateToken(user);

                return Ok(new { user, token });
            }

            if (userId == null) return Unauthorized();
            {
                var user = _userService.GetUserForTerminal(userId).Result;

                var token = GenerateToken(user);

                return Ok(new { user, token });
            }
        }
    }
}
