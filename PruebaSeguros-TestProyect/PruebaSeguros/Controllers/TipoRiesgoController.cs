using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PruebaSeguros.RepositoryPattern.Core.Domain;
using PruebaSeguros.RepositoryPattern.Persistance;

namespace PruebaSeguros.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TipoRiesgoController : ControllerBase
    {
        private readonly UnitOfWork unitOfWork;

        public TipoRiesgoController(TestSegurosContext context)
        {

            unitOfWork = new UnitOfWork(context);
        }

        // GET: api/TipoPoliza
        [HttpGet]
        public ActionResult<IEnumerable<TipoRiesgo>> Get()
        {
            try
            {
                return Ok(unitOfWork.TipoRiesgo.GetAll());

            }
            catch (Exception ex)
            {
                //LogException(e);
                return StatusCode(500, "Error interno del server: " + ex.Message);
            }
        }

        //// GET: api/TipoRiesgo/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/TipoRiesgo
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/TipoRiesgo/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
