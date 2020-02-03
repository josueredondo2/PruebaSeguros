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
    public class ClienteController : ControllerBase
    {

        private readonly UnitOfWork unitOfWork;

        public ClienteController(TestSegurosContext context)
        {

            unitOfWork = new UnitOfWork(context);
        }
        // GET: api/Cliente
        [HttpGet]
        public ActionResult<IEnumerable<Cliente>> Get()
        {
            try
            {
                return Ok(new DTOResponse { Correcto = true, Dato = unitOfWork.Cliente.GetAll() });

            }
            catch (Exception ex)
            {
                //LogException(e);
                return Ok(new DTOResponse { Correcto = false, Dato = ex.InnerException.Message });
            }
        }

        //// GET: api/Cliente/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Cliente
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Cliente/5
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
