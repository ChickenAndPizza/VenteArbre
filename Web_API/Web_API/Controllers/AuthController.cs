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
        private readonly CustomerService customerService;
        public AuthController(CustomerService customerService, AuthService service) : base(service)
        {
            this.customerService = customerService;
        }

        [Route("Login")]
        [HttpPost, AllowAnonymous]
        public ActionResult Login([FromBody] ConnectionInfo user)
        {
            if (user.Email == null || user.Password == null ) {
                return BadRequest(new { message = "Demande du client invalide" });
            }

            if (Service.Authentification(user.Email, user.Password)) {
                var customer = customerService.GetCustomerByEmail(user.Email);
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@1238879"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5000",
                    audience: "http://localhost:5000",
                    claims: new List<Claim>() {
                        new Claim("id", customer.Id.ToString()),
                        new Claim("firstName", customer.FirstName),
                        new Claim("lastName", customer.LastName),
                        new Claim("password", customer.Password),
                        new Claim("phoneNumber", customer.PhoneNumber),
                        new Claim("email", customer.Email),
                        new Claim("isAdmin", customer.IsAdmin.ToString())
                    },
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: signinCredentials
                );

                var token = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                
                return Ok(token);
            }
            else {
                return Unauthorized(new { message = "Courriel ou mot de passe invalide" });
            }
        }
    }
}
