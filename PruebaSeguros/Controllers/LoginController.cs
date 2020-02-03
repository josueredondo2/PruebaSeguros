using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PruebaSeguros.RepositoryPattern.Core.Domain;
using PruebaSeguros.RepositoryPattern.Persistance;

namespace PruebaSeguros.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly UnitOfWork unitOfWork;

        public LoginController(IConfiguration config, TestSegurosContext context)
        {
            _config = config;
             unitOfWork = new UnitOfWork(context);
        }

        [HttpPost]
        public IActionResult Login([FromBody] SeguridadLogin login)
        {
            IActionResult response = Unauthorized();
            try
            {

            
            SeguridadLogin SeguridadLoginencontrado = AutenticarSeguridadLogin(login);

            if (SeguridadLoginencontrado != null)
            {
                string tokenStr = GenerateJSONWebToken(SeguridadLoginencontrado);
                response = Ok(new { token = tokenStr });
            }

            return response;

            }
            catch (Exception ex)
            {
                //LogException(e);
                return StatusCode(500,"Error interno del server: " + ex.Message);
            }

        }

        private string GenerateJSONWebToken(SeguridadLogin user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentiasl = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub,user.Usuario),
            new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(

                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: credentiasl

                );

            var encodeToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodeToken;
        }

        private SeguridadLogin AutenticarSeguridadLogin(SeguridadLogin login)
        {
            return unitOfWork.SeguridadLogins.ValidarLogin(login.Usuario,login.Pass);
        }

        [Authorize]
        [HttpPost("Post")]
        public string Post()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var userName = claim[0].Value;  
            return "Bienvenido : " + userName;
        }

        [Authorize]
        [HttpGet("GetValue")]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "Value 1", "Value 2", "Value 3" };
        }

    }
}
