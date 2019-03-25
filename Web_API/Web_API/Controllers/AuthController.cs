using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Web_API.Controllers.Base;
using Web_API.Models;
using Web_API.Models.DTO;
using Web_API.Services;

namespace Web_API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AuthController : BaseController<AuthService>
    {
        public AuthController(AuthService service) : base(service)
        {
        }

        [Route("Login")]
        [HttpPost, AllowAnonymous]
        public ActionResult Login([FromBody] ConnectionInfo user)
        {
            if (user.Email == null || user.Password == null ) {
                return BadRequest(new { message = "Demande du client invalide" });
            }

            if (Service.Authentification(user.Email, user.Password)) {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5000",
                    audience: "http://localhost:5000",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(15),
                    signingCredentials: signinCredentials
                );

                ConnectionValidation connexionValidation = new ConnectionValidation();
                connexionValidation.token = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                
                return Ok(new { Validation = connexionValidation });
            }
            else {
                return Unauthorized(new { message = "Courriel ou mot de passe invalide" });
            }
        }
    }
}
