using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PruebaSegurosAPI.Controllers
{
    public class HealthCheckController : Controller
    {
        [HttpGet]
        [Route("ping")]
        public IActionResult Ping()
        {
            return Ok();
        }
    }
}