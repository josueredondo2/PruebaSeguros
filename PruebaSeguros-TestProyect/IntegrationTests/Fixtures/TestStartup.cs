//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.IdentityModel.Tokens;
//using PruebaSeguros;
//using PruebaSeguros.RepositoryPattern.Core.Domain;
////using PruebaSegurosAPI;
//using System;
//using System.Collections.Generic;
//using System.Text;

//namespace IntegrationTests.Fixtures
//{
//    class TestStartup : Startup
//    {
//        IConfiguration _configuration;
//        public TestStartup(IConfiguration configuration) : base(configuration)
//        {
//            _configuration = configuration;
//        }
//        public override void ConfigureDatabase(IServiceCollection services)
//        {
//            // Replace default database connection with In-Memory database
//            services.AddDbContext<TestSegurosContext>(options =>
//                options.UseSqlServer("Server=DESARROLLO-1\\SQLEXPRESS01; Database= Test; User Id=logical;Password=talamanca;"));


//        }

//        public override void ConfigureAuthentication(IServiceCollection services)
//        {
//            //Se configura el JWTBearer
//            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
//            options =>
//            {
//                options.TokenValidationParameters = new TokenValidationParameters
//                {
//                    ValidateIssuer = true,
//                    ValidateAudience = true,
//                    ValidateLifetime = true,
//                    ValidateIssuerSigningKey = true,
//                    ValidIssuer = "Josue",
//                    ValidAudience = "Josue",
//                    ClockSkew = TimeSpan.Zero,
//                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("TestJosue123456789"))
//                };
//            });


//        }
//    }
//}
